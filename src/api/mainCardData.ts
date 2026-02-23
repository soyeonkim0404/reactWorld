export type CardItem = {
  id: string;
  number: string;
  tag?: string;
  title: string;
  link?: string;
};

export const mainCardData: CardItem[] = [
  { id: "1", number: "#001", tag: "Component", title: "Accordion Component", link: "/accordion" },
  { id: "2", number: "#002", tag: "Component", title: "Sidebar Component", link: "/hamburger" },
  { id: "3", number: "#003", tag: "Page", title: "History Page", link: "/history" },
  { id: "4", number: "#004", tag: "Page", title: "Parallax Card Page", link: "/parallax-card" },
];
