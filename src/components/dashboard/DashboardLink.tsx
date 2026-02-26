import { Link, type LinkProps } from "react-router-dom";

export interface DashboardLinkProps extends LinkProps {
  /** 외부 링크일 경우 href 사용, 내부 라우팅은 to 사용 */
  href?: never;
}

const DashboardLink = ({
  className = "",
  children,
  ...props
}: DashboardLinkProps) => {
  return (
    <Link
      className={`
        text-[var(--dash-fontSize-base)] text-[var(--dash-primary-main)]
        underline-offset-2 hover:underline
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-primary-main)]
        focus-visible:ring-offset-2
        ${className}
      `}
      {...props}
    >
      {children}
    </Link>
  );
};

export default DashboardLink;
