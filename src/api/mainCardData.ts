export type CardItem = {
  id: string;
  number: string;
  tag?: string;
  title: string;
  link?: string;
};

export const mainCardData: CardItem[] = [
  { id: "1", number: "#001", tag: "컴포넌트", title: "아코디언 컴포넌트", link: "/accordion" },
  { id: "2", number: "#002", tag: "컴포넌트", title: "사이드바 컴포넌트", link: "/hamburger" },
  { id: "3", number: "#003", tag: "컴포넌트", title: "（サンプル）記事タイトルが入ります" },
  { id: "4", number: "#004", tag: "컴포넌트", title: "（サンプル）カード UI 테스트" },
  { id: "5", number: "#005", tag: "컴포넌트", title: "（サンプル）ドラッグしてみて" },
  { id: "6", number: "#006", tag: "컴포넌트", title: "（サンプル）CTA → 로 상세보기" },
  { id: "7", number: "#007", tag: "컴포넌트", title: "（サンプル）겹침 레이어" },
];
