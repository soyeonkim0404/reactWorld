import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

export interface VerticalNaviProps {
  items: NavItem[];
  className?: string;
}

// 트리 위치로 고유 키 생성 (path 중복 시 구분용)
type MenuKey = string;

const VerticalNavi = ({ items, className = "" }: VerticalNaviProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Set<MenuKey>>(new Set());

  // menuKey로 NavItem 찾기
  const findItemByKey = (navItems: NavItem[], key: MenuKey, parentKey: string = ""): NavItem | null => {
    for (let i = 0; i < navItems.length; i++) {
      const k = parentKey ? `${parentKey}.${i}` : String(i);
      if (k === key) return navItems[i];
      if (navItems[i].children) {
        const found = findItemByKey(navItems[i].children!, key, k);
        if (found) return found;
      }
    }
    return null;
  };

  // 같은 레벨 sibling들의 menuKey 찾기
  const findSiblingKeys = (targetKey: MenuKey): MenuKey[] => {
    const parts = targetKey.split(".");
    if (parts.length === 1) {
      return items.map((_, i) => String(i)).filter((k) => k !== targetKey);
    }
    const parentParts = parts.slice(0, -1);
    const parentKey = parentParts.join(".");
    const parent = findItemByKey(items, parentKey);
    if (!parent?.children) return [];
    return parent.children.map((_, i) => `${parentKey}.${i}`).filter((k) => k !== targetKey);
  };

  // 서브트리 내 모든 menuKey 수집
  const collectKeysInSubtree = (item: NavItem, parentKey: string): MenuKey[] => {
    const keys: MenuKey[] = [];
    if (item.children) {
      item.children.forEach((child, i) => {
        const k = parentKey ? `${parentKey}.${i}` : String(i);
        keys.push(k);
        keys.push(...collectKeysInSubtree(child, k));
      });
    }
    return keys;
  };

  // 현재 경로에 따라 자동으로 메뉴 열기 (path 기반, 매칭되는 항목과 그 ancestor만)
  useEffect(() => {
    const keysToOpen = new Set<MenuKey>();
    const pathMatches = (itemPath: string, currentPath: string) =>
      itemPath === "/" ? currentPath === "/" : currentPath === itemPath || currentPath.startsWith(itemPath + "/");

    const findAndOpenByPath = (navItems: NavItem[], currentPath: string, parentKey: string): boolean => {
      for (let i = 0; i < navItems.length; i++) {
        const key: MenuKey = parentKey ? `${parentKey}.${i}` : String(i);
        if (navItems[i].path && pathMatches(navItems[i].path!, currentPath)) {
          keysToOpen.add(key);
          if (navItems[i].children) {
            findAndOpenByPath(navItems[i].children!, currentPath, key);
          }
          return true;
        }
        if (navItems[i].children) {
          if (findAndOpenByPath(navItems[i].children!, currentPath, key)) {
            keysToOpen.add(key);
            return true;
          }
        }
      }
      return false;
    };
    findAndOpenByPath(items, location.pathname, "");
    setOpenMenus((prev) => {
      const next = new Set(prev);
      keysToOpen.forEach((k) => next.add(k));
      return next;
    });
  }, [location.pathname, items]);

  const toggleMenu = (menuKey: MenuKey) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      const item = findItemByKey(items, menuKey);

      if (newSet.has(menuKey)) {
        // 닫기: 해당 메뉴와 그 서브트리 전체 닫기
        newSet.delete(menuKey);
        if (item) collectKeysInSubtree(item, menuKey).forEach((k) => newSet.delete(k));
      } else {
        // 열기: 같은 레벨의 다른 메뉴들 + 그 서브트리 전체 닫기
        const siblingKeys = findSiblingKeys(menuKey);
        siblingKeys.forEach((k) => {
          newSet.delete(k);
          const siblingItem = findItemByKey(items, k);
          if (siblingItem) collectKeysInSubtree(siblingItem, k).forEach((sk) => newSet.delete(sk));
        });
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavItem, menuKey: MenuKey) => {
    if (item.children && item.children.length > 0) {
      toggleMenu(menuKey);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path?: string): boolean => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const isOpen = (menuKey: MenuKey): boolean => {
    return openMenus.has(menuKey);
  };

  const renderNavItem = (item: NavItem, depth: number = 0, parentPath?: string, menuKey: MenuKey = "0") => {
    const fullPath = item.path || `${parentPath}/${item.label}`;
    const hasChildren = item.children && item.children.length > 0;
    const active = isActive(item.path);
    const open = isOpen(menuKey);

    const paddingLeft = depth * 20 + 16;
    const baseClasses = `
      flex items-center justify-between w-full px-4 py-3 text-left transition-colors
      ${active ? "bg-violet-50 text-violet-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}
    `;

    return (
      <div key={menuKey} className="w-full">
        <button
          type="button"
          className={baseClasses}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => handleItemClick(item, menuKey)}
        >
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            <div className="ml-2">
              {open ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
            </div>
          )}
        </button>
        {hasChildren && open && (
          <div className="w-full">
            {item.children!.map((child, i) =>
              renderNavItem(child, depth + 1, fullPath, `${menuKey}.${i}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`bg-white border-r border-gray-200 ${className}`} style={{ minHeight: "calc(100vh - 60px)" }}>
      <div className="py-2">
        {items.map((item, index) => (
          <div key={index}>{renderNavItem(item, 0, undefined, String(index))}</div>
        ))}
      </div>
    </nav>
  );
};

export default VerticalNavi;
