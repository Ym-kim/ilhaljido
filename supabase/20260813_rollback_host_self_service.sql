-- ─────────────────────────────────────────────────────────────────────────────
-- ⚠️ 호스트 셀프서비스 P2 롤백 (2026-08-13)
-- ⚠️ 주의: 이 파일은 테이블·정책을 삭제합니다. 등록된 호스트·리스팅 데이터가
--    영구 삭제되고 사진 버킷 정책이 풀립니다. 문제 발생 시에만, 내용을 확인한 뒤 실행.
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS host_photos_delete_own ON storage.objects;
DROP POLICY IF EXISTS host_photos_update_own ON storage.objects;
DROP POLICY IF EXISTS host_photos_insert_own ON storage.objects;
DROP POLICY IF EXISTS host_photos_read ON storage.objects;
-- 버킷은 내부 파일이 있으면 삭제 실패함 — 파일 정리 후 대시보드에서 삭제 권장
-- DELETE FROM storage.buckets WHERE id = 'host-listings';

DROP TABLE IF EXISTS host_listings;
DROP TABLE IF EXISTS hosts;
-- set_updated_at() 함수는 범용이라 남겨둔다 (다른 테이블이 쓸 수 있음)
