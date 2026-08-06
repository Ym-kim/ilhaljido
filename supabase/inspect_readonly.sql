-- ================================================================
-- Supabase 읽기 전용 점검 쿼리
-- Supabase SQL Editor에서 순서대로 실행 (실제 변경 없음)
-- ================================================================


-- 1. 실제 테이블 목록 확인
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;


-- 2. 각 테이블 컬럼 상세 조회
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('programs', 'applications', 'ai_recommendations')
ORDER BY table_name, ordinal_position;


-- 3. RLS 활성화 여부
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('programs', 'applications', 'ai_recommendations');


-- 4. 현재 RLS 정책 목록
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('programs', 'applications', 'ai_recommendations')
ORDER BY tablename, policyname;


-- 5. FK 및 Constraint 확인
SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  pg_get_constraintdef(c.oid) AS definition
FROM information_schema.table_constraints tc
JOIN pg_constraint c
  ON c.conname = tc.constraint_name
  AND c.conrelid = tc.table_name::regclass
WHERE tc.table_schema = 'public'
  AND tc.table_name IN ('programs', 'applications', 'ai_recommendations')
ORDER BY tc.table_name, tc.constraint_type;


-- 6. programs.id 데이터 타입 + 실제 샘플
SELECT
  id,
  pg_typeof(id) AS id_type,
  title,
  status
FROM programs
LIMIT 5;


-- 7. applications.program_id에 저장된 실제 값 유형
SELECT
  program_id,
  COUNT(*) AS count
FROM applications
GROUP BY program_id
ORDER BY count DESC
LIMIT 20;


-- 8. applications 전체 건수 + 상태별 분류
SELECT
  status,
  COUNT(*) AS count,
  MIN(created_at)::date AS earliest,
  MAX(created_at)::date AS latest
FROM applications
GROUP BY status
ORDER BY count DESC;


-- 9. applications 실제 컬럼 목록 (schema.sql에 없으므로 실제 확인 필요)
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'applications'
ORDER BY ordinal_position;


-- 10. 양양 관련 신청 데이터 확인
SELECT
  id,
  program_id,
  date_preference,
  status,
  created_at
FROM applications
WHERE program_id ILIKE '%yangyang%'
   OR program_id = 'yangyang-1'
ORDER BY created_at DESC;


-- 11. ai_recommendations 건수 확인
SELECT COUNT(*) AS count, MAX(created_at) AS latest FROM ai_recommendations;


-- 12. programs 테이블 전체 rows (UUID vs 슬러그 확인)
SELECT id, pg_typeof(id) AS id_type, title, status FROM programs;
