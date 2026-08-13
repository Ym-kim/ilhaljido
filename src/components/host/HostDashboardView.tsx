'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Clock3, ImagePlus, Pencil, Plus, Send, Trash2, XCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useLang } from '@/context/LanguageContext'
import { ICON_STROKE } from '@/lib/icons'
import {
  LISTING_CITIES,
  listingCityLabel,
  listingPhotoUrl,
  type Host,
  type HostListing,
} from '@/lib/host/hostTypes'
import type { Lang } from '@/lib/i18n/types'

// ─────────────────────────────────────────────────────────────────────────────
// 호스트 대시보드 (P2, 2026-08-13)
// 상태 머신: 프로필 없음 → 신청(pending) → 운영자 승인(approved) → 리스팅 CRUD
// 보안: 모든 읽기/쓰기는 RLS가 본인 행으로 강제. status 자가승인은 DB 정책이 차단.
// 사진: host-listings 버킷, 경로 = {user_id}/{timestamp}-{파일명} (본인 폴더만 쓰기 가능)
// ─────────────────────────────────────────────────────────────────────────────

type L = Record<Lang, string>

const C: Record<string, L> = {
  title: { KO: '호스트 대시보드', EN: 'Host dashboard', JP: 'ホストダッシュボード' },
  applyTitle: { KO: '호스트 프로필 만들기', EN: 'Create your host profile', JP: 'ホストプロフィールを作成' },
  applyDesc: {
    KO: '프로필을 제출하면 검토 후 승인해 드립니다. 승인되면 이 화면에서 숙소를 직접 등록할 수 있어요.',
    EN: 'Submit your profile and we will review and approve it. Once approved, you can register your stays right here.',
    JP: 'プロフィールを提出すると審査のうえ承認します。承認後、この画面から宿を直接登録できます。',
  },
  displayName: { KO: '호스트 이름 (공개용)', EN: 'Host name (public)', JP: 'ホスト名（公開用）' },
  contactEmail: { KO: '연락 이메일', EN: 'Contact email', JP: '連絡用メール' },
  contactPhone: { KO: '연락처 (선택)', EN: 'Phone (optional)', JP: '電話番号（任意）' },
  airbnbProfile: { KO: '에어비앤비 프로필 또는 리스팅 URL', EN: 'Airbnb profile or listing URL', JP: 'Airbnbプロフィール/リスティングURL' },
  submitProfile: { KO: '호스트 신청하기', EN: 'Apply as a host', JP: 'ホスト申請する' },
  pendingTitle: { KO: '검토 중입니다', EN: 'Under review', JP: '審査中です' },
  pendingDesc: {
    KO: '호스트 신청이 접수됐습니다. 검토 후 이메일로 알려드릴게요. 승인되면 이 화면에서 바로 숙소를 등록할 수 있습니다.',
    EN: 'Your host application is in. We will email you after review — once approved, you can register stays right here.',
    JP: 'ホスト申請を受け付けました。審査後メールでお知らせします。承認されるとこの画面から宿を登録できます。',
  },
  suspendedTitle: { KO: '계정이 일시 중지됐습니다', EN: 'Account suspended', JP: 'アカウントが一時停止中です' },
  suspendedDesc: {
    KO: '문의는 wakation.sf@gmail.com 으로 부탁드립니다.',
    EN: 'Please contact wakation.sf@gmail.com.',
    JP: 'お問い合わせは wakation.sf@gmail.com までお願いします。',
  },
  myListings: { KO: '내 숙소', EN: 'My stays', JP: 'マイ宿泊施設' },
  newListing: { KO: '새 숙소 등록', EN: 'Register a new stay', JP: '新しい宿を登録' },
  noListings: {
    KO: '아직 등록된 숙소가 없습니다. 첫 숙소를 등록해 보세요!',
    EN: 'No stays yet — register your first one!',
    JP: 'まだ宿がありません。最初の宿を登録しましょう！',
  },
  city: { KO: '도시', EN: 'City', JP: '都市' },
  listingTitle: { KO: '숙소 이름', EN: 'Stay name', JP: '宿の名前' },
  summary: { KO: '한 줄 요약', EN: 'One-line summary', JP: '一言サマリー' },
  description: { KO: '상세 소개', EN: 'Description', JP: '詳細紹介' },
  airbnbUrl: { KO: '에어비앤비 리스팅 URL', EN: 'Airbnb listing URL', JP: 'AirbnbリスティングURL' },
  localLicense: { KO: '현지 등록·신고번호 (예: 일본 민박 신고번호)', EN: 'Local registration no. (e.g., Japan minpaku)', JP: '現地登録・届出番号（例：民泊届出番号）' },
  wifiMbps: { KO: '와이파이 속도 Mbps (실측값만, 선택)', EN: 'Wi-Fi Mbps (measured only, optional)', JP: 'Wi-Fi速度Mbps（実測値のみ・任意）' },
  workspaceDesc: { KO: '업무 환경 소개 (책상·모니터·콘센트 등)', EN: 'Workspace (desk, monitor, outlets…)', JP: 'ワークスペース（机・モニター・電源など）' },
  photos: { KO: '사진 (최대 8장, 장당 5MB)', EN: 'Photos (max 8, 5MB each)', JP: '写真（最大8枚・各5MB）' },
  addPhotos: { KO: '사진 추가', EN: 'Add photos', JP: '写真を追加' },
  uploading: { KO: '업로드 중…', EN: 'Uploading…', JP: 'アップロード中…' },
  saveDraft: { KO: '임시 저장', EN: 'Save draft', JP: '下書き保存' },
  submitReview: { KO: '검수 요청하기', EN: 'Submit for review', JP: '審査をリクエスト' },
  saving: { KO: '저장 중…', EN: 'Saving…', JP: '保存中…' },
  edit: { KO: '수정', EN: 'Edit', JP: '編集' },
  del: { KO: '삭제', EN: 'Delete', JP: '削除' },
  delConfirm: {
    KO: '이 숙소를 삭제할까요? 되돌릴 수 없습니다.',
    EN: 'Delete this stay? This cannot be undone.',
    JP: 'この宿を削除しますか？元に戻せません。',
  },
  stDraft: { KO: '작성 중', EN: 'Draft', JP: '下書き' },
  stSubmitted: { KO: '검수 대기', EN: 'In review', JP: '審査待ち' },
  stApproved: { KO: '공개 중', EN: 'Live', JP: '公開中' },
  stRejected: { KO: '보완 요청', EN: 'Needs changes', JP: '要修正' },
  rejectedNote: { KO: '운영자 메모', EN: 'Reviewer note', JP: '運営メモ' },
  viewPublic: { KO: '공개 페이지 보기', EN: 'View public page', JP: '公開ページを見る' },
  submittedNote: {
    KO: '검수 대기 중에는 내용을 수정할 수 있고, 수정하면 검수 대기 상태가 유지됩니다.',
    EN: 'You can still edit while in review — edits keep it in the review queue.',
    JP: '審査待ちの間も編集できます。編集後も審査待ちのままです。',
  },
  approvedLock: {
    KO: '공개 중인 숙소의 수정은 wakation.sf@gmail.com 으로 요청해 주세요 (공개 품질 유지를 위한 검수 절차).',
    EN: 'To edit a live stay, email wakation.sf@gmail.com (review keeps public quality).',
    JP: '公開中の宿の修正は wakation.sf@gmail.com へご依頼ください（公開品質維持のための審査）。',
  },
  honesty: {
    KO: '실제와 일치하는 정보·본인 촬영(또는 사용 허락) 사진만 올려주세요. 검증할 수 없는 과장 문구는 검수에서 조정될 수 있습니다.',
    EN: 'Please submit only accurate info and photos you took or have rights to. Unverifiable claims may be adjusted in review.',
    JP: '実際と一致する情報・ご本人撮影（または使用許諾済み）の写真のみ掲載してください。検証できない誇張表現は審査で調整されることがあります。',
  },
  err: { KO: '처리에 실패했어요. 잠시 후 다시 시도해주세요.', EN: 'Something failed — please try again shortly.', JP: '処理に失敗しました。しばらくして再度お試しください。' },
  photoErr: { KO: '사진 업로드에 실패했어요 (형식: JPG·PNG·WebP, 5MB 이하).', EN: 'Photo upload failed (JPG/PNG/WebP, up to 5MB).', JP: '写真のアップロードに失敗しました（JPG・PNG・WebP、5MB以下）。' },
  cancel: { KO: '취소', EN: 'Cancel', JP: 'キャンセル' },
}

const STATUS_STYLE: Record<HostListing['status'], { key: string; cls: string }> = {
  draft: { key: 'stDraft', cls: 'bg-gray-100 text-gray-600' },
  submitted: { key: 'stSubmitted', cls: 'bg-amber-50 text-amber-700' },
  approved: { key: 'stApproved', cls: 'bg-emerald-50 text-emerald-700' },
  rejected: { key: 'stRejected', cls: 'bg-red-50 text-red-600' },
}

const inputCls =
  'w-full min-w-0 bg-white border border-[#dbeafe] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#94a3b8] focus:outline-none focus:border-[#7dd3fc] focus:ring-2 focus:ring-sky-100 transition-all'
const labelCls = 'block text-[#475569] text-xs font-bold mb-1.5'

type ListingDraft = {
  id?: string
  city: string
  title: string
  summary: string
  description: string
  airbnb_url: string
  local_license: string
  wifi_mbps: string
  workspace_desc: string
  photos: string[]
}

const EMPTY_DRAFT: ListingDraft = {
  city: 'bali',
  title: '',
  summary: '',
  description: '',
  airbnb_url: '',
  local_license: '',
  wifi_mbps: '',
  workspace_desc: '',
  photos: [],
}

export function HostDashboardView() {
  const { lang } = useLang()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [host, setHost] = useState<Host | null>(null)
  const [listings, setListings] = useState<HostListing[]>([])
  const [error, setError] = useState('')

  // 프로필 신청 폼
  const [displayName, setDisplayName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [airbnbProfile, setAirbnbProfile] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)

  // 리스팅 폼
  const [draft, setDraft] = useState<ListingDraft | null>(null)
  const [savingListing, setSavingListing] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      // 레이아웃 서버 가드가 1차 차단 — 세션 만료 시 이중 방어
      window.location.href = '/login?redirect=/host/dashboard'
      return
    }
    setUserId(user.id)
    setUserEmail(user.email ?? '')
    setContactEmail((prev) => prev || user.email || '')

    const { data: hostRow } = await supabase.from('hosts').select('*').maybeSingle()
    setHost((hostRow as Host | null) ?? null)

    if (hostRow) {
      const { data: rows } = await supabase
        .from('host_listings')
        .select('*')
        .order('created_at', { ascending: false })
      setListings((rows as HostListing[]) ?? [])
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- supabase 클라이언트는 참조 안정 취급(기존 패턴)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount 1회 본인 데이터 로드(admin/page.tsx와 동일 가드 패턴)
    load()
  }, [load])

  async function submitProfile(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSavingProfile(true)
    const { error: err } = await supabase.from('hosts').insert({
      user_id: userId,
      display_name: displayName.slice(0, 80),
      contact_email: contactEmail.slice(0, 200),
      contact_phone: contactPhone.slice(0, 40) || null,
      airbnb_profile_url: airbnbProfile.slice(0, 500) || null,
      status: 'pending',
    })
    setSavingProfile(false)
    if (err) {
      setError(C.err[lang])
      return
    }
    await load()
  }

  async function uploadPhotos(files: FileList) {
    if (!draft || !userId) return
    setError('')
    setUploadingPhotos(true)
    const added: string[] = []
    for (const file of Array.from(files).slice(0, 8 - draft.photos.length)) {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').slice(-60)
      const path = `${userId}/${Date.now()}-${safeName}`
      const { error: err } = await supabase.storage.from('host-listings').upload(path, file)
      if (err) {
        setError(C.photoErr[lang])
        break
      }
      added.push(path)
    }
    setUploadingPhotos(false)
    if (added.length) setDraft((d) => (d ? { ...d, photos: [...d.photos, ...added] } : d))
  }

  async function saveListing(status: 'draft' | 'submitted') {
    if (!draft || !host) return
    setError('')
    setSavingListing(true)
    const payload = {
      city: draft.city,
      title: draft.title.slice(0, 120),
      summary: draft.summary.slice(0, 200) || null,
      description: draft.description.slice(0, 4000) || null,
      airbnb_url: draft.airbnb_url.slice(0, 500),
      local_license: draft.local_license.slice(0, 120) || null,
      wifi_mbps: draft.wifi_mbps ? Number(draft.wifi_mbps) : null,
      workspace_desc: draft.workspace_desc.slice(0, 1000) || null,
      photos: draft.photos,
      status,
    }
    const q = draft.id
      ? supabase.from('host_listings').update(payload).eq('id', draft.id)
      : supabase.from('host_listings').insert({ ...payload, host_id: host.id })
    const { error: err } = await q
    setSavingListing(false)
    if (err) {
      setError(C.err[lang])
      return
    }
    setDraft(null)
    await load()
  }

  async function deleteListing(id: string) {
    if (!window.confirm(C.delConfirm[lang])) return
    const { error: err } = await supabase.from('host_listings').delete().eq('id', id)
    if (err) {
      setError(C.err[lang])
      return
    }
    await load()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#94a3b8] text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">{C.title[lang]}</h1>
        <p className="text-[#94a3b8] text-xs mt-1">{userEmail}</p>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        {/* 상태 1: 프로필 없음 → 신청 */}
        {!host && (
          <div className="mt-8 bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8">
            <h2 className="text-lg font-black text-gray-900">{C.applyTitle[lang]}</h2>
            <p className="text-[#64748b] text-sm mt-1 mb-6">{C.applyDesc[lang]}</p>
            <form onSubmit={submitProfile} className="space-y-4">
              <div>
                <label htmlFor="hd-name" className={labelCls}>{C.displayName[lang]} *</label>
                <input id="hd-name" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="hd-email" className={labelCls}>{C.contactEmail[lang]} *</label>
                <input id="hd-email" required type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="hd-phone" className={labelCls}>{C.contactPhone[lang]}</label>
                <input id="hd-phone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="hd-airbnb" className={labelCls}>{C.airbnbProfile[lang]} *</label>
                <input id="hd-airbnb" required type="url" placeholder="https://www.airbnb.com/…" value={airbnbProfile} onChange={(e) => setAirbnbProfile(e.target.value)} className={inputCls} />
              </div>
              <button
                type="submit"
                disabled={savingProfile}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-mid hover:bg-brand-light disabled:opacity-60 text-white font-bold text-[0.9375rem] px-6 py-4 rounded-2xl transition-all"
              >
                <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
                {savingProfile ? C.saving[lang] : C.submitProfile[lang]}
              </button>
            </form>
          </div>
        )}

        {/* 상태 2: 검토 중 */}
        {host?.status === 'pending' && (
          <div className="mt-8 bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center">
            <Clock3 className="w-10 h-10 text-amber-500 mx-auto mb-4" strokeWidth={ICON_STROKE} />
            <p className="font-black text-gray-900 text-lg mb-1">{C.pendingTitle[lang]}</p>
            <p className="text-[#64748b] text-sm">{C.pendingDesc[lang]}</p>
          </div>
        )}

        {/* 상태 3: 중지 */}
        {host?.status === 'suspended' && (
          <div className="mt-8 bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center">
            <XCircle className="w-10 h-10 text-red-400 mx-auto mb-4" strokeWidth={ICON_STROKE} />
            <p className="font-black text-gray-900 text-lg mb-1">{C.suspendedTitle[lang]}</p>
            <p className="text-[#64748b] text-sm">{C.suspendedDesc[lang]}</p>
          </div>
        )}

        {/* 상태 4: 승인 — 리스팅 관리 */}
        {host?.status === 'approved' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">{C.myListings[lang]}</h2>
              {!draft && (
                <button
                  onClick={() => setDraft({ ...EMPTY_DRAFT })}
                  className="inline-flex items-center gap-1.5 bg-brand-mid hover:bg-brand-light text-white text-sm font-bold px-4 py-2.5 rounded-full transition-all"
                >
                  <Plus className="w-4 h-4" strokeWidth={ICON_STROKE} />
                  {C.newListing[lang]}
                </button>
              )}
            </div>

            <p className="text-[#94a3b8] text-xs leading-relaxed">{C.honesty[lang]}</p>

            {/* 리스팅 작성/수정 폼 */}
            {draft && (
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 sm:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ld-city" className={labelCls}>{C.city[lang]} *</label>
                    <select id="ld-city" value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} className={inputCls}>
                      {LISTING_CITIES.map((c) => (
                        <option key={c.id} value={c.id}>{c.label[lang]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ld-title" className={labelCls}>{C.listingTitle[lang]} *</label>
                    <input id="ld-title" required value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="ld-summary" className={labelCls}>{C.summary[lang]}</label>
                  <input id="ld-summary" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="ld-desc" className={labelCls}>{C.description[lang]}</label>
                  <textarea id="ld-desc" rows={5} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="ld-url" className={labelCls}>{C.airbnbUrl[lang]} *</label>
                  <input id="ld-url" required type="url" placeholder="https://www.airbnb.com/rooms/…" value={draft.airbnb_url} onChange={(e) => setDraft({ ...draft, airbnb_url: e.target.value })} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ld-license" className={labelCls}>{C.localLicense[lang]}</label>
                    <input id="ld-license" value={draft.local_license} onChange={(e) => setDraft({ ...draft, local_license: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="ld-wifi" className={labelCls}>{C.wifiMbps[lang]}</label>
                    <input id="ld-wifi" type="number" min={1} max={10000} value={draft.wifi_mbps} onChange={(e) => setDraft({ ...draft, wifi_mbps: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="ld-workspace" className={labelCls}>{C.workspaceDesc[lang]}</label>
                  <textarea id="ld-workspace" rows={3} value={draft.workspace_desc} onChange={(e) => setDraft({ ...draft, workspace_desc: e.target.value })} className={inputCls} />
                </div>

                {/* 사진 */}
                <div>
                  <span className={labelCls}>{C.photos[lang]}</span>
                  {draft.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {draft.photos.map((p) => (
                        <div key={p} className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element -- 외부 스토리지 미리보기 썸네일(작성 화면 전용, next/image 도메인 등록 전) */}
                          <img src={listingPhotoUrl(p)} alt="" className="w-20 h-20 object-cover rounded-lg border border-[#e2e8f0]" />
                          <button
                            type="button"
                            aria-label="remove photo"
                            onClick={() => setDraft({ ...draft, photos: draft.photos.filter((x) => x !== p) })}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900/80 text-white text-[10px] flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {draft.photos.length < 8 && (
                    <label className="inline-flex items-center gap-2 border border-dashed border-[#cbd5e1] text-[#64748b] text-sm font-bold px-4 py-2.5 rounded-xl cursor-pointer hover:border-brand-mid hover:text-brand-mid transition-all">
                      <ImagePlus className="w-4 h-4" strokeWidth={ICON_STROKE} />
                      {uploadingPhotos ? C.uploading[lang] : C.addPhotos[lang]}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="hidden"
                        disabled={uploadingPhotos}
                        onChange={(e) => e.target.files && uploadPhotos(e.target.files)}
                      />
                    </label>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => saveListing('draft')}
                    disabled={savingListing || !draft.title || !draft.airbnb_url}
                    className="inline-flex items-center gap-2 border border-[#cbd5e1] text-[#475569] disabled:opacity-50 text-sm font-bold px-5 py-3 rounded-full hover:border-brand-mid hover:text-brand-mid transition-all"
                  >
                    {C.saveDraft[lang]}
                  </button>
                  <button
                    onClick={() => saveListing('submitted')}
                    disabled={savingListing || !draft.title || !draft.airbnb_url}
                    className="inline-flex items-center gap-2 bg-brand-mid hover:bg-brand-light disabled:opacity-50 text-white text-sm font-bold px-5 py-3 rounded-full transition-all"
                  >
                    <Send className="w-4 h-4" strokeWidth={ICON_STROKE} />
                    {savingListing ? C.saving[lang] : C.submitReview[lang]}
                  </button>
                  <button
                    onClick={() => setDraft(null)}
                    className="text-[#94a3b8] text-sm font-bold px-3 py-3 hover:text-[#475569] transition-colors"
                  >
                    {C.cancel[lang]}
                  </button>
                </div>
                <p className="text-[#94a3b8] text-xs">{C.submittedNote[lang]}</p>
              </div>
            )}

            {/* 리스팅 목록 */}
            {listings.length === 0 && !draft && (
              <div className="bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-10 text-center text-[#94a3b8] text-sm">
                {C.noListings[lang]}
              </div>
            )}
            {listings.map((l) => {
              const st = STATUS_STYLE[l.status]
              return (
                <div key={l.id} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black ${st.cls}`}>{C[st.key][lang]}</span>
                    <span className="font-black text-gray-900">{l.title}</span>
                    <span className="text-[#94a3b8] text-xs">{listingCityLabel(l.city, lang)}</span>
                  </div>
                  {l.status === 'rejected' && l.admin_memo && (
                    <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
                      {C.rejectedNote[lang]}: {l.admin_memo}
                    </p>
                  )}
                  {l.status === 'approved' && (
                    <p className="mt-3 text-xs text-[#94a3b8]">{C.approvedLock[lang]}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
                    {l.status === 'approved' && l.slug && (
                      <Link href={`/stays/${l.slug}`} className="inline-flex items-center gap-1.5 text-brand-mid hover:underline">
                        <CheckCircle2 className="w-4 h-4" strokeWidth={ICON_STROKE} />
                        {C.viewPublic[lang]}
                      </Link>
                    )}
                    {l.status !== 'approved' && (
                      <button
                        onClick={() =>
                          setDraft({
                            id: l.id,
                            city: l.city,
                            title: l.title,
                            summary: l.summary ?? '',
                            description: l.description ?? '',
                            airbnb_url: l.airbnb_url,
                            local_license: l.local_license ?? '',
                            wifi_mbps: l.wifi_mbps ? String(l.wifi_mbps) : '',
                            workspace_desc: l.workspace_desc ?? '',
                            photos: l.photos ?? [],
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-[#475569] hover:text-brand-mid transition-colors"
                      >
                        <Pencil className="w-4 h-4" strokeWidth={ICON_STROKE} />
                        {C.edit[lang]}
                      </button>
                    )}
                    {(l.status === 'draft' || l.status === 'rejected') && (
                      <button
                        onClick={() => deleteListing(l.id)}
                        className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={ICON_STROKE} />
                        {C.del[lang]}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
