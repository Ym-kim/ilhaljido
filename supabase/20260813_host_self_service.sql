-- ─────────────────────────────────────────────────────────────────────────────
-- 호스트 셀프서비스 P2 (2026-08-13) — 대표가 Supabase SQL Editor에서 직접 실행
--
-- 목적: 호스트가 로그인 후 직접 숙소를 등록하고, 운영자 승인분만 공개되는 구조.
-- 설계 원칙:
--   1) 호스트는 자기 행만 읽고 쓴다 (RLS)
--   2) 호스트는 status를 draft/submitted 사이에서만 움직일 수 있다 —
--      'approved'는 어떤 경로로도 호스트가 스스로 설정할 수 없다 (WITH CHECK)
--   3) 비로그인(공개)은 approved 리스팅만 읽는다
--   4) 운영자 승인·반려는 서버 API(service role, ADMIN_EMAILS 가드)로만 —
--      기존 /api/admin/applications 패턴과 동일
--   5) 사진은 host-listings 버킷, 경로 첫 폴더 = 본인 user_id 만 쓰기 가능
--
-- 실행 후 확인 쿼리(맨 아래 주석) 결과를 세션에 알려주세요.
-- 롤백: 20260813_rollback_host_self_service.sql (⚠️ DROP POLICY 포함 — 실행 주의)
-- ─────────────────────────────────────────────────────────────────────────────

-- 1) 호스트 프로필 (auth.users 1:1)
CREATE TABLE IF NOT EXISTS hosts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  airbnb_profile_url TEXT,
  -- pending: 가입 신청(기본) / approved: 운영자 승인 → 리스팅 작성 가능 / suspended: 중지
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) 숙소 리스팅
CREATE TABLE IF NOT EXISTS host_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID REFERENCES hosts(id) ON DELETE CASCADE NOT NULL,
  -- 공개 URL 슬러그 — 승인 시점에 운영자/시스템이 부여 (호스트 입력 아님)
  slug TEXT UNIQUE,
  city TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  description TEXT,
  airbnb_url TEXT NOT NULL,
  -- 현지 법령 등록번호 (예: 일본 민박 신고번호) — 승인 심사 항목
  local_license TEXT,
  wifi_mbps INTEGER,
  workspace_desc TEXT,
  photos TEXT[] DEFAULT '{}',
  -- draft: 작성 중 / submitted: 검수 요청 / approved: 공개 / rejected: 반려(수정 후 재제출 가능)
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_host_listings_host_id ON host_listings(host_id);
CREATE INDEX IF NOT EXISTS idx_host_listings_status ON host_listings(status);

-- 3) updated_at 자동 갱신
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_hosts_updated_at ON hosts;
CREATE TRIGGER trg_hosts_updated_at BEFORE UPDATE ON hosts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_host_listings_updated_at ON host_listings;
CREATE TRIGGER trg_host_listings_updated_at BEFORE UPDATE ON host_listings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4) RLS — 호스트는 자기 것만, 공개는 승인분만
ALTER TABLE hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_listings ENABLE ROW LEVEL SECURITY;

-- hosts: 본인 행 조회
CREATE POLICY hosts_select_own ON hosts
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- hosts: 본인 가입 신청 (status는 pending으로만 생성 가능)
CREATE POLICY hosts_insert_own ON hosts
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND status = 'pending');

-- hosts: 본인 연락처 수정 — status·admin_memo는 열 권한에서 제외해 self-승인 차단
CREATE POLICY hosts_update_own ON hosts
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
REVOKE UPDATE ON hosts FROM authenticated;
GRANT UPDATE (display_name, contact_email, contact_phone, airbnb_profile_url)
  ON hosts TO authenticated;

-- host_listings: 본인 리스팅 조회 (모든 상태)
CREATE POLICY listings_select_own ON host_listings
  FOR SELECT TO authenticated
  USING (host_id IN (SELECT id FROM hosts WHERE user_id = auth.uid()));

-- host_listings: 공개 조회는 approved만 (비로그인 포함)
CREATE POLICY listings_select_public ON host_listings
  FOR SELECT TO anon
  USING (status = 'approved');

-- host_listings: 승인된 호스트만 작성, status는 draft/submitted로만
CREATE POLICY listings_insert_own ON host_listings
  FOR INSERT TO authenticated
  WITH CHECK (
    host_id IN (SELECT id FROM hosts WHERE user_id = auth.uid() AND status = 'approved')
    AND status IN ('draft', 'submitted')
  );

-- host_listings: 본인 리스팅 수정 — 승인 전(draft/submitted/rejected)만,
-- 수정 결과도 draft/submitted만 허용 (approved로 자가 전환 불가)
CREATE POLICY listings_update_own ON host_listings
  FOR UPDATE TO authenticated
  USING (
    host_id IN (SELECT id FROM hosts WHERE user_id = auth.uid())
    AND status IN ('draft', 'submitted', 'rejected')
  )
  WITH CHECK (
    host_id IN (SELECT id FROM hosts WHERE user_id = auth.uid())
    AND status IN ('draft', 'submitted')
  );
-- slug·admin_memo는 호스트가 못 만지게 열 권한 제한
REVOKE UPDATE ON host_listings FROM authenticated;
GRANT UPDATE (city, title, summary, description, airbnb_url, local_license,
              wifi_mbps, workspace_desc, photos, status)
  ON host_listings TO authenticated;

-- host_listings: 본인 draft/rejected 삭제 (승인·검수중 삭제는 운영자에게)
CREATE POLICY listings_delete_own ON host_listings
  FOR DELETE TO authenticated
  USING (
    host_id IN (SELECT id FROM hosts WHERE user_id = auth.uid())
    AND status IN ('draft', 'rejected')
  );

-- 5) 사진 버킷 — 공개 읽기, 쓰기는 본인 폴더(user_id)만, 5MB·이미지 MIME 한정
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('host-listings', 'host-listings', true, 5242880,
        ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY host_photos_read ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'host-listings');

CREATE POLICY host_photos_insert_own ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'host-listings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY host_photos_update_own ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'host-listings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY host_photos_delete_own ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'host-listings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ─────────────────────────────────────────────────────────────────────────────
-- 실행 후 확인 쿼리 (결과를 세션에 붙여넣어 주세요):
--
-- SELECT relname, relrowsecurity FROM pg_class
--  WHERE relname IN ('hosts', 'host_listings');
--   → 둘 다 relrowsecurity = true 여야 정상
--
-- SELECT polname, polcmd FROM pg_policy
--  WHERE polrelid IN ('hosts'::regclass, 'host_listings'::regclass);
--   → hosts 3건 + host_listings 5건 = 8행이어야 정상
--
-- SELECT id, public, file_size_limit FROM storage.buckets WHERE id = 'host-listings';
--   → 1행 (public=true, 5242880)
-- ─────────────────────────────────────────────────────────────────────────────
