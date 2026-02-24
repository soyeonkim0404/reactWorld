import type { RouteObject } from "react-router-dom";
import WebLayout from "@/layouts/WebLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/web/home";
import AccordionPage from "@/pages/web/accordion";
import Hamburger from "@/pages/web/hamburger";
import HistoryPage from "@/pages/web/history";
import History from "@/pages/web/history2";
import ParallaxCardPage from "@/pages/web/parallaxCard";
import Test01 from "@/pages/web/codingtest/test01";
import Test01RE from "@/pages/web/codingtest/tes01-refectoring";
import DashboardIndex from "@/pages/dashboard";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "accordion",
        element: <AccordionPage />,
      },
      {
        path: "hamburger",
        element: <Hamburger />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "history2",
        element: <History />,
      },
      {
        path: "parallax-card",
        element: <ParallaxCardPage />,
      },
      {
        path: "coding-test/test01",
        element: <Test01 />,
      },
      {
        path: "coding-test/test01-refectoring",
        element: <Test01RE />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
    ],
  },
];
