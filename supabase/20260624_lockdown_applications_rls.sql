-- PHASE B: Security Lock Migration (RLS 활성화)
-- 목적: 테이블별 Row Level Security 및 정책 적용
--
-- 실행 조건 (모두 충족 후 운영자 승인):
--   1. fix/applications-security-v1-clean 코드가 production에 배포 완료
--   2. 20260624_expand_applications_user_id.sql 실행 완료
--   3. Preview에서 /apply, /admin, /mypage 회귀 테스트 통과
--   4. service_role INSERT(/api/applications) 및 admin API 정상 동작 확인
--
-- 주의: RLS 활성화 시 anon 클라이언트 직접 접근이 즉시 차단됨
--       반드시 코드가 서버 API(service_role)를 통해 접근하는지 사전 확인
--
-- 롤백: supabase/20260624_rollback_lockdown.sql

BEGIN;

-- ─────────────────────────────────────────────
-- 1. applications 테이블 RLS
-- ─────────────────────────────────────────────
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 로그인 사용자는 자신의 신청만 조회
CREATE POLICY "applications_owner_select"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- anon·authenticated 직접 INSERT 차단 (서버 API service_role만 가능)
-- service_role은 RLS를 자동 우회하므로 별도 정책 불필요

-- ─────────────────────────────────────────────
-- 2. ai_recommendations 테이블 RLS
--    신청자 직접 조회 불필요 — admin(service_role)만 접근
-- ─────────────────────────────────────────────
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
-- service_role 자동 우회 — 별도 정책 불필요

-- ─────────────────────────────────────────────
-- 3. programs 테이블 RLS
--    프로그램 목록은 공개 — anon 읽기 허용
-- ─────────────────────────────────────────────
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "programs_public_select"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (true);

COMMIT;
