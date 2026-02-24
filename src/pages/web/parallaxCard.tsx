import React, { useEffect, useRef, useState } from "react";

type BgImages = [string, string, string, string];

type CardItem = {
  id: string | number;
  src: string;
  alt?: string;
};

type SensingParallaxProps = {
  topTitle?: string;
  topDesc?: string;
  bottomTitle?: string;
  bottomDesc?: string;

  bgImages: BgImages;
  cards: CardItem[];

  /** 카드 크기(px) */
  cardSize?: number; // default 360
  /** 카드 간격(px) */
  cardGap?: number; // default 60
  /** 모바일 기준(px) */
  mobileBreakpoint?: number; // default 980
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

const defaultBgImages: BgImages = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
];

const defaultCards: CardItem[] = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/360/360?random=${i + 10}`,
  alt: `Card ${i + 1}`,
}));

function SensingParallaxSection({
  topTitle = "위 섹션",
  topDesc = "스크롤을 내리면 패럴랙스 섹션에서 BG 페이드 전환 + 카드 13개 흐름이 보이게 됩니다.",
  bottomTitle = "아래 섹션",
  bottomDesc = "progress가 끝(100%)까지 가면 여기로 넘어옵니다.",
  bgImages,
  cards,
  cardSize = 360,
  cardGap = 60,
}: SensingParallaxProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsWrapRef = useRef<HTMLDivElement | null>(null);
  const fixedBgRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const stage = stageRef.current;
    const cardsWrap = cardsWrapRef.current;
    const fixedBg = fixedBgRef.current;

    if (!section || !stage || !cardsWrap || !fixedBg) return;

    const sectionEl = section;
    const fixedBgEl = fixedBg;
    const stageEl = stage;
    const cardsWrapEl = cardsWrap;

    const cardEls = Array.from(cardsWrapEl.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cardEls.length) return;

    let ticking = false;

    type Metrics = {
      stageH: number;
      visibleH: number;
      contentH: number;
      baseTravel: number;
      totalTravel: number;
    };

    let metrics: Metrics | null = null;

    const root = document.documentElement;
    const setVar = (name: string, value: string) => {
      root.style.setProperty(name, value);
    };

    function updateBgFade(p: number) {
      const s1 = smoothstep(0.0, 0.4, p);
      const s2 = smoothstep(0.3, 0.7, p);
      const s3 = smoothstep(0.6, 1.0, p);

      const bg1 = 1 - s1;
      const bg2 = s1 - s2;
      const bg3 = s2 - s3;
      const bg4 = s3;

      setVar("--bg1", Math.max(0, bg1).toFixed(4));
      setVar("--bg2", Math.max(0, bg2).toFixed(4));
      setVar("--bg3", Math.max(0, bg3).toFixed(4));
      setVar("--bg4", Math.max(0, bg4).toFixed(4));
    }

    function measureAndSetSectionHeight(): Metrics {
      const stageH = stageEl.getBoundingClientRect().height || window.innerHeight;
      const contentH = cardsWrapEl.scrollHeight;
      const visibleH = cardsWrapEl.getBoundingClientRect().height || stageH;

      const baseTravel = Math.max(0, contentH - visibleH);
      const EXIT_EXTRA = Math.round(stageH * 0.55);
      const totalTravel = baseTravel + EXIT_EXTRA;

      sectionEl.style.height = `${stageH + totalTravel}px`;

      return { stageH, visibleH, contentH, baseTravel, totalTravel };
    }

    function calcProgress() {
      const rect = sectionEl.getBoundingClientRect();
      const sectionTopInDoc = window.scrollY + rect.top;

      const stageH = stageEl.getBoundingClientRect().height || window.innerHeight;
      const sectionH = sectionEl.offsetHeight;

      const maxScroll = Math.max(1, sectionH - stageH);
      const y = window.scrollY - sectionTopInDoc;

      return clamp01(y / maxScroll);
    }

    function layoutCards(p: number, m: Metrics) {
      const offsetY = lerp(0, m.totalTravel, p);
      cardsWrapEl.style.transform = `translate3d(0, ${-offsetY}px, 0)`;

      setVar("--p", p.toFixed(4));

      const stageRect = stageEl.getBoundingClientRect();
      const centerY = stageRect.top + stageRect.height * 0.5;

      for (const card of cardEls) {
        const r = card.getBoundingClientRect();
        const cardCenter = (r.top + r.bottom) / 2;
        const dist = Math.abs(cardCenter - centerY);

        const focus = clamp01(1 - dist / (stageRect.height * 0.7));
        const blur = lerp(2.2, 0.0, focus);
        const op = lerp(0.45, 1.0, focus);

        card.style.filter = `blur(${blur}px)`;
        card.style.opacity = op.toFixed(3);
      }
    }

    function update() {
      ticking = false;
      if (!metrics) metrics = measureAndSetSectionHeight();

      const p = calcProgress();
      const rect = sectionEl.getBoundingClientRect();
      // 상단 섹션(100vh)을 완전히 스크롤한 뒤에만 배경 노출
      // parallax top이 viewport top 위로 올라갔을 때 (rect.top <= 0) 패럴랙스 영역 도달
      const inParallaxZone = rect.top <= 0 && rect.bottom > 0;
      fixedBgEl.style.visibility = inParallaxZone ? "visible" : "hidden";

      updateBgFade(p);
      layoutCards(p, metrics);
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    // init
    metrics = measureAndSetSectionHeight();
    update();

    const handleResize = () => {
      metrics = measureAndSetSectionHeight();
      requestTick();
    };

    const ro = new ResizeObserver(() => {
      metrics = measureAndSetSectionHeight();
      requestTick();
    });
    ro.observe(cardsWrapEl);

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReducedMotion, cards.length]);

  return (
    <div className="min-h-screen bg-[#070a0e] text-white/90">
      {/* Skip link (a11y) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        본문 바로가기
      </a>

      <main id="main">
        {/* 상단 섹션 - mdc 10-15, 100vh 스크롤 후 패럴랙스 도달 */}
        <section
          className="section h-screen min-h-screen flex items-center justify-center px-5 py-[70px]
          bg-[radial-gradient(1000px_520px_at_50%_30%,rgba(255,255,255,0.06),transparent_60%),linear-gradient(180deg,#070a0e,#090d12)]"
          aria-label="상단 섹션"
        >
          <div className="demo-box w-full max-w-[960px] rounded-[18px] border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-[26px] font-semibold tracking-[-0.02em]">{topTitle}</h2>
            <p className="text-white/70 leading-[1.7]">{topDesc}</p>
          </div>
        </section>

        {/* Parallax Lock Section - 배경 고정, 카드만 스크롤 */}
        <section
          ref={sectionRef}
          data-parallax-lock
          aria-label="Sensing Solution 패럴랙스 섹션"
          className="relative bg-[#05080c]"
          style={{ height: "260vh" }}
        >
          {/* 배경: position fixed로 뷰포트에 완전 고정, 스크롤과 무관 */}
          <div
            ref={fixedBgRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
          >
            <div
              className="parallax-bg-layer absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: "var(--bg1)" as React.CSSProperties["opacity"] }}
            >
              <img src={bgImages[0]} alt="" className="h-full w-full object-cover" />
            </div>
            <div
              className="parallax-bg-layer absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: "var(--bg2)" as React.CSSProperties["opacity"] }}
            >
              <img src={bgImages[1]} alt="" className="h-full w-full object-cover" />
            </div>
            <div
              className="parallax-bg-layer absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: "var(--bg3)" as React.CSSProperties["opacity"] }}
            >
              <img src={bgImages[2]} alt="" className="h-full w-full object-cover" />
            </div>
            <div
              className="parallax-bg-layer absolute inset-0 transition-opacity duration-500 ease-in-out"
              style={{ opacity: "var(--bg4)" as React.CSSProperties["opacity"] }}
            >
              <img src={bgImages[3]} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Stage: sticky, 카드 영역만 - 배경 위에 레이어링 */}
          <div className="relative z-[1]">
            <div
              ref={stageRef}
              className="sticky top-0 h-screen overflow-visible [isolation:isolate]"
              role="group"
              aria-roledescription="패럴랙스 스테이지"
            >
              <div className="relative z-[1] mx-auto grid h-screen w-full grid-cols-[1.15fr_0.85fr] gap-6 px-5 pb-10 pt-[78px] max-[980px]:grid-cols-1 max-[980px]:pt-[68px]">
                {/* Cards - 스크롤 시 transform으로 위로 이동 */}
                <div
                  ref={cardsWrapRef}
                  className="
                    absolute right-[5%] top-0 z-[2] h-full w-[720px] overflow-visible
                    grid grid-cols-2 content-start
                    gap-[var(--cardGap)] px-0 pb-[30px] pt-[200px] pr-[14px]
                    max-[980px]:static max-[980px]:right-auto max-[980px]:top-auto
                    max-[980px]:w-[200px] max-[980px]:grid-cols-1 max-[980px]:pt-[30px]
                  "
                  aria-label="제품 카드 목록"
                >
                  {/* scroll thumb (원본처럼 둠, 필요하면 보이게 처리 가능) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-1 top-5 h-[84px] w-[3px] rounded-full bg-white/30 opacity-0"
                    style={{
                      transform: `translate3d(0, calc(var(--p) * (100% - 84px)), 0)` as any,
                    }}
                  />

                  {cards.map((c, idx) => (
                    <article
                      key={c.id}
                      data-card
                      data-i={idx}
                      className="parallax-card
                        relative overflow-hidden
                        w-[var(--cardSize)] h-[var(--cardSize)]
                        rounded-[var(--radius)]
                        border border-white/12
                        bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))]
                        shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                        backdrop-blur-[14px]
                        transition-[transform,filter,opacity] duration-300 ease-out
                        [&:nth-child(even)]:not(:first-child):translate-y-[calc(var(--cardSize)*-0.3)]
                        max-[980px]:w-[200px] max-[980px]:h-[200px]
                        max-[980px]:[&:nth-child(even)]:not(:first-child):translate-y-0
                      "
                    >
                      <img src={c.src} alt={c.alt ?? ""} className="block h-full w-full object-cover" />
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* 패럴랙스 CSS 변수 초기값 (원본과 동일) */}
            <style>{`
              :root {
                --p: 0;
                --bg1: 1;
                --bg2: 0;
                --bg3: 0;
                --bg4: 0;
                --cardSize: ${cardSize}px;
                --cardGap: ${cardGap}px;
                --radius: 22px;
              }
              @media (prefers-reduced-motion: reduce) {
                .parallax-bg-layer,
                .parallax-card {
                  transition: none !important;
                }
              }
            `}</style>
          </div>
        </section>

        {/* 하단 섹션 - mdc 51-56, progress 100% 도달 시 여기로 넘어옴 */}
        <section
          className="section h-screen min-h-screen flex items-center justify-center px-5 py-[70px]
          bg-[radial-gradient(1000px_520px_at_50%_30%,rgba(255,255,255,0.06),transparent_60%),linear-gradient(180deg,#070a0e,#090d12)]"
          aria-label="하단 섹션"
        >
          <div className="demo-box w-full max-w-[960px] rounded-[18px] border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-[26px] font-semibold tracking-[-0.02em]">{bottomTitle}</h2>
            <p className="text-white/70 leading-[1.7]">{bottomDesc}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ParallaxCardPage() {
  return (
    <SensingParallaxSection
      bgImages={defaultBgImages}
      cards={defaultCards}
    />
  );
}
