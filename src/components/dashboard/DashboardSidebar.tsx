import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import { IconCategory } from "@/components/dashboardIcons/IconCategory";
import { IconChart } from "@/components/dashboardIcons/IconChart";
import { IconTicket } from "@/components/dashboardIcons/IconTicket";
import { IconDocument } from "@/components/dashboardIcons/IconDocument";
import { IconCalendar } from "@/components/dashboardIcons/IconCalendar";
import { IconActivity } from "@/components/dashboardIcons/IconActivity";
import { IconNotification } from "@/components/dashboardIcons/IconNotification";
import { IconSetting } from "@/components/dashboardIcons/IconSetting";
import { IconLogout } from "@/components/dashboardIcons/IconLogout";
import { AppUrls } from "@/commons/constants/url";
import Badge from "./Badge";

export interface NavItemConfig {
  to: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

const DEFAULT_NAV_ITEMS: NavItemConfig[] = [
  { to: AppUrls.DASHBOARD.ROOT, label: "Dashboard", icon: <IconCategory width={24} height={24} /> },
  { to: AppUrls.DASHBOARD.ANALYTICS, label: "Analytics", icon: <IconChart width={24} height={24} /> },
  { to: AppUrls.DASHBOARD.INVOICES, label: "Invoice", icon: <IconTicket width={24} height={24} /> },
  { to: AppUrls.DASHBOARD.SCHEDULE, label: "Schedule", icon: <IconDocument width={24} height={24} /> },
  { to: AppUrls.DASHBOARD.CALENDAR, label: "Calendar", icon: <IconCalendar width={24} height={24} /> },
  {
    to: AppUrls.DASHBOARD.CHAT,
    label: "Messages",
    icon: <IconActivity width={24} height={24} />,
    badge: 49,
  },
  { to: "#notification", label: "Notification", icon: <IconNotification width={24} height={24} /> },
  { to: "#settings", label: "Settings", icon: <IconSetting width={24} height={24} /> },
];

export interface DashboardSidebarProps {
  /** 로고/브랜드 영역 */
  logo?: ReactNode;
  /** 네비게이션 아이템 (기본값: Figma 분석 기반 메뉴) */
  navItems?: NavItemConfig[];
  /** 하단 영역 (프로필, 로그아웃 등) */
  footer?: ReactNode;
  className?: string;
}

const DashboardSidebar = ({
  logo,
  navItems = DEFAULT_NAV_ITEMS,
  footer,
  className = "",
}: DashboardSidebarProps) => {
  return (
    <aside
      className={`group relative flex shrink-0 flex-col overflow-hidden bg-[var(--dash-background-paper)] w-20 transition-[width] duration-200 ease-in-out hover:w-[218px] ${className}`}
      style={{ fontFamily: "var(--dash-fontFamily-primary)" }}
      role="navigation"
      aria-label="대시보드 메인 네비게이션"
    >
      <div className="flex h-full min-h-screen flex-col">
        {logo ? (
          <div className="flex items-center gap-3 overflow-hidden px-4 py-6">{logo}</div>
        ) : (
          <div className="flex items-center gap-3 overflow-hidden px-4 py-6">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--dash-primary-main)]"
              aria-hidden
            >
              <span
                className="text-xs font-semibold text-[var(--dash-text-inverse)]"
                style={{ fontFamily: "var(--dash-fontFamily-primary)" }}
              >
                Base
              </span>
            </div>
            <span className="hidden shrink-0 truncate whitespace-nowrap font-semibold text-[var(--dash-text-secondary)] group-hover:inline-block" style={{ fontSize: "var(--dash-fontSize-3xl)" }}>
              Base
            </span>
          </div>
        )}
        <nav className="flex flex-1 flex-col gap-0 overflow-hidden px-3">
          {navItems.map((item) => {
            const isExternal = item.to.startsWith("#") || item.to.startsWith("http");
            const content = (
              <>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center [&_svg]:shrink-0">
                  {item.icon}
                </span>
                <span className="hidden truncate whitespace-nowrap group-hover:inline-block">{item.label}</span>
                {item.badge !== undefined && (
                  <Badge variant="count" count={item.badge} className="ml-auto hidden group-hover:inline-flex" />
                )}
              </>
            );

            const baseNavClass =
              "flex min-w-0 items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-[var(--dash-fontSize-lg)] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-primary-main)] focus-visible:ring-offset-1 [&_path]:fill-[#030229]";
            const inactiveClass = "text-[#030229] hover:bg-[var(--dash-background-light)]";
            const activeClass =
              "bg-gradient-to-r from-[#aca9ff]/30 to-transparent text-[#605bff] [&_path]:fill-[#605bff]";

            if (isExternal) {
              return (
                <a
                  key={item.to + item.label}
                  href={item.to}
                  className={`${baseNavClass} ${inactiveClass}`}
                >
                  {content}
                </a>
              );
            }

            return (
              <NavLink
                key={item.to + item.label}
                to={item.to}
                end={item.to === AppUrls.DASHBOARD.ROOT}
                className={({ isActive }) =>
                  `${baseNavClass} ${isActive ? activeClass : inactiveClass}`
                }
              >
                {content}
              </NavLink>
            );
          })}
        </nav>
        {footer ?? (
          <div className="border-t border-[#030229]/20 p-4">
            <button
              type="button"
              className="flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-lg px-4 py-3 text-[var(--dash-fontSize-lg)] font-semibold text-[#030229] hover:bg-[var(--dash-background-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--dash-primary-main)] focus-visible:ring-offset-1"
              aria-label="로그아웃"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <IconLogout width={18} height={17} />
              </span>
              <span className="hidden truncate whitespace-nowrap group-hover:inline-block">
                Log Out
              </span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
