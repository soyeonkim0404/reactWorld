import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { historyData } from "../api/historyData";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * 연도 숫자 롤링(자리수별 세로 롤링)
 * - 기존 코드의 "digit 세트 반복 + translateY" 방식 유지
 * - React에서는 DOM ref 기반으로 transform만 갱신
 */
function YearRolling({
  year,
  durationMs = 1000,
  className = "",
}: {
  year: string; // "2026"
  durationMs?: number;
  className?: string;
}) {
  const prevYearRef = useRef<string>(year);
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  // digit wrapper refs
  const wrappersRef = useRef<Array<HTMLSpanElement | null>>([]);

  // 높이 측정용 (현재 breakpoint 폰트/라인 높이에 맞춰 측정)
  const measureDigitHeight = useCallback((wrapper: HTMLSpanElement) => {
    const firstItem = wrapper.querySelector<HTMLElement>("[data-digit-item='true']");
    return firstItem?.offsetHeight ?? 0;
  }, []);

  const buildDigits = useMemo(() => {
    const digits = year.padStart(4, "0").slice(-4).split("");
    return digits;
  }, [year]);

  // 최초 렌더: 각 wrapper에 0~9 5세트 넣기
  const renderDigitColumn = (idx: number) => {
    return (
      <span
        key={idx}
        className={[
          // container
          "inline-block overflow-hidden align-top",
          // 높이는 반응형으로 고정(기존 72/56/48 대응)
          "h-[72px] md:h-[56px] max-md:h-[48px]",
        ].join(" ")}
      >
        <span
          ref={(el) => {
            wrappersRef.current[idx] = el;
          }}
          className="flex flex-col [transition:transform_0ms]"
          aria-hidden="true"
        >
          {Array.from({ length: 5 }).map((_, cycle) =>
            Array.from({ length: 10 }).map((__, d) => (
              <span
                key={`${cycle}-${d}`}
                data-digit-item="true"
                className={[
                  "flex items-center justify-center",
                  "h-[72px] leading-[72px] text-[72px] font-bold text-[#927B67]",
                  "md:h-[56px] md:leading-[56px] md:text-[56px]",
                  "max-md:h-[48px] max-md:leading-[48px] max-md:text-[48px]",
                ].join(" ")}
              >
                {d}
              </span>
            ))
          )}
        </span>
      </span>
    );
  };

  // 연도 변경 시: 바뀐 자리만 애니메이션
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prev = prevYearRef.current.padStart(4, "0").slice(-4).split("");
    const next = year.padStart(4, "0").slice(-4).split("");

    // basePosition은 중간 세트(3번째 세트)의 시작 인덱스
    const basePosition = 20;

    next.forEach((digitChar, idx) => {
      const wrapper = wrappersRef.current[idx];
      if (!wrapper) return;

      const digitHeight = measureDigitHeight(wrapper);
      if (!digitHeight) return;

      const currentDigit = parseInt(prev[idx] ?? "0", 10);
      const targetDigit = parseInt(digitChar, 10);

      const currentPos = basePosition + currentDigit;
      const targetPos = basePosition + targetDigit;

      // 현재 위치 세팅(transition 제거)
      wrapper.style.transition = "none";
      wrapper.style.transform = `translateY(${-currentPos * digitHeight}px)`;

      // 바뀌는 숫자만 롤링
      if (currentDigit !== targetDigit) {
        const delay = idx * 80;
        // reflow
        void wrapper.offsetHeight;

        window.setTimeout(() => {
          wrapper.style.transition = `transform ${durationMs}ms cubic-bezier(0.4,0,0.2,1)`;
          wrapper.style.transform = `translateY(${-targetPos * digitHeight}px)`;
        }, delay);
      } else {
        // 바뀌지 않는 숫자: 그대로 유지
        // (transition none 유지)
      }
    });

    prevYearRef.current = year;
  }, [year, durationMs, measureDigitHeight]);

  return (
    <h2
      ref={rootRef}
      className={[
        "inline-flex items-center leading-none font-bold text-[#927B67]",
        "text-[72px] md:text-[56px] max-md:text-[48px]",
        className,
      ].join(" ")}
    >
      {buildDigits.map((_, idx) => renderDigitColumn(idx))}
      <span className="sr-only">{year}</span>
    </h2>
  );
}

export default function HistoryPage() {
  const data = useMemo(
    () => [...historyData].sort((a, b) => Number(b.year) - Number(a.year)),
    []
  );
  const [activeYear, setActiveYear] = useState<string>(data[0]?.year ?? "2026");
  const [activeDesc, setActiveDesc] = useState<string>(data[0]?.description ?? "");

  const [descAnimKey, setDescAnimKey] = useState<number>(0); // 설명 애니메이션 재시작용
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const eventRefs = useRef<HTMLElement[]>([]);

  const tickingRef = useRef(false);
  const currentActiveYearRef = useRef<string | null>(null);
  const updateDebounceRef = useRef<number | null>(null);

  // year -> description map
  const yearDescriptions = useMemo(() => {
    const map: Record<string, string> = {};
    data.forEach((item) => {
      map[item.year] = item.description;
    });
    return map;
  }, [data]);

  // 탭 목록 (데이터 로드 전에도 보이게 하려면 고정 리스트 유지)
  const tabYears = useMemo(() => {
    // 기존 UI처럼 2019~2026 고정
    return ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"];
  }, []);

  const updateActiveTab = useCallback(
    (year: string) => {
      if (!year) return;

      // 같은 연도면 스킵(불필요한 애니메이션 방지)
      if (currentActiveYearRef.current === year) return;

      if (updateDebounceRef.current) {
        window.clearTimeout(updateDebounceRef.current);
      }

      updateDebounceRef.current = window.setTimeout(() => {
        if (currentActiveYearRef.current === year) return;

        currentActiveYearRef.current = year;
        setActiveYear(year);

        const desc = yearDescriptions[year];
        if (typeof desc === "string") {
          setActiveDesc(desc);
          // 설명 애니메이션 다시 트리거
          setDescAnimKey((k) => k + 1);
        }
      }, 50);
    },
    [yearDescriptions]
  );

  const scrollToYear = useCallback((year: string) => {
    const el = sectionRefs.current[year];
    if (!el) return;

    const top = window.scrollY + el.getBoundingClientRect().top - 100;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  // 탭 roving focus(좌우키 이동)
  const onTabKeyDown = useCallback(
    (e: React.KeyboardEvent, year: string) => {
      const years = tabYears;
      const idx = years.indexOf(year);
      if (idx < 0) return;

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextIdx = clamp(idx + dir, 0, years.length - 1);
        const nextYear = years[nextIdx];
        const container = tabsRef.current;
        const btn = container?.querySelector<HTMLButtonElement>(`button[data-year="${nextYear}"]`);
        btn?.focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToYear(year);
      }
    },
    [scrollToYear, tabYears]
  );

  // 초기 activeYear/activeDesc 동기화
  useEffect(() => {
    if (data.length > 0) {
      const first = data[0]?.year ?? "2026";
      currentActiveYearRef.current = first;
      setActiveYear(first);
      setActiveDesc(data[0]?.description ?? "");
      setDescAnimKey((k) => k + 1);
    }
  }, [data]);

  // ScrollTrigger / GSAP 세팅
  useLayoutEffect(() => {
    if (!data.length) return;

    // 안전하게 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // 이전 트리거 정리
    ScrollTrigger.getAll().forEach((t) => t.kill());
    eventRefs.current = [];

    // 이벤트 애니메이션 + 섹션 active 업데이트
    data.forEach((yearItem) => {
      const section = sectionRefs.current[yearItem.year];
      if (!section) return;

      const events = Array.from(section.querySelectorAll<HTMLElement>("[data-his-event='true']"));
      events.forEach((eventEl) => {
        eventRefs.current.push(eventEl);

        gsap.fromTo(
          eventEl,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: eventEl,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none none",
              markers: false,
            },
          }
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => updateActiveTab(yearItem.year),
        onEnterBack: () => updateActiveTab(yearItem.year),
      });
    });

    // refresh
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data, updateActiveTab]);

  // scroll fallback + top button
  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;

        // Top 버튼
        setShowTopBtn(y > 300);

        // fallback active year 계산(ScrollTrigger 실패 대비)
        const probeY = y + 200;
        const years = data.map((d) => d.year);

        for (const year of years) {
          const section = sectionRefs.current[year];
          if (!section) continue;

          const top = window.scrollY + section.getBoundingClientRect().top;
          const bottom = top + section.offsetHeight;

          if (probeY >= top && probeY < bottom) {
            updateActiveTab(year);
            break;
          }
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [data, updateActiveTab]);

  const onClickTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Fixed Tabs */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="연도 선택"
        className={[
          "fixed top-0 left-0 right-0 z-[100]",
          "flex gap-10 max-md:gap-6",
          "px-10 py-6 max-md:px-6 max-md:py-5",
          "bg-white/95 backdrop-blur-[10px] border-b border-black/10",
          "overflow-x-auto [-webkit-overflow-scrolling:touch]",
        ].join(" ")}
      >
        {tabYears.map((year) => {
          const selected = activeYear === year;
          return (
            <button
              key={year}
              type="button"
              role="tab"
              data-year={year}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => scrollToYear(year)}
              onKeyDown={(e) => onTabKeyDown(e, year)}
              className={[
                "relative whitespace-nowrap flex-shrink-0",
                "text-[18px] max-md:text-[16px] font-normal",
                "py-2",
                selected ? "text-[#927B67] font-bold" : "text-[#666] hover:text-black",
                selected
                  ? "after:content-[''] after:absolute after:bottom-0 after:left-[-4px] after:right-[-4px] after:h-[2px] after:bg-[#927B67]"
                  : "",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#927B67]/40 focus-visible:ring-offset-2",
              ].join(" ")}
            >
              {year}
            </button>
          );
        })}
      </div>

      {/* Sidebar (fixed on desktop) */}
      <aside
        className={[
          "fixed z-[90] left-10 top-[100px] w-[400px] h-fit py-5",
          "max-lg:left-6 max-lg:w-[300px]",
          "max-md:static max-md:w-full max-md:px-5 max-md:pt-5 max-md:pb-0",
        ].join(" ")}
      >
        <div>
          <YearRolling year={activeYear} durationMs={1000} />
          <p
            // desc 애니메이션: key로 재마운트해서 transition 재실행
            key={descAnimKey}
            className={[
              "mt-6 max-md:mt-4",
              "text-[20px] max-md:text-[18px] text-black leading-[1.6]",
              "opacity-0 translate-y-[30px] transition-[opacity,transform] duration-[600ms] ease-out",
              "animate-[hisDescIn_600ms_ease-out_forwards]",
            ].join(" ")}
            // 기존처럼 <br> 포함하려면 dangerouslySetInnerHTML 필요
            dangerouslySetInnerHTML={{ __html: activeDesc }}
          />
        </div>
      </aside>

      {/* Main */}
      <main
        className={[
          "max-w-[1400px] mx-auto",
          "pt-[100px] pb-[200px] px-10",
          "pl-[480px] max-lg:pl-[360px]",
          "max-md:px-5 max-md:pl-5",
        ].join(" ")}
      >
        {/* Content */}
        <section
          className={[
            "relative overflow-visible h-auto max-h-none pb-[100px]",
            "pl-[60px] max-md:pl-[40px]",
            // 전체 회색 라인
            "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-[#D0D0D0]/50 before:z-[1] before:pointer-events-none",
          ].join(" ")}
        >
          {data.map((yearItem, idx) => {
            const isActive = activeYear === yearItem.year;

            return (
              <section
                key={yearItem.year}
                id={`year-${yearItem.year}`}
                data-year={yearItem.year}
                ref={(el) => {
                  sectionRefs.current[yearItem.year] = el;
                }}
                className={[
                  "relative overflow-visible",
                  "mb-[80px] last:mb-0 last:pb-[200px]",
                  "[scroll-margin-top:120px]",
                ].join(" ")}
              >
                {/* 활성 섹션용 보라 라인(겹쳐서 표시) */}
                <div
                  aria-hidden="true"
                  className={[
                    "absolute z-[2] pointer-events-none",
                    "left-[-60px] max-md:left-[-40px] top-0 bottom-0 w-[2px]",
                    "bg-[#7B41E1] transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />

                <div className="relative overflow-visible">
                  {/* Dot */}
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute z-[3] transition-all duration-300",
                      "w-[14px] h-[14px] rounded-full",
                      "left-[-67px] max-md:left-[-47px]",
                      "top-0 translate-y-[0.5em]",
                      isActive
                        ? "bg-[#7B41E1] shadow-[0_0_0_4px_rgba(123,65,225,0.2),0_0_0_8px_rgba(160,125,237,0.15)]"
                        : "bg-[#D0D0D0]/50 shadow-[0_0_0_3px_rgba(224,224,224,0.3)]",
                    ].join(" ")}
                  />

                  <h3 className="relative z-[2] text-[32px] max-md:text-[28px] font-bold text-black mb-10 max-md:mb-8">
                    {yearItem.year}
                  </h3>

                  <div className="flex flex-col gap-8 overflow-visible">
                    {yearItem.events?.map((ev, evIdx) => (
                      <article
                        key={`${yearItem.year}-${evIdx}`}
                        data-his-event="true"
                        className={[
                          "flex flex-col items-start gap-5 max-md:gap-4",
                          "relative pl-5 max-md:pl-4",
                          // gsap 초기값(혹시 gsap 미동작해도 자연스럽게 보이도록, opacity는 gsap에서 다시 제어)
                          "opacity-100 translate-y-0",
                        ].join(" ")}
                      >
                        <span className="text-[16px] font-semibold text-black min-w-[32px] flex-shrink-0">
                          {ev.month}
                        </span>
                        <div className="flex-1 flex flex-col gap-3">
                          <p className="text-[16px] max-md:text-[14px] font-normal text-black leading-[1.6] m-0">
                            {ev.text}
                          </p>
                          {ev.desc && ev.desc.length > 0 && (
                            <ul className="m-0 pl-4 list-disc space-y-0.5">
                              {ev.desc.map((line, i) => (
                                <li key={i} className="text-[14px] max-md:text-[13px] text-gray-600 leading-[1.6]">
                                  {line}
                                </li>
                              ))}
                            </ul>
                          )}
                          {ev.desc2 && ev.desc2.length > 0 && (
                            <ul className="m-0 pl-4 list-disc space-y-0.5">
                              {ev.desc2.map((line, i) => (
                                <li key={i} className="text-[14px] max-md:text-[13px] text-gray-700 leading-[1.6]">
                                  {line}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* 접근성/SEO: 섹션 사이 구분용 */}
                {idx < data.length - 1 ? <div className="h-0" aria-hidden="true" /> : null}
              </section>
            );
          })}
        </section>
      </main>

      {/* Scroll to top */}
      <button
        type="button"
        aria-label="맨 위로 이동"
        onClick={onClickTop}
        className={[
          "fixed z-[1000] right-10 bottom-10 max-md:right-6 max-md:bottom-6",
          "w-12 h-12 max-md:w-11 max-md:h-11 rounded-full",
          "bg-white border border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          "flex items-center justify-center",
          "transition-[opacity,transform,visibility] duration-300 ease-out",
          showTopBtn ? "opacity-100 visible" : "opacity-0 invisible",
          "hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5M12 5L5 12M12 5L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Tailwind에 없는 keyframes (설명 fade-up) */}
      <style>{`
        @keyframes hisDescIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
