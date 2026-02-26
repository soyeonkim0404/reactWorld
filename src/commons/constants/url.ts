/**
 * Figma 채널 31p10jim - SAAS Dashboard 페이지 구조 분석 기반 URL 상수
 *
 * 페이지 구조:
 * - WEB: 홈, accordion, hamburger, history, parallax-card 등 공개 페이지
 * - CODING_TEST: 코딩 테스트 페이지
 * - DASHBOARD: 인증 후 접근, /dashboard/auth 하위에 Login, Sign Up, Recover, Confirm
 * - 동적 라우트: Task view (/schedule/task/:id), 가능 시 Board/Customer 상세
 */

export const AppUrls = {
  /** 메인 */
  HOME: "/",

  /** 웹 (공개 페이지) */
  WEB: {
    HOME: "/",
    ACCORDION: "/accordion",
    HAMBURGER: "/hamburger",
    HISTORY: "/history",
    HISTORY2: "/history2",
    PARALLAX_CARD: "/parallax-card",
  },

  /** 코딩 테스트 */
  CODING_TEST: {
    TEST01: "/coding-test/test01",
    TEST01_REFACTORING: "/coding-test/test01-refectoring",
  },

  /** 대시보드 */
  DASHBOARD: {
    ROOT: "/dashboard",
    /** 인증 (dashboard 전용) */
    AUTH: {
      LOGIN: "/dashboard/auth/login",
      SIGN_UP: "/dashboard/auth/signup",
      RECOVER: "/dashboard/auth/recover",
      CONFIRM: "/dashboard/auth/confirm",
    },
    /** 인보이스 */
    INVOICES: "/dashboard/invoices",
    CREATE_INVOICE: "/dashboard/invoices/create",
    /** 스케줄 */
    SCHEDULE: "/dashboard/schedule",
    SCHEDULE_TIMELINE: "/dashboard/schedule/timeline",
    /** 동적: Task view - /dashboard/schedule/task/:id */
    SCHEDULE_TASK: (id: string) => `/dashboard/schedule/task/${id}`,
    /** 보드 */
    BOARDS: "/dashboard/boards",
    /** 고객 */
    CUSTOMERS: "/dashboard/customers",
    ADD_CUSTOMER: "/dashboard/customers/add",
    /** 제품 */
    PRODUCTS: "/dashboard/products",
    ADD_PRODUCT: "/dashboard/products/add",
    /** 캘린더 */
    CALENDAR: "/dashboard/calendar",
    CALENDAR_YEAR: "/dashboard/calendar/year",
    CALENDAR_MONTH: "/dashboard/calendar/month",
    CALENDAR_DAY: "/dashboard/calendar/day",
    CREATE_EVENT: "/dashboard/calendar/events/create",
    /** 채팅 */
    CHAT: "/dashboard/chat",
    /** 분석 */
    ANALYTICS: "/dashboard/analytics",
  },
} as const;
