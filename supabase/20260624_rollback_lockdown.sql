-- ROLLBACK B: Security Lock 롤백
-- 목적: 20260624_lockdown_applications_rls.sql 취소
-- 실행 조건: RLS 활성화 후 문제 발생 시 즉시 실행 가능

BEGIN;

-- programs RLS 해제
DROP POLICY IF EXISTS "programs_public_select" ON programs;
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;

-- ai_recommendations RLS 해제
ALTER TABLE ai_recommendations DISABLE ROW LEVEL SECURITY;

-- applications RLS 해제
DROP POLICY IF EXISTS "applications_owner_select" ON applications;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;

COMMIT;
