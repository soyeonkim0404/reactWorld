# ReactWorld

React와 TypeScript를 사용한 모던 웹 애플리케이션 프로젝트입니다.

## 기술 스택

- **React** 19.2.0 - UI 라이브러리
- **TypeScript** 5.9.3 - 타입 안정성을 위한 언어
- **Vite** 7.2.4 - 빠른 빌드 도구 및 개발 서버
- **Tailwind CSS** 4.1.18 - 유틸리티 우선 CSS 프레임워크
- **ESLint** - 코드 품질 관리

## 시작하기

### 필수 요구사항

- Node.js (권장: 18.x 이상)
- pnpm (패키지 매니저)

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (기본 포트: http://localhost:5173)
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

### 린트

```bash
# 코드 린트 실행
pnpm lint
```

## 프로젝트 구조

```
reactWorld/
├── public/          # 정적 파일
├── src/
│   ├── assets/      # 이미지, 아이콘 등 리소스
│   ├── App.tsx      # 메인 앱 컴포넌트
│   ├── App.css      # 앱 스타일
│   ├── index.css    # 전역 스타일
│   └── main.tsx     # 엔트리 포인트
├── .gitignore       # Git 제외 파일 목록
├── eslint.config.js # ESLint 설정
├── index.html       # HTML 템플릿
├── package.json     # 프로젝트 의존성 및 스크립트
├── postcss.config.cjs # PostCSS 설정
├── tailwind.config.ts # Tailwind CSS 설정
├── tsconfig.json    # TypeScript 설정
└── vite.config.ts   # Vite 설정
```

## 개발 가이드

- 컴포넌트는 `src/` 디렉토리에 작성합니다
- TypeScript를 사용하여 타입 안정성을 유지합니다
- Tailwind CSS를 활용하여 스타일링합니다
- ESLint 규칙을 준수하여 코드 품질을 유지합니다

## 라이선스

이 프로젝트는 개인 학습 목적으로 사용됩니다.
