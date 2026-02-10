import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export interface VerticalNaviProps {
  items: NavItem[];
  className?: string;
}

const VerticalNavi = ({ items, className = "" }: VerticalNaviProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  // 현재 경로에 따라 자동으로 메뉴 열기
  useEffect(() => {
    const findAndOpenPath = (navItems: NavItem[], currentPath: string): void => {
      navItems.forEach((item) => {
        if (item.path && currentPath.startsWith(item.path)) {
          setOpenMenus((prev) => new Set(prev).add(item.path!));
        }
        if (item.children) {
          findAndOpenPath(item.children, currentPath);
        }
      });
    };
    findAndOpenPath(items, location.pathname);
  }, [location.pathname, items]);

  // 특정 path의 직접적인 같은 레벨 sibling 메뉴들 찾기
  const findDirectSiblings = (targetPath: string, navItems: NavItem[]): NavItem[] | null => {
    // 현재 레벨에서 targetPath 찾기
    for (const item of navItems) {
      if (item.path === targetPath) {
        // 같은 레벨의 다른 아이템들 반환
        return navItems.filter((i) => i.path !== targetPath);
      }
      // 하위 레벨에서 찾기
      if (item.children) {
        const found = findDirectSiblings(targetPath, item.children);
        if (found !== null) {
          return found;
        }
      }
    }
    return null;
  };

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(path)) {
        // 닫기: 해당 메뉴와 하위 메뉴들 모두 닫기
        newSet.delete(path);
        const removeChildren = (navItems: NavItem[]) => {
          navItems.forEach((item) => {
            if (item.path && item.path.startsWith(path + "/")) {
              newSet.delete(item.path);
            }
            if (item.children) {
              removeChildren(item.children);
            }
          });
        };
        removeChildren(items);
      } else {
        // 열기: 같은 레벨의 다른 메뉴들만 닫기
        const siblings = findDirectSiblings(path, items);
        if (siblings) {
          siblings.forEach((sibling) => {
            if (sibling.path) {
              newSet.delete(sibling.path);
              // 하위 메뉴들도 닫기
              const removeChildren = (navItems: NavItem[]) => {
                navItems.forEach((item) => {
                  if (item.path && item.path.startsWith(sibling.path! + "/")) {
                    newSet.delete(item.path);
                  }
                  if (item.children) {
                    removeChildren(item.children);
                  }
                });
              };
              removeChildren(items);
            }
          });
        }
        newSet.add(path);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0) {
      // 자식이 있으면 메뉴 토글
      if (item.path) {
        toggleMenu(item.path);
      }
    } else if (item.path) {
      // 자식이 없으면 네비게이션
      navigate(item.path);
    }
  };

  const isActive = (path?: string): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isOpen = (path?: string): boolean => {
    if (!path) return false;
    return openMenus.has(path) || isActive(path);
  };

  const renderNavItem = (item: NavItem, depth: number = 0, parentPath?: string) => {
    const fullPath = item.path || `${parentPath}/${item.label}`;
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.path);
    const open = isOpen(item.path);

    const paddingLeft = depth * 20 + 16;
    const baseClasses = `
      flex items-center justify-between w-full px-4 py-3 text-left transition-colors
      ${active ? "bg-violet-50 text-violet-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}
    `;

    return (
      <div key={fullPath} className="w-full">
        <button
          type="button"
          className={baseClasses}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleItemClick(item)}
        >
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            <div className="ml-2">
              {open ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
            </div>
          )}
        </button>
        {hasChildren && open && (
          <div className="w-full">{item.children!.map((child) => renderNavItem(child, depth + 1, fullPath))}</div>
        )}
      </div>
    );
  };

  return (
    <nav className={`bg-white border-r border-gray-200 ${className}`} style={{ minHeight: "calc(100vh - 60px)" }}>
      <div className="py-2">
        {items.map((item, index) => (
          <div key={index}>{renderNavItem(item, 0)}</div>
        ))}
      </div>
    </nav>
  );
};

export default VerticalNavi;
