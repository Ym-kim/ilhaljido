@AGENTS.md

# Wakation (ilhaljido) — 작업 규칙

## 0. 이 저장소의 소유자

- 소유자는 **StayForward 대표 김용민**이며, **개발자가 아니다.**
- **코드를 검수해줄 사람이 없다.** 잘못된 코드가 그대로 프로덕션(www.wakation.kr)에 올라간다.
  그러므로 "아마 될 것 같다"는 수준의 변경은 만들지 않는다.

## 1. 소통 규칙

- **설명과 보고는 한국어로 한다.**
- 전문용어는 **처음 쓸 때 한 줄로 풀어준다.**
  예: `SSR(서버에서 HTML을 미리 만들어 보내는 방식)`, `RLS(행 단위 접근제어 — DB에서 누가 어떤 줄을 볼 수 있는지 정하는 규칙)`
- 코드를 그대로 붙여넣고 "보세요"라고 하지 않는다. **무엇이 어떻게 달라지는지 말로 먼저 설명한다.**

## 2. 작업 절차

- **파일 2개 이상을 고치는 작업은 계획을 먼저 보여주고 승인받는다.** 승인 전에는 파일을 수정하지 않는다.
- **`main` / `master` / `main-local`에서 직접 작업하지 않는다.** 반드시 `feature/...`(또는 `fix/`·`chore/`) 브랜치를 만들어서 작업한다.
- **요청받지 않은 파일은 건드리지 않는다.** 지나가다 발견한 문제는 고치지 말고 **보고만** 한다. 겸사겸사 리팩터링 금지.
- **검증 없이 "완료했습니다"라고 하지 않는다.** 무엇을 실행해서 확인했는지(명령어와 결과)를 반드시 함께 쓴다.

## 3. 커밋 전 필수 확인

커밋 전에 아래 3개를 순서대로 실행하고 **전부 통과**해야 한다. 하나라도 실패하면 **커밋하지 말고 보고한다.**

```bash
npx tsc --noEmit
```

```bash
npm run lint
```

```bash
npm run build
```

- `npx tsc --noEmit`은 **파이프(`|`) 없이 단독 실행**한다. 파이프를 붙이면 종료 코드가 가려져 실패를 놓친다.
- 린트 기준선은 **0 에러 / 0 경고**다. 새 경고가 생기면 통과가 아니다.

## 4. 테스트에 대해

- **이 저장소에는 자동 테스트 프레임워크가 없다.** (jest·vitest·playwright 미설치, `npm test` 없음)
- 대신 `scripts/` 안의 **검증 스크립트 17종**이 그 역할을 한다. 예:
  `npm run audit:routes`(전체 라우트 목록), `npm run audit:menu-routes`(메뉴 링크 깨짐),
  `npm run audit:visa-freshness`(비자 정보 신선도), `npm run audit:affiliate-placement`(제휴 링크 배치)
- **테스트나 검증 스크립트를 통과시키려고 그것을 지우거나 주석 처리하지 않는다.** 실패하면 원인을 고치거나 보고한다.

## 5. 사실 확인 원칙

- **라이브러리 문법을 기억으로 단정하지 않는다.** Next.js 16은 기존과 다른 부분이 많다 → `node_modules/next/dist/docs/` 의 해당 가이드를 먼저 읽는다.
- 확인하지 못한 것은 **"확인 필요"라고 명시한다. 지어내지 않는다.**
- 마감일·지원금액·법 규정 같은 숫자와 조건은 **공식 원문을 확인한 뒤** 쓴다.

## 6. 절대 하면 안 되는 것

- **개인정보를 코드·샘플데이터·로그·커밋에 넣지 않는다.** (참가자 명단, 이메일, 전화번호, 신청서 내용)
  샘플이 필요하면 `홍길동 / test@example.com` 같은 명백한 가짜 값을 쓴다.
- **OAuth 인증 파일·시크릿을 커밋하지 않는다.** (`.env*`, `*.pem`, `*.key`, `client_secret*.json`, `secrets/`)
- **시크릿 값을 화면에 출력하지 않는다.** 필요하면 파일 경로와 변수명만 말한다.
- **제휴(affiliate) ID를 바꾸지 않는다.** 바뀌면 수수료가 끊긴다.
- **auth / admin 관련 구조를 임의로 바꾸지 않는다.**
- 공개용 이메일은 `wakation.sf@gmail.com` 하나만 쓴다.

## 7. 이 저장소의 위험 지점 (특히 조심)

| 위험 | 내용 |
|---|---|
| **한 줄이면 프로덕션 배포** | `git push origin main-local:main` → 즉시 www.wakation.kr 반영. 운영자 승인 없이 실행 금지 |
| **브랜치 이름이 헷갈림** | 로컬 `main-local`이 원격 `origin/main`(운영)을 추적한다. 로컬 `master`는 별개 계보의 **옛 브랜치**이며 운영이 아니다 |
| **DB 마이그레이션은 CLI로 돌리지 않음** | `supabase/*.sql`은 **운영자가 Supabase SQL Editor에서 직접 실행**하도록 만든 파일이다. `supabase db push/reset`·`psql`로 실행 금지 |
| **롤백 SQL은 정책을 삭제함** | `rollback_*.sql`은 `DROP POLICY`를 포함한다. 잘못 실행하면 신청자 데이터 보호가 풀린다 |
| **prisma는 미사용 잔재** | `prisma` 패키지가 설치돼 있지만 스키마 파일이 없다. `npx prisma ...` 실행 금지 |
| **대량 자동수정 스크립트** | `npm run media:verified:apply`, `scripts/apply-product-media-truth.mjs --apply` 는 소스를 한꺼번에 고친다. 승인 없이 실행 금지 |
| **외부 개발자 동시 작업** | 다른 사람이 origin/main에 머지하기도 한다. 작업 시작 전 항상 `git fetch` 후 동기 상태 확인 |

## 8. 기술 스택 (실측값)

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js **16.2.12** (App Router) |
| UI | React 19.2.4 · Tailwind CSS v4 · Radix UI · lucide-react |
| 언어 | TypeScript 5 |
| 백엔드/DB | Supabase (인증 + PostgreSQL) |
| 배포 | Vercel (`ilhaljido` 프로젝트), 브랜치 푸시 시 자동 배포 |
| 패키지매니저 | **npm** (`package-lock.json` 기준. pnpm·yarn 쓰지 않는다) |
| AI | `@anthropic-ai/sdk`, Gemini (`src/lib/gemini.ts`) |

## 9. 명령어

| 목적 | 명령 |
|---|---|
| 개발서버 | `npm run dev` (localhost:3000) |
| 타입검사 | `npx tsc --noEmit` |
| 린트 | `npm run lint` |
| 빌드 | `npm run build` |
| 프로덕션 로컬 실행 | `npm start` |
| 검증 스크립트 목록 | `package.json`의 `audit:*` / `media:*` / `social:*` 참고 |

## 10. 폴더 구조

```
src/
  app/          라우트(페이지). 폴더 이름 = URL 경로
    api/        서버 API — admin·applications·health·my·prices·visa
    en/  ja/    영어·일본어 페이지
    layout.tsx  전 페이지 공통 껍데기(Navbar·Footer)
    sitemap.ts  검색엔진용 사이트맵
  components/   화면 조각. Navbar·Footer + 영역별 폴더(home·programs·select·guide·ui 등)
  lib/          로직·데이터. affiliate(제휴)·i18n(다국어)·supabase·support(지원사업)·og(썸네일)
  data/         캠페인 정의 데이터
  context/      hooks/      types/
scripts/        검증·생성 스크립트 (.mjs)
supabase/       DB 스키마와 마이그레이션 SQL — 운영자가 직접 실행
docs/           감사 보고서·정책 문서
public/         이미지·아이콘 등 정적 파일
```

주요 설정 파일: `next.config.ts`(보안 헤더·이미지·리다이렉트), `vercel.json`(배포·크론), `eslint.config.mjs`, `STAGING.md`(배포 플로우)

## 11. 배포 흐름

```
feature 브랜치 작업
  → tsc · lint · build 전부 통과
  → 브랜치 푸시 → Preview URL에서 확인
  → 운영자에게 QA 보고
  → 【운영자 승인 후에만】 main-local로 --no-ff 머지
  → git push origin main-local:main  (= 프로덕션 배포)
  → 배포 후 확인: https://www.wakation.kr/api/health/affiliates (61항목, 실패 0이어야 정상)
```

급하지 않은 건은 `staging` 브랜치를 거쳐 하루 QA 후 올린다. 자세한 내용은 `STAGING.md`.

## 12. 보고 형식 (매번 이 5줄 순서로)

```
① 한 줄 결과   : 무엇이 어떻게 됐는지 한 문장
② 바뀐 파일   : 경로 목록 (없으면 "없음")
③ 확인 방법   : 실제로 실행한 명령과 결과 / 사람이 눈으로 확인할 URL·화면
④ 확인 필요   : 확실하지 않은 것, 추측으로 처리한 것 (없으면 "없음")
⑤ 다음 할 일  : 이어서 해야 할 것 또는 운영자가 결정해야 할 것
```
