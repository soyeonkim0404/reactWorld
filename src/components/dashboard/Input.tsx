import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";

const INPUT_VARIANTS = {
  default: "",
  password: "",
  withIcon: "",
} as const;

export type InputVariant = keyof typeof INPUT_VARIANTS;

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = ({
  variant = "default",
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type: controlledType,
  className = "",
  id,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = variant === "password" || controlledType === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : controlledType ?? "text";

  const inputId = id ?? `input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[var(--dash-fontSize-lg)] text-[var(--dash-text-secondary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{leftIcon}</div>
        )}
        <input
          id={inputId}
          type={inputType}
          className={`
            h-[50px] w-full rounded-[10px] border border-[var(--dash-text-muted)]
            bg-[var(--dash-background-paper)] px-4
            text-[var(--dash-fontSize-base)] text-[var(--dash-text-secondary)]
            placeholder:text-[var(--dash-text-muted)]
            focus:border-[var(--dash-primary-main)] focus:outline-none
            focus-visible:ring-2 focus-visible:ring-[var(--dash-primary-main)]/30
            disabled:pointer-events-none disabled:opacity-50
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon || isPassword ? "pr-10" : ""}
            ${error ? "border-[var(--dash-status-error)]" : ""}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-secondary)] hover:text-[var(--dash-primary-main)]"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            tabIndex={-1}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        )}
        {rightIcon && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightIcon}</div>
        )}
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="text-[var(--dash-fontSize-sm)] text-[var(--dash-status-error)]"
          role="alert"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-[var(--dash-fontSize-sm)] text-[var(--dash-text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
