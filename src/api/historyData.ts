export type HistoryEvent = {
  month: string;
  text: string;
  desc?: string[];
  desc2?: string[];
};

export type HistoryYearData = {
  year: string;
  description: string;
  events: HistoryEvent[];
};

export const historyData: HistoryYearData[] = [
  {
    year: "2026",
    description: "도약중!!",
    events: [
      { month: "01", text: "무언가 이벤트" },
      { month: "03", text: "또 다른 이벤트" },
    ],
  },
  {
    year: "2025",
    description: "금융사 신한카드사에서의 운영고도화의 한해",
    events: [
      {
        month: "01월 ~ 12월",
        text: "개선운영) 신한카드 개선 고도화",
        desc: [
          "역할 : 전반적인 퍼블리싱 작업 & 개발자 소통",
          "- 신한카드 내부 CMS 업무 및 SVN 버전 관리",
          "- UX/UI 개선 및 고도화 페이지 접근성(WAI-ARIA) 준수 및 UI 개선 작업",
          "- 운영환경에서 발생하는 QA 이슈 분석 및 디버깅 후 개발자와 소통",
        ],
        desc2: [
          "성과: 금융 대기업 CMS 운영 - 잦은 수정·배포가 이루어지는 운영 환경에서 웹 접근성(WAI-ARIA) 기준을 반영한 퍼블리싱으로 금융권 접근성 QA 기준 충족 및 재작업 감소",
          "- 금융 대기업 운영 프로젝트에서 1년간 12건 이상의 UI/UX 개선 과제 수행",
          "- 퍼블리싱 관점에서 이슈를 분석하고, 프론트엔드·백엔드 개발자와 협업하여 문제 해결 방향 제시",
        ],
      },
    ],
  },
  {
    year: "2024",
    description: "바빳던 한해였지만, 성과는 있었다.",
    events: [
      {
        month: "23년 12월 ~ 24년 12월",
        text: "운영) oci, oci 홀딩스 사이트 연간 유지운영",
        desc: [
          "역할 : 전반적인 프론트엔드 유지운영",
          "- Next.js , JavaScript를 사용한 웹 개발",
          "- AWS 배포 파이프라인 기반 프론트엔드 배포 및 운영 경험",
        ],
        desc2: [
          "성과 : AWS 배포 파이프라인 운영 이해 및 검증",
          "- IntelliJ에서 커밋·푸시 후 AWS CodePipeline을 통해 배포 상태를 확인하며 운영 배포 흐름을 검증",
          "- Source → Build → Deploy 단계별 파이프라인 구조를 이해하고, 배포 실패 시 원인 파악 및 디버깅 경험 확보",
          "- AWS 기반 유지·운영 전반의 배포 프로세스를 이해하고, 인수인계 단계까지 안정적으로 마무리",
        ],
      },
      {
        month: "08월 ~ 10월",
        text: "구축) 서울바이오시스 기업사이트",
        desc: [
          "역할 : 전반적인 프론트엔드 개발",
          "- Next.js , JavaScript를 사용한 웹 개발",
          "- TawilwindCSS를 사용한 스타일링",
          "- SEO를 고려한 SSR 중심 렌더링 구조 설계 및 데이터 연동 중심 개발",
          "- Postman 기반 API 문서를 참고하여 REST API 데이터 바인딩",
        ],
      },
      {
        month: "23년 12월 ~ 24년 08월",
        text: "구축) 서울반도체 기업사이트",
        desc: [
          "역할 : 전반적인 프론트엔드 개발 주도 및 베트남 프론트엔드 인력과 협업",
          "- Next.js , JavaScript를 사용한 웹 개발",
          "- 개발 환경 세팅 및 공통 작업 가이드를 문서화",
          "- TawilwindCSS를 사용한 스타일링",
          "- SEO를 고려한 SSR 중심 렌더링 구조 설계 및 데이터 연동 중심 개발",
          "- Postman 기반 API 문서를 참고하여 REST API 데이터 바인딩",
        ],
        desc2: [
          "성과 : 외국인력 관리 및 소통, 프로젝트 리드",
          "- 구축 프로젝트를 주도하며 국내·해외 인력 협업 환경에서 개발 프로세스와 커뮤니케이션 구조를 안정화",
          "- 베트남 프론트엔드 인력과 협업하며 개발 가이드 문서화 및 커뮤니케이션 체계 정립으로 시차·업무 이해도 이슈 최소화",
        ],
      },
    ],
  },
];
