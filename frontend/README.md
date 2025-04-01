# 🏡 Bangdori Frontend

Bangdori 프로젝트의 프론트엔드 저장소입니다.  
부동산 중개인을 위한 **매물 등록 및 관리 서비스** 웹 애플리케이션을 제공합니다.

## ✨ 주요 기능

-   🏢 매물 등록 및 관리
-   🔍 다양한 필터링 옵션으로 매물 검색
-   🗺️ 카카오맵 통합으로 위치 기반 매물 탐색
-   📱 반응형 디자인으로 모바일 지원

## 📌 기술 스택

-   **React** + **TypeScript** (프론트엔드 프레임워크)
-   **Create React App (CRA)** (번들러)
-   **emotion** (CSS-in-JS 스타일링)
-   **Axios** (HTTP 클라이언트)
-   **커스텀 훅** (관심사 분리 및 로직 재사용)
-   **Zustand** (상태 관리 라이브러리)
-   **React-Bootstrap** (UI 컴포넌트 라이브러리)
-   **SweetAlert2** (커스텀 알림 모달)

## 🚀 프로젝트 실행 방법

### 1. 프로젝트 클론

```sh
git clone https://gitlab.com/bangdori/frontend.git

cd frontend
```

### 2. 패키지 설치

```sh
npm install
```

### 3. 개발 서버 실행

```sh
npm start
```

### 4. 빌드 (프로덕션)

```sh
npm run build
```

## 🧰 주요 커스텀 훅

프로젝트는 관심사 분리와 로직 재사용성을 높이기 위해 커스텀 훅 패턴을 적극 활용합니다:

-   `useCommCodes`: 공통 코드 데이터를 관리하고 코드 맵핑 로직을 제공합니다.
-   `useProductData`: 제품 데이터 조회, 필터링, 검색 기능을 처리합니다.
-   `useResponsive`: 반응형 UI 구현을 위한 화면 크기 감지 및 레이아웃 조정 로직을 제공합니다.
-   `useProductActions`: 제품 선택, 수정, 복사, 삭제 등 제품 관련 액션을 처리합니다.
-   `useLoginForm`: 로그인 폼 상태와 입력 관리 로직을 제공합니다.
-   `useLoginSubmit`: 로그인 API 호출 및 응답 처리 로직을 제공합니다.
-   ....

## 🛠️ 개발 유틸리티

### 기본 구조 (snippets)

```sh
"Basic React Component": {
        "prefix": "!basicComp",
        "body": [
            "import React from 'react';",
            "",
            "// ✅ 타입 선언",
            "",
            "const ${1:ComponentName} = () => {",
            "// ✅ 상태 (State) 관리",
            "",
            "",
            "",
            "// ✅ 훅 사용 (Alert 등)",
            "",
            "",
            "",
            "// ✅ 사이드 이펙트 (useEffect 등)",
            "",
            "",
            "",
            "// ✅ 함수",
            "",
            "  return (",
            "    <div>",
            "      {/* ✅ JSX */}",
            "    </div>",
            "  );",
            "};",
            "",
            "export default ${1:ComponentName};"
        ],
        "description": "Creates a basic React functional component with TypeScript annotations and hooks."
    }
```

## 📂 프로젝트 구조

```sh
src/
├── api/                    # API 관련 파일
│   ├── Axios.ts            # Axios 인스턴스 및 HTTP 요청 래퍼
│   └── Session.ts          # 세션 관리 기능
│
├── assets/                 # 정적 자산 파일 (이미지, 폰트 등)
│
├── components/             # 재사용 가능한 UI 컴포넌트
│   ├── Elements/           # 기본 UI 요소 (버튼, 인풋 등)
│   ├── Grid/               # 그리드 컴포넌트
│   ├── KakaoMap/           # 카카오맵 관련 컴포넌트
│   └── Pages/              # 페이지 컴포넌트
│
├── constants/              # 상수 정의 파일
│
├── hooks/                  # 커스텀 React 훅
│
├── store/                  # 상태 관리 (Redux/Context 등)
│
├── types/                  # TypeScript 타입 정의
│
├── utils/                  # 유틸리티 함수
│
├── App.tsx                 # 메인 App 컴포넌트
├── index.css               # 글로벌 스타일
├── index.tsx               # 앱 엔트리 포인트
└── setProxy.ts             # 개발 프록시 설정
```
