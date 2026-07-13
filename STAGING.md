# 배포 환경 & 스테이징

Wakation은 Vercel에 연결돼 있어 **브랜치를 푸시하면 자동으로 배포**됩니다.

## 환경 구성

| 환경 | 브랜치 | URL | 용도 |
|------|--------|-----|------|
| **Production** | `main` | https://www.wakation.kr | 실서비스 |
| **Staging** | `staging` | `ilhaljido-git-staging-<team>.vercel.app` (Vercel 자동 생성) | 운영 반영 전 실환경 QA |
| Preview | 임의 feature 브랜치 | 브랜치별 Preview URL | 개별 기능 미리보기 |

> `staging` 브랜치는 푸시할 때마다 **동일한 고정 URL**로 재배포됩니다(브랜치 별칭). 원하면 운영자가 Vercel 대시보드에서 `staging.wakation.kr` 커스텀 도메인을 이 브랜치에 별칭 연결할 수 있습니다(운영자 액션).

## 권장 배포 플로우 (스테이징 경유)

```
feature/* 브랜치 작업
   │  npx tsc --noEmit && npm run build  (필수)
   ▼
git checkout staging && git merge --no-ff feature/*
git push origin staging          # → staging URL에서 실환경 QA
   │  프로덕션 curl 대신 staging URL로 검증
   ▼  (이상 없으면)
git checkout main-local && git merge --no-ff feature/*
git push origin main-local:main  # → 프로덕션 배포
```

## 기존 플로우(직배포)와의 관계

- 급하지 않은 기능은 **staging에서 하루 QA 후 main**으로 올리는 것을 권장.
- 핫픽스 등 급한 건 기존처럼 `main-local:main` 직배포 가능.
- `staging`은 정기적으로 `main`과 동기화(rebase/merge)해 드리프트를 방지.

## 참고
- Vercel 프로젝트: `ilhaljido` (teamId·projectId는 memory/project-overview 참조)
- 빌드 전 항상 `npx tsc --noEmit` + `npm run build` 통과 필수(레포 규칙).
