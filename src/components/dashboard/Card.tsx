import type { HTMLAttributes, ReactNode } from "react";

const CARD_VARIANTS = {
  default:
    "bg-[var(--dash-background-paper)] rounded-[10px]",
  elevated:
    "bg-[var(--dash-background-paper)] rounded-[10px] shadow-md",
  row: "bg-[var(--dash-background-light)] rounded-[5px]",
} as const;

export type CardVariant = keyof typeof CARD_VARIANTS;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

const Card = ({
  variant = "default",
  className = "",
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={`
        ${CARD_VARIANTS[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
