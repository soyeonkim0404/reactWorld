import React from "react";
import { useNavigate } from "react-router-dom";
import type { CardItem } from "../../api/mainCardData";

type Pos = { x: number; y: number };

type DragCardItemProps = {
  it: CardItem;
  id: string;
  p: Pos;
  z: number;
  topIndex: number;
  isBehindDim: boolean;
  reducedMotion: boolean;
  onPointerDownCard: (e: React.PointerEvent, id: string) => void;
};

export default function DragCardItem({
  it,
  id,
  p,
  z,
  topIndex,
  isBehindDim,
  reducedMotion,
  onPointerDownCard,
}: DragCardItemProps) {
  const navigate = useNavigate();
  return (
    <article
      className={[
        "absolute select-none",
        "w-[min(540px,86vw)] max-w-[540px]",
        "h-[min(280px,38vh)] min-h-[220px]",
        "bg-white",
        "border-[6px] border-black",
        "shadow-[0_10px_0_rgba(0,0,0,1)]",
        reducedMotion ? "" : "transition-[transform,opacity,filter] duration-200 ease-out",
        isBehindDim ? "opacity-60" : "opacity-100",
        isBehindDim ? "blur-[0.2px]" : "",
      ].join(" ")}
      style={{
        zIndex: z,
        left: p.x,
        top: p.y,
        transform: `translate3d(0,0,0) scale(${z === 10 + topIndex ? 1.01 : 1})`,
        cursor: "grab",
      }}
      onPointerDown={(e) => onPointerDownCard(e, id)}
      role="group"
      aria-roledescription="draggable card"
    >
      {it.link ? (
        <button
          type="button"
          className="absolute inset-0 z-0"
          aria-label={`${it.number} 카드 열기`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => navigate(it.link!)}
        />
      ) : null}

      <div className="relative z-10 flex h-full flex-col p-6">
        <div className="flex items-baseline gap-3">
          <div className="text-6xl font-black tracking-tight">{it.number}</div>
          {it.tag && (
            <span className="inline-flex items-center border-4 border-black px-2 py-1 text-base font-bold">
              {it.tag}
            </span>
          )}
        </div>

        <div className="mt-3 text-lg font-semibold leading-snug">{it.title}</div>

        <div className="mt-auto flex items-end justify-between">
          <div className="text-xs text-gray-500">drag and click to detail</div>

          {it.link ? (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                navigate(it.link!);
              }}
              className={[
                "grid h-12 w-12 place-items-center",
                "border-4 border-black bg-white",
                "shadow-[4px_4px_0_rgba(0,0,0,1)]",
                "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                "focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40",
              ].join(" ")}
              aria-label="상세로 이동"
            >
              <span className="text-2xl font-black">→</span>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
