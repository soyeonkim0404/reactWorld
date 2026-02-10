import VerticalNavi from "@/components/VerticalNavi";
import type { NavItem } from "@/components/VerticalNavi";

const Hamburger = () => {
  const navItems: NavItem[] = [
    {
      label: "홈",
      path: "/",
    },
    {
      label: "컴포넌트",
      path: "/components",
      children: [
        {
          label: "아코디언",
          path: "/accordion",
        },
        {
          label: "카드",
          path: "/cards",
          children: [
            {
              label: "카드 목록",
              path: "/cards/list",
            },
            {
              label: "카드 상세",
              path: "/cards/detail",
            },
          ],
        },
      ],
    },
    {
      label: "설정",
      path: "/settings",
      children: [
        {
          label: "일반 설정",
          path: "/settings/general",
        },
        {
          label: "고급 설정",
          path: "/settings/advanced",
          children: [
            {
              label: "보안",
              path: "/settings/advanced/security",
            },
            {
              label: "알림",
              path: "/settings/advanced/notifications",
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
