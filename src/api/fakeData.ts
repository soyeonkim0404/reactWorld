import type { CardData } from "./types";

export const fakeCards: CardData[] = [
  {
    id: "1",
    title: "Accordion",
    description: "아코디언 컴포넌트입니다.",
    content: "/components/Accordion",
    tags: ["React", "TypeScript"],
    link: "/accordion",
  },
  {
    id: "2",
    title: "Vertical Navigation",
    description: "사이드 메뉴 컴포넌트입니다.",
    content: "메뉴 네비게이션 컴포넌트들을 모아 놓았습니다.",
    tags: ["React", "TypeScript"],
    link: "/hamburger",
  },
  {
    id: "3",
    title: "세 번째 카드",
    content: "세 번째 카드의 내용입니다. 간단한 설명 없이도 사용할 수 있습니다.",
    tags: ["CSS", "Design"],
    link: "/accordion",
  },
  {
    id: "4",
    title: "네 번째 카드",
    description: "네 번째 카드 설명입니다",
    content: "이것은 네 번째 카드입니다. 더 많은 카드 데이터를 추가할 수 있습니다.",
    tags: ["API", "Backend"],
    link: "/accordion",
  },
  {
    id: "5",
    title: "다섯 번째 카드",
    content: "다섯 번째 카드의 내용입니다.",
    tags: ["Database", "SQL"],
    link: "/accordion",
  },
];
