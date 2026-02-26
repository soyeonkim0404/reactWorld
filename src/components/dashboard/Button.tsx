import type { ButtonHTMLAttributes, ReactNode } from "react";

const BUTTON_VARIANTS = {
  primary:
    "bg-[var(--dash-primary-main)] text-[var(--dash-text-inverse)] hover:opacity-90",
  secondary:
    "bg-[var(--dash-background-light)] text-[var(--dash-text-secondary)] hover:bg-[var(--dash-text-muted)]",
  outline:
    "border-2 border-[var(--dash-primary-main)] text-[var(--dash-primary-main)] bg-transparent hover:bg-[var(--dash-primary-light)]/20",
  ghost:
    "bg-transparent text-[var(--dash-text-secondary)] hover:bg-[var(--dash-background-light)]",
  social:
    "border border-[var(--dash-primary-dark)] text-[var(--dash-text-secondary)] bg-[var(--dash-background-paper)] hover:bg-[var(--dash-background-light)]",
} as const;

const BUTTON_SIZES = {
  sm: "h-10 px-4 text-[var(--dash-fontSize-sm)]",
  md: "h-[50px] px-6 text-[var(--dash-fontSize-lg)]",
  lg: "h-[60px] px-8 text-[var(--dash-fontSize-xl)]",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center rounded-[10px] font-semibold
        transition-opacity focus:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--dash-primary-main)] focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        ${BUTTON_VARIANTS[variant]}
        ${BUTTON_SIZES[size]}
        ${className}
      `}
      aria-busy={isLoading}
      aria-disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
