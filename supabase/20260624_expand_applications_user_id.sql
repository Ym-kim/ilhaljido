-- PHASE A: Expand Migration (backwards-compatible)
-- 목적: 기존 기능을 깨지 않는 컬럼·인덱스·enum 추가
--
-- 실행 조건:
--   코드 배포 없이도 언제든지 실행 가능 (기존 INSERT/SELECT/UPDATE에 영향 없음)
--   RLS 활성화 전에 반드시 먼저 실행
--
-- 실행 방법: Supabase Dashboard → SQL Editor → 붙여넣기 → Run
-- 롤백: supabase/20260624_rollback_expand.sql

BEGIN;

-- 1. applications.user_id 컬럼 추가
--    ON DELETE SET NULL: 사용자 탈퇴 시 신청 기록 보존 (user_id만 null 처리)
ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS user_id UUID
  REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS applications_user_id_idx
  ON applications(user_id);

-- 2. payment_pending 상태 추가
--    application_status가 Postgres ENUM인 경우에만 실행
--    TEXT 컬럼인 경우 아래 구문은 에러 없이 건너뜀 (IF NOT EXISTS)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'application_status'
  ) THEN
    ALTER TYPE application_status ADD VALUE IF NOT EXISTS 'payment_pending';
  END IF;
END $$;

COMMIT;
