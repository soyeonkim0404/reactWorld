// commons/constants/typography.ts
// Figma 채널 khib5m9e - SAAS Dashboard 디자인에서 추출한 타이포그래피 토큰

export const DashboardTypography = {
  fontFamily: {
    primary: "Nunito, sans-serif",
  },
  fontWeight: {
    regular: 400,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 15,
    lg: 16,
    xl: 18,
    "2xl": 22,
    "3xl": 24,
    "4xl": 30,
  },
  lineHeight: {
    xs: 13.64,
    sm: 16.368,
    base: 19.096,
    md: 20.46,
    lg: 21.824,
    xl: 24.552,
    "2xl": 30.008,
    "3xl": 32.736,
    "4xl": 40.92,
  },
  // 시맨틱 타이포그래피 스타일
  styles: {
    h1: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 32.736,
    },
    h2: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 24.552,
    },
    h3: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 21.824,
    },
    body: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 19.096,
    },
    bodySmall: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 16.368,
    },
    caption: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 10,
      lineHeight: 13.64,
    },
    display: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 30,
      lineHeight: 40.92,
    },
    displaySmall: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 22,
      lineHeight: 30.008,
    },
  },
} as const;
