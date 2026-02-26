import type { RouteObject } from "react-router-dom";
import { AppUrls } from "@/commons/constants/url";
import WebLayout from "@/layouts/WebLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Home from "@/pages/web/home";
import AccordionPage from "@/pages/web/accordion";
import Hamburger from "@/pages/web/hamburger";
import HistoryPage from "@/pages/web/history";
import History from "@/pages/web/history2";
import ParallaxCardPage from "@/pages/web/parallaxCard";
import Test01 from "@/pages/codingtest/test01";
import Test01RE from "@/pages/codingtest/tes01-refectoring.tsx";
import DashboardIndex from "@/pages/dashboard";

export const routes: RouteObject[] = [
  {
    path: AppUrls.WEB.HOME,
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: AppUrls.WEB.ACCORDION.slice(1),
        element: <AccordionPage />,
      },
      {
        path: AppUrls.WEB.HAMBURGER.slice(1),
        element: <Hamburger />,
      },
      {
        path: AppUrls.WEB.HISTORY.slice(1),
        element: <HistoryPage />,
      },
      {
        path: AppUrls.WEB.HISTORY2.slice(1),
        element: <History />,
      },
      {
        path: AppUrls.WEB.PARALLAX_CARD.slice(1),
        element: <ParallaxCardPage />,
      },
      {
        path: AppUrls.CODING_TEST.TEST01.slice(1),
        element: <Test01 />,
      },
      {
        path: AppUrls.CODING_TEST.TEST01_REFACTORING.slice(1),
        element: <Test01RE />,
      },
    ],
  },
  {
    path: AppUrls.DASHBOARD.ROOT,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
    ],
  },
];
