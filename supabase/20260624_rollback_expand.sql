-- ROLLBACK A: Expand 롤백
-- 목적: 20260624_expand_applications_user_id.sql 취소
--
-- 주의: Postgres ENUM에서 추가된 값(payment_pending)을 제거하려면
--       enum 타입 재생성이 필요하므로 아래 주석을 참고하세요.
--       데이터가 없거나 payment_pending 상태 row가 없으면 아래 방식 가능.
--
-- 실행 조건: 20260624_rollback_lockdown.sql 먼저 실행 완료

BEGIN;

-- 인덱스 및 컬럼 제거
DROP INDEX IF EXISTS applications_user_id_idx;
ALTER TABLE applications DROP COLUMN IF EXISTS user_id;

-- payment_pending enum 값 제거 (ENUM인 경우만, 데이터가 없을 때만 안전)
-- Postgres는 enum 값 제거를 직접 지원하지 않음
-- 필요한 경우 아래 수동 절차를 따르세요:
--
--   1. payment_pending 상태 row 확인: SELECT id FROM applications WHERE status = 'payment_pending';
--   2. 해당 row가 없으면 아래 실행:
--      CREATE TYPE application_status_new AS ENUM ('pending','contacted','confirmed','cancelled');
--      ALTER TABLE applications ALTER COLUMN status TYPE application_status_new
--        USING status::text::application_status_new;
--      DROP TYPE application_status;
--      ALTER TYPE application_status_new RENAME TO application_status;
--
-- TEXT 컬럼인 경우: 별도 조치 불필요 (값이 없으면 그냥 사용되지 않음)

COMMIT;
