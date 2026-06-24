-- migration_security_v1: applications 보안 업그레이드
--
-- 실행 전 필수 조건:
--   1. fix/applications-security-v1-clean 브랜치 코드가 production에 배포 완료
--   2. Preview에서 /apply, /admin, /mypage 회귀 테스트 통과
--   3. 운영자 승인 후 Supabase SQL Editor에서 직접 실행
--
-- 이 SQL을 자동으로 실행하지 마세요.

BEGIN;

-- 1. applications 테이블에 user_id 컬럼 추가
--    ON DELETE SET NULL: 사용자 탈퇴 시 신청 기록 보존 (user_id만 null 처리)
ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS user_id uuid
  REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS applications_user_id_idx ON applications(user_id);

-- 2. RLS 활성화
--    활성화 시 기존 anon 클라이언트 직접 쿼리는 모두 차단됨
--    코드에서 서버 API(service_role)를 통해서만 접근해야 함
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 3. 정책: 로그인 사용자는 자신의 신청 내역만 조회 가능
CREATE POLICY "applications_owner_select"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. ai_recommendations RLS
--    신청자가 직접 조회할 필요 없음 — admin(service_role)만 접근
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;
-- service_role은 RLS를 자동 우회하므로 별도 정책 불필요

-- 5. programs 테이블: 공개 읽기 허용 (민감 정보 없음)
--    이미 anon SELECT가 필요하므로 RLS 활성화 시 public read 정책 추가
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "programs_public_select"
  ON programs FOR SELECT
  TO anon, authenticated
  USING (true);

COMMIT;
