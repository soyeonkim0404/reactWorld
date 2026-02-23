import type { RouteObject } from "react-router-dom";
import Home from "@/pages/home";
import AccordionPage from "@/pages/accordion";
import Hamburger from "@/pages/hamburger";
import HistoryPage from "@/pages/history";
import ParallaxCardPage from "@/pages/parallaxCard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/accordion",
    element: <AccordionPage />,
  },
  {
    path: "/hamburger",
    element: <Hamburger />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/parallax-card",
    element: <ParallaxCardPage />,
  },
];
