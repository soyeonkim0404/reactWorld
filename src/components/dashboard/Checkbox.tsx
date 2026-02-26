import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Checkbox = ({
  label,
  id,
  className = "",
  ...props
}: CheckboxProps) => {
  const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2)}`;

  return (
    <label
      htmlFor={inputId}
      className={`
        inline-flex cursor-pointer items-center gap-2.5
        text-[var(--dash-fontSize-base)] text-[var(--dash-text-secondary)]
        ${className}
      `}
    >
      <input
        id={inputId}
        type="checkbox"
        className={`
          h-[15px] w-[15px] shrink-0 rounded-[2px] border-2
        border-[var(--dash-primary-dark)]
        accent-[var(--dash-primary-main)]
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[var(--dash-primary-main)] focus-visible:ring-offset-1
        disabled:pointer-events-none disabled:opacity-50
        `}
        aria-checked={props.checked}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
