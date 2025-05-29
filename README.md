# bangdori-mybatis-practice

**Bangdori 프로젝트 MyBatis 연습용 레포지토리** ✨

이 저장소는 JPA로 되어있는 Bangdori 프로젝트를 MyBatis로 작업 하며 <br/>
기본적인 MyBatis 설정부터 매퍼(XML 및 어노테이션 방식), 동적 SQL, 조인 처리 등 다양한 기능들을 테스트하고 정리합니다.

## 🛠️ 사용 기술

- Java 17
- Spring Boot 3.0.3
- MyBatis
- Gradle
- MySQL

## 📁 디렉토리 구조 예시

```code
api_mybatis/
├── src/
│ └── main/
│ ├── java/
│ │ └── bangdori/
│ │ └── api_mybatis/
│ │ ├── comm/ # 공통 유틸, 설정 등
│ │ ├── domain/ # VO/DTO 등 도메인 클래스
│ │ └── ApiMybatisApplication.java
│ └── resources/
│ ├── mapper/
│ │ ├── code/ # 코드 관련 매퍼
│ │ ├── product/ # 상품 관련 매퍼
│ │ └── user/ # 사용자 관련 매퍼
│ ├── static/ # 정적 리소스
│ ├── templates/ # 타임리프 등 템플릿 파일
│ └── application.yml # Spring Boot 설정 파일
├── test/ # 테스트 코드 디렉토리
├── .env # 환경변수 파일
├── build.gradle # Gradle 빌드 설정
├── settings.gradle
└── README.md
```
