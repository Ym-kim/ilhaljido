-- rollback_security_v1: migration_security_v1 롤백
--
-- migration_security_v1.sql 적용 후 문제 발생 시 사용
-- Supabase SQL Editor에서 운영자가 직접 실행

BEGIN;

-- 1. programs RLS 해제
DROP POLICY IF EXISTS "programs_public_select" ON programs;
ALTER TABLE programs DISABLE ROW LEVEL SECURITY;

-- 2. ai_recommendations RLS 해제
ALTER TABLE ai_recommendations DISABLE ROW LEVEL SECURITY;

-- 3. applications 정책 제거 및 RLS 해제
DROP POLICY IF EXISTS "applications_owner_select" ON applications;
ALTER TABLE applications DISABLE ROW LEVEL SECURITY;

-- 4. user_id 컬럼 및 인덱스 제거
DROP INDEX IF EXISTS applications_user_id_idx;
ALTER TABLE applications DROP COLUMN IF EXISTS user_id;

COMMIT;
