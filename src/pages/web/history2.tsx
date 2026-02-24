"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type HistoryDict = {
  title: string;
  // 1990
  title1992: string;
  title1993: string;

  // 2000
  title2001_1: string;
  title2001_2: string;
  title2002_1: string;
  title2002_2: string;
  title2002_3: string;
  title2002_4: string;
  title2002_5: string;
  title2004_1: string;
  title2004_2: string;
  title2004_3: string;
  title2004_4: string;
  title2005_1: string;
  title2005_2: string;
  title2005_3: string;
  title2005_4: string;
  descTitle2005_4: string;
  title2006_1: string;
  title2006_2: string;
  title2006_3: string;
  title2006_4: string;
  title2006_5: string;
  title2006_6: string;
  title2007: string;
  title2008: string;
  title2009: string;

  // 2010
  title2010_1: string;
  title2010_2: string;
  title2011: string;
  title2012_1: string;
  title2012_2: string;
  title2013_1: string;
  title2013_2: string;
  title2013_3: string;
  title2013_4: string;
  title2013_5: string;
  title2014: string;
  title2015: string;
  title2017_1: string;
  title2017_2: string;

  // 2020
  title2020: string;
  title2021: string;
  title2022: string;
};

const HISTORY_KO: HistoryDict = {
  title: "연혁",
  title1992: "서울반도체 설립",
  title1993: "기업부설 연구소 설립",
  title2001_1: "중국 톈진에 광명반도체유한공사 설립",
  title2001_2: "일본 Nitride 협력 계약 체결",
  title2002_1: "서울바이오시스 설립",
  title2002_2: "휴대폰용 Side LED 개발",
  title2002_3: "매출액 1,000억원 돌파",
  title2002_4: "서울반도체 상장",
  title2002_5: "서울반도체 매출 1천억원 돌파, 수출확대",
  title2004_1: "세계 최초 AC용 LED 칩 개발",
  title2004_2: "Z-POWER LED 양산",
  title2004_3: "국내 MS 70% 돌파",
  title2004_4: "전세계 LED 랭킹 10위권 진입",
  title2005_1: "세계최고의 UVC업체 SETi 인수 합병",
  title2005_2: "세계최초 교류 전원용 반도체 광원(Acirich) 개발",
  title2005_3: "LCD 백라이트용 0.4mm LED 개발",
  title2005_4: "강자들과의 특허 전쟁",
  descTitle2005_4: "2008년 5개국에서 30여개 소송 정점",
  title2006_1: "세계 최고 수명 100,000시간 Lamp LED 개발",
  title2006_2: "세계 최초 반도체 조명 Acrich 양산",
  title2006_3: "서울바이오시스 DUV LED 양산",
  title2006_4: "세계 최고 밝기, 광효율의 단일칩 240lm LED 양산 개시",
  title2006_5: "포브스 선정 아시아 200대 중견기업 선정",
  title2006_6: "비즈니스 위크지 선정 아시아 100대 고성장 기업 선정",
  title2007: "세계 최소 두께 0.17 mm 고휘도 칩 LED 특허제품 출시",
  title2008: "10W급 세계 최고 밝기 900루멘 LED 개발 출시",
  title2009: "TV용 TOP LED 양산",
  title2010_1: "아크리치 미국 정부 DOE (에너지국)의 미래주택 프로젝트에 채택",
  title2010_2: "자동차 헤드램프용 LED 개발",
  title2011: "서울반도체 안산 신규 공장 신축",
  title2012_1: "국내외 특허 1만개 돌파, IEEE 선정 LED 부품 업체 세계최고 특허파워 회사",
  title2012_2: "기존 LED보다 10배 밝은 LED '엔폴라(nPola)' 출시",
  title2013_1: "매출 1조 달성",
  title2013_2: "10년동안 서울반도체 기술고문 역임한 나카무라 수지교수 노벨 물리학상 수상",
  title2013_3: "동급 세계 최고 밝기(8.8lm)의 0.6mm규격 사이드뷰 LED 출시",
  title2013_4: "전세계 수출대상국 60개국 돌파",
  title2013_5: "세계 최고 밝기의 고성능 LED Z5M1 출시",
  title2014: "전세계 LED 랭킹 5위권 진입",
  title2015: "패키지 공정과 부품을 없앤 신개념 LED, 와이캅(Wicop) 양산",
  title2017_1: "베트남 하남성에 서울반도체 VINA 완공",
  title2017_2: "창사이래 분기 최고 매출 기록 달성",
  title2020: "전세계 LED 랭킹 4위권 진입",
  title2021: "전세계 LED 랭킹 3위권 진입",
  title2022: "국내외 특허 18,000개 돌파",
};

type HistoryItem = {
  id: string;
  time?: number | string;
  title?: string;
  desc?: string;
};

type HistorySection = {
  id: string;
  title: string;
  data: HistoryItem[];
};

type HistoryProps = {
  lang?: string;
};

type ItemProps = {
  time?: number | string;
  title?: string;
  desc?: string;
};

function rafThrottle<T extends (...args: unknown[]) => void>(fn: T) {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return (...args: Parameters<T>) => {
    lastArgs = args;
    if (rafId != null) return;

    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      if (lastArgs) fn(...lastArgs);
    });
  };
}

function microDebounce<T extends (arg: string) => void>(fn: T): T {
  let t: number | null = null;
  const debounced = (arg: string) => {
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => fn(arg), 0);
  };
  return debounced as T;
}

const Item: React.FC<ItemProps> = ({ time, title, desc }) => {
  const showDot = Boolean(title || time);
  const year = typeof time === "number" ? time : undefined;

  return (
    <article className="cssText">
      <div className="relative flex items-center gap-4 md:gap-6">
        {/* 년도+닷: 고정 width, 스크롤 시 흔들림 방지 */}
        <div
          className="flex w-[80px] min-w-[80px] max-w-[80px] shrink-0 items-center justify-end gap-3 md:gap-4 pr-4 md:pr-6"
          aria-hidden="true"
        >
          {year != null ? (
            <time dateTime={String(year)} className="text-[16px] font-medium text-[#666] tabular-nums md:block hidden">
              {time}
            </time>
          ) : (
            <span className="text-[16px] font-medium text-[#666] tabular-nums md:block hidden">{time}</span>
          )}
          {showDot && <div className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#30AE56]" />}
        </div>

        <div className="min-w-0 flex-1 md:pr-[40px] pl-0 pr-[26px]">
          {year != null ? (
            <time dateTime={String(year)} className="text-[10px] text-[#666] md:hidden block mb-1">
              {time}
            </time>
          ) : (
            <p className="text-[10px] text-[#666] md:hidden block mb-1">{time}</p>
          )}
          <p className="md:text-[40px] text-[14px] md:font-normal font-bold text-black">{title ?? ""}</p>
        </div>
      </div>

      {desc ? (
        <p className="text-[#999] sm:text-[16px] text-[10px] mt-2 md:pl-[104px] pl-[90px] pr-[26px]">{desc}</p>
      ) : null}
    </article>
  );
};

const History: React.FC<HistoryProps> = () => {
  const history: HistoryDict = HISTORY_KO;

  const DATA: HistorySection[] = useMemo(
    () => [
      {
        id: "1990",
        title: "1990",
        data: [
          { id: "1992", time: 1992, title: history.title1992 },
          { id: "1993", time: 1993, title: history.title1993 },
        ],
      },
      {
        id: "2000",
        title: "2000",
        data: [
          { id: "2001_1", time: 2001, title: history.title2001_1 },
          { id: "2001_2", title: history.title2001_2 },

          { id: "2002_1", time: 2002, title: history.title2002_1 },
          { id: "2002_2", title: history.title2002_2 },
          { id: "2002_3", title: history.title2002_3 },
          { id: "2002_4", title: history.title2002_4 },
          { id: "2002_5", title: history.title2002_5 },

          { id: "2004_1", time: 2004, title: history.title2004_1 },
          { id: "2004_2", title: history.title2004_2 },
          { id: "2004_3", title: history.title2004_3 },
          { id: "2004_4", title: history.title2004_4 },

          { id: "2005_1", time: 2005, title: history.title2005_1 },
          { id: "2005_2", title: history.title2005_2 },
          { id: "2005_3", title: history.title2005_3 },
          {
            id: "2005_4",
            title: history.title2005_4,
            desc: history.descTitle2005_4,
          },

          { id: "2006_1", time: 2006, title: history.title2006_1 },
          { id: "2006_2", title: history.title2006_2 },
          { id: "2006_3", title: history.title2006_3 },
          { id: "2006_4", title: history.title2006_4 },
          { id: "2006_5", title: history.title2006_5 },
          { id: "2006_6", title: history.title2006_6 },

          { id: "2007", time: 2007, title: history.title2007 },
          { id: "2008", time: 2008, title: history.title2008 },
          { id: "2009", time: 2009, title: history.title2009 },
        ],
      },
      {
        id: "2010",
        title: "2010",
        data: [
          { id: "2010_1", time: 2010, title: history.title2010_1 },
          { id: "2010_2", title: history.title2010_2 },

          { id: "2011", time: 2011, title: history.title2011 },

          { id: "2012_1", time: 2012, title: history.title2012_1 },
          { id: "2012_2", title: history.title2012_2 },

          { id: "2013_1", time: 2013, title: history.title2013_1 },
          { id: "2013_2", title: history.title2013_2 },
          { id: "2013_3", title: history.title2013_3 },
          { id: "2013_4", title: history.title2013_4 },
          { id: "2013_5", title: history.title2013_5 },

          { id: "2014", time: 2014, title: history.title2014 },
          { id: "2015", time: 2015, title: history.title2015 },

          { id: "2017_1", time: 2017, title: history.title2017_1 },
          { id: "2017_2", title: history.title2017_2 },
        ],
      },
      {
        id: "2020",
        title: "2020",
        data: [
          { id: "2020", time: 2020, title: history.title2020 },
          { id: "2021", time: 2021, title: history.title2021 },
          { id: "2022", time: 2022, title: history.title2022 },
          { id: "empty", title: "" },
        ],
      },
    ],
    [history]
  );

  const [tab, setTab] = useState<string>("1990");
  const [displayedYear, setDisplayedYear] = useState<string>(DATA[0].title);
  const setTabDebounced = useMemo(() => microDebounce((v: string) => setTab(v)), []);

  const updateOnScroll = useCallback(() => {
    const items = document.querySelectorAll<HTMLElement>(".cssText");

    const zoneTop = window.innerHeight * 0.25;
    const zoneBottom = window.innerHeight * 0.65;
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height * 0.5;
      const inActiveZone = elCenter >= zoneTop && elCenter <= zoneBottom;
      if (inActiveZone) el.classList.add("cssText1");
      else el.classList.remove("cssText1");
    });

    const viewportCenter = window.scrollY + window.innerHeight * 0.5;
    let currentYear = DATA[0].title;
    let currentTab = "1990";

    DATA.forEach((section) => {
      const el = document.getElementById(`time${section.id}`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      if (viewportCenter >= sectionTop) {
        currentYear = section.title;
        currentTab = section.id;
      }
    });

    setTabDebounced(currentTab);
    setDisplayedYear((prev) => (prev !== currentYear ? currentYear : prev));
  }, [setTabDebounced]);

  const onScroll = useMemo(() => rafThrottle(updateOnScroll), [updateOnScroll]);

  useEffect(() => {
    const handleScroll = () => onScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  const lastScrollTopRef = useRef<number>(0);
  const [tabClass, setTabClass] = useState<string>("");

  const tabScrollUpDown = useMemo(
    () =>
      rafThrottle(() => {
        const scrollTop = window.scrollY;
        const last = lastScrollTopRef.current;
        setTabClass(scrollTop > last ? "tab-down" : "");
        lastScrollTopRef.current = scrollTop;
      }),
    []
  );

  useEffect(() => {
    const handleTabScroll = () => tabScrollUpDown();
    window.addEventListener("scroll", handleTabScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleTabScroll);
  }, [tabScrollUpDown]);

  const scrollToSection = useCallback((id: string) => {
    const yOffset = -70;
    const el = document.getElementById(`time${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <main className="relative text-black bg-themeWhite" aria-label="연혁">
      <style>{`
        .cssText { opacity: 0.3; transition: opacity 0.25s ease; }
        .cssText.cssText1 { opacity: 1; }
      `}</style>
      <div className="w-full h-full sm:pt-[88px] pt-[56px] min-h-screen flex">
        <div className="max-w-screen-3xl w-full mx-auto flex-1 flex flex-col">
          <h1 className="sr-only">{history.title}</h1>
          <div className="grid lg:grid-cols-4 lg:border-t-[1px] border-t-0 border-[#30AE56] border-opacity-[0.2]">
            <aside className="lg:block hidden" aria-label="연혁 네비게이션">
              <div className="flex gap-[12px] sticky lg:top-[88px] top-[56px] pt-[40px] pl-[40px]">
                <div className="w-[8px] h-[8px] rounded-[8px] bg-[#30AE56] mt-[8px]" aria-hidden="true" />
                <p className="text-[18px]">
                  History <br /> of Seoul Semiconductor
                </p>
              </div>
            </aside>

            <div className="lg:col-span-3 border-l-[1px] border-[#30AE56] border-opacity-[0.2]">
              <nav
                aria-label="연도별 섹션 이동"
                className={`${
                  tabClass ? "top-0" : "lg:top-[88px] top-[56px]"
                } flex items-center sm:gap-[32px] gap-[24px] sticky border-b border-[#30AE56] border-opacity-[0.2] sm:px-[40px] px-[20px] bg-white z-[2]`}
                style={{ transition: "all 0.2s ease-in 0s" }}
              >
                {DATA.map((section) => {
                  const isActive = tab === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`${section.title}년대 연혁으로 이동`}
                      className={`flex items-center cursor-pointer lg:gap-[12px] sm:gap-[24px] py-[16px] ${
                        isActive ? "mb-[-1px] border-[#111] sm:border-b-[2px] border-b" : ""
                      }`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <span
                        className={`lg:text-[16px] text-nowrap text-[12px] sm:font-medium font-bold ${
                          isActive ? "" : "opacity-[0.3]"
                        }`}
                      >
                        {section.title}~
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="flex">
                {/* 연도 표시: 고정 width, 선과 겹치지 않도록 넓게 */}
                <div
                  className="sm:p-[44px] p-[20px] md:pt-[160px] pt-[60px] sticky lg:top-[108px] top-[76px] h-fit w-[320px] min-w-[320px] max-w-[320px] flex items-center flex-shrink-0 self-start pr-8"
                  id="time1"
                  aria-hidden="true"
                >
                  <p className="md:text-[60px] text-[32px] font-medium tabular-nums">{displayedYear}~</p>
                </div>

                {/* 오른쪽 콘텐츠: 고정 width flex-1 */}
                <div className="flex-1 min-w-0 border-l-[1px] border-[#30AE56] border-opacity-[0.2] overflow-hidden">
                  <section
                    id={`time${DATA[0].id}`}
                    aria-label={`${DATA[0].title}년대 연혁`}
                    className="md:pt-[160px] md:space-y-[160px] pt-[60px] space-y-[60px] sm:px-[44px] px-[20px] transition-opacity"
                  >
                    {DATA[0].data
                      .filter((it) => it.id !== "empty")
                      .map((it) => (
                        <Item key={it.id} time={it.time} title={it.title} desc={it.desc} />
                      ))}
                  </section>

                  {DATA.slice(1).map((section) => (
                    <section
                      key={section.id}
                      id={`time${section.id}`}
                      aria-label={`${section.title}년대 연혁`}
                      className="md:pt-[160px] md:space-y-[160px] pt-[60px] space-y-[60px] sm:px-[44px] px-[20px] transition-opacity"
                    >
                      {section.data
                        .filter((it) => it.id !== "empty")
                        .map((it) => (
                          <Item key={it.id} time={it.time ?? ""} title={it.title} desc={it.desc} />
                        ))}
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div />
        </div>
      </div>
    </main>
  );
};

export default History;
