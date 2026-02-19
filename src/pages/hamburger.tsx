import VerticalNavi from "../components/common/VerticalNavi";
import type { NavItem } from "../components/common/VerticalNavi";

const Hamburger = () => {
  const navItems: NavItem[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "1.depth",
      path: "/components",
      children: [
        {
          label: "1-1.menu",
          path: "/",
        },
        {
          label: "1-2.menu",
          path: "/",
          children: [
            {
              label: "1-2-1.menu",
              path: "/",
            },
            {
              label: "1-2-2.menu",
              path: "/",
            },
          ],
        },
      ],
    },
    {
      label: "2.depth",
      path: "/",
      children: [
        {
          label: "2-1.menu",
          path: "/",
        },
        {
          label: "2-2.menu",
          path: "/",
          children: [
            {
              label: "2-2-1.menu",
              path: "/",
            },
            {
              label: "2-2-2.menu",
              path: "/",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex">
      <VerticalNavi items={navItems} className="w-64" />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hamburger Menu</h1>
        <p className="text-gray-600">사이드 네비게이션 메뉴 예시 페이지입니다.</p>
      </div>
    </div>
  );
};

export default Hamburger;
