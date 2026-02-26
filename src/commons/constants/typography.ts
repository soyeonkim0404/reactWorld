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
    xs: 14,
    sm: 16,
    base: 19,
    md: 20,
    lg: 22,
    xl: 25,
    "2xl": 30,
    "3xl": 33,
    "4xl": 41,
  },
  // 시맨틱 타이포그래피 스타일
  styles: {
    h1: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 33,
    },
    h2: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 25,
    },
    h3: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 22,
    },
    body: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 19,
    },
    bodySmall: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 16,
    },
    caption: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 400,
      fontSize: 10,
      lineHeight: 14,
    },
    display: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 30,
      lineHeight: 41,
    },
    displaySmall: {
      fontFamily: "Nunito, sans-serif",
      fontWeight: 800,
      fontSize: 22,
      lineHeight: 30,
    },
  },
} as const;
