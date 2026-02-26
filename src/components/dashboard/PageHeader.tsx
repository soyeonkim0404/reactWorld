import type { ReactNode } from "react";

export interface PageHeaderProps {
  /** 페이지 타이틀 (왼쪽) */
  title: string;
  /** 우측 액션 영역 (DatePicker, Select, Button, Input 등) */
  actions?: ReactNode;
  /** 추가 className */
  className?: string;
}

/**
 * Figma SAAS Dashboard - 페이지 헤더
 * - 왼쪽: 페이지 타이틀 (24px Nunito SemiBold #030229)
 * - 오른쪽: 액션 영역 (DatePicker, Select, Button 등)
 */
const PageHeader = ({ title, actions, className = "" }: PageHeaderProps) => {
  return (
    <header
      className={`flex items-center justify-between gap-4 ${className}`}
      role="banner"
      aria-label={`${title} 페이지 헤더`}
    >
      <h1
        className="truncate font-semibold text-[var(--dash-text-secondary)]"
        style={{
          fontFamily: "var(--dash-fontFamily-primary)",
          fontSize: "var(--dash-fontSize-3xl)",
          lineHeight: "var(--dash-lineHeight-3xl)",
        }}
      >
        {title}
      </h1>
      {actions != null && (
        <div className="flex shrink-0 items-center gap-3">{actions}</div>
      )}
    </header>
  );
};

export default PageHeader;
