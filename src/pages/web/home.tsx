import React, { useEffect, useMemo, useRef, useState } from "react";
import { mainCardData } from "@/api/mainCardData";
import DragCardItem from "@/components/main/DragCardItem";

type Pos = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// ✅ 셔플 유틸
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function VideoStyleCardDeck() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const items = mainCardData;

  // ✅ 첫 렌더 때 랜덤 order
  const initialOrder = useMemo(() => shuffle(items.map((it) => it.id)), [items]);

  // z-order: 마지막이 top
  const [order, setOrder] = useState<string[]>(initialOrder);

  const [pos, setPos] = useState<Record<string, Pos>>({});
  const dragRef = useRef<{
    id: string | null;
    pointerId: number | null;
    offsetX: number;
    offsetY: number;
  }>({ id: null, pointerId: null, offsetX: 0, offsetY: 0 });

  // ✅ 초기 랜덤 배치 (컨테이너 크기 기준)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const init = () => {
      const rect = el.getBoundingClientRect();
      const next: Record<string, Pos> = {};
      const pad = 24;

      // 카드 크기 감안(대략)
      const cardW = Math.min(540, Math.max(360, rect.width * 0.38));
      const cardH = Math.min(280, Math.max(220, rect.height * 0.22));

      const xMax = Math.max(pad, rect.width - cardW - pad);
      const yMax = Math.max(pad, rect.height - cardH - pad);

      // ✅ 배치도 랜덤, 순서도 랜덤
      const ids = shuffle(items.map((it) => it.id));
      setOrder(ids);

      // ✅ 겹침 느낌을 위해 "중앙 근처 + 랜덤" 분포(영상 느낌)
      const cx = (pad + xMax) / 2;
      const cy = (pad + yMax) / 2;

      ids.forEach((id) => {
        // 중앙에서 퍼지게 (너무 균등한 랜덤보다 자연스러움)
        const rx = (Math.random() - 0.5) * (xMax - pad) * 0.85;
        const ry = (Math.random() - 0.5) * (yMax - pad) * 0.85;

        const x = clamp(cx + rx, pad, xMax);
        const y = clamp(cy + ry, pad, yMax);

        next[id] = { x, y };
      });

      setPos(next);
    };

    init();
    const ro = new ResizeObserver(() => init());
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]); // ✅ items가 상수면 length만

  const bringToFront = (id: string) => {
    setOrder((prev) => {
      const filtered = prev.filter((x) => x !== id);
      return [...filtered, id];
    });
  };

  // ✅ 드래그 시작할 때만 전면
  const onPointerDownCard = (e: React.PointerEvent, id: string) => {
    bringToFront(id);

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const p = pos[id];
    if (!p) return;

    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    dragRef.current = {
      id,
      pointerId: e.pointerId,
      offsetX: px - p.x,
      offsetY: py - p.y,
    };

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;

    const { id, pointerId, offsetX, offsetY } = dragRef.current;
    if (!id || pointerId !== e.pointerId) return;

    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const cardW = Math.min(540, Math.max(360, rect.width * 0.38));
    const cardH = Math.min(280, Math.max(220, rect.height * 0.22));
    const pad = 8;

    const x = clamp(px - offsetX, pad, rect.width - cardW - pad);
    const y = clamp(py - offsetY, pad, rect.height - cardH - pad);

    setPos((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const { pointerId } = dragRef.current;
    if (pointerId !== e.pointerId) return;
    dragRef.current = { id: null, pointerId: null, offsetX: 0, offsetY: 0 };
  };

  return (
    <section className="w-full">
      <div
        ref={containerRef}
        className="relative min-h-[100vh] w-full overflow-hidden bg-white"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {order.map((id) => {
          const it = items.find((x) => x.id === id)!;
          const p = pos[id] ?? { x: 24, y: 24 };
          const topIndex = order.length - 1;
          const z = 10 + order.indexOf(id);
          const isBehindDim = false;

          return (
            <DragCardItem
              key={id}
              it={it}
              id={id}
              p={p}
              z={z}
              topIndex={topIndex}
              isBehindDim={isBehindDim}
              reducedMotion={reducedMotion}
              onPointerDownCard={onPointerDownCard}
            />
          );
        })}

        <p className="sr-only">
          카드들은 드래그로 이동할 수 있으며, 클릭하면 포커스 모드로 전환됩니다. ESC로 닫을 수 있습니다.
        </p>
      </div>
    </section>
  );
}
