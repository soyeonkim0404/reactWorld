import { AppUrls } from "@/commons/constants/url";

export type CardItem = {
  id: string;
  number: string;
  tag?: string;
  title: string;
  link?: string;
};

export const mainCardData: CardItem[] = [
  {
    id: "1",
    number: "#001",
    tag: "Component",
    title: "Accordion Component",
    link: AppUrls.WEB.ACCORDION,
  },
  {
    id: "2",
    number: "#002",
    tag: "Component",
    title: "Sidebar Component",
    link: AppUrls.WEB.HAMBURGER,
  },
  {
    id: "3",
    number: "#003",
    tag: "Page",
    title: "History Page",
    link: AppUrls.WEB.HISTORY,
  },
  {
    id: "4",
    number: "#004",
    tag: "Page",
    title: "Parallax Card Page",
    link: AppUrls.WEB.PARALLAX_CARD,
  },
  {
    id: "5",
    number: "#005",
    tag: "Page",
    title: "History Page 2",
    link: AppUrls.WEB.HISTORY2,
  },
  {
    id: "6",
    number: "#006",
    tag: "Page",
    title: "Coding Test 01",
    link: AppUrls.CODING_TEST.TEST01,
  },
  {
    id: "7",
    number: "#007",
    tag: "Page",
    title: "Coding Test 01 Refectoring",
    link: AppUrls.CODING_TEST.TEST01_REFACTORING,
  },
];
