import type { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Divider = ({
  label,
  className = "",
  ...props
}: DividerProps) => {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    >
      <div
        className="h-px flex-1 bg-[var(--dash-primary-dark)]"
        aria-hidden
      />
      {label && (
        <span
          className="text-[var(--dash-fontSize-lg)] font-semibold text-[var(--dash-text-secondary)]"
          aria-hidden
        >
          {label}
        </span>
      )}
      <div
        className="h-px flex-1 bg-[var(--dash-primary-dark)]"
        aria-hidden
      />
    </div>
  );
};

export default Divider;
