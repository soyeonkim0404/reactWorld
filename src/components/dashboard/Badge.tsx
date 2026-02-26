import type { HTMLAttributes, ReactNode } from "react";

/* Figma: Notification Badge (Messages 49) - 연한 빨간 배경 + 빨간 텍스트 */
/* Figma: Status Badge (테이블 Total Order) - 61x30, radius 8, bg #26c0e2, text 12px Bold */
const BADGE_VARIANTS = {
  count:
    "bg-[var(--dash-status-error)]/20 text-[var(--dash-status-error)] min-w-[22px] h-[14px] px-1.5 rounded-[7px]",
  dot: "w-2 h-2 rounded-full bg-[var(--dash-status-error)] p-0 min-w-0",
  status:
    "bg-[var(--dash-status-success)]/20 text-[var(--dash-status-success)] min-w-[61px] h-[30px] px-3 rounded-lg",
} as const;

/* Figma: count 10px SemiBold, status 12px Bold */
const BADGE_SIZES = {
  sm: "text-[10px] font-semibold leading-[14px]",
  md: "text-[12px] font-bold leading-4",
} as const;

export type BadgeVariant = keyof typeof BADGE_VARIANTS;
export type BadgeSize = keyof typeof BADGE_SIZES;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  count?: number;
  children?: ReactNode;
}

const Badge = ({
  variant = "count",
  size = "sm",
  count,
  children,
  className = "",
  ...props
}: BadgeProps) => {
  const isDot = variant === "dot";
  const display = isDot ? null : count ?? children;

  return (
    <span
      className={`
        inline-flex items-center justify-center
        ${BADGE_VARIANTS[variant]}
        ${!isDot ? BADGE_SIZES[size] : ""}
        ${className}
      `}
      role={count !== undefined ? "status" : undefined}
      aria-live={count !== undefined ? "polite" : undefined}
      aria-label={count !== undefined ? `알림 ${count}건` : undefined}
      {...props}
    >
      {display}
    </span>
  );
};

export default Badge;
