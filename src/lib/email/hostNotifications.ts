// ─────────────────────────────────────────────────────────────────────────────
// 호스트 승인·반려 알림 메일 (2026-08-18, Resend REST)
// - RESEND_API_KEY 없으면 조용히 스킵(로컬 개발·키 미설정 환경에서 검수 기능은 정상 동작)
// - 발송 실패해도 throw 하지 않는다 — 메일은 부가 기능, 검수 처리 성공이 우선
// - 디자인은 supabase/email-templates/ 3종과 동일 계열(외부 이미지 0·인라인 스타일)
// ─────────────────────────────────────────────────────────────────────────────
import 'server-only'

const FROM = 'Wakation 와케이션 <no-reply@wakation.kr>'
const SITE = 'https://www.wakation.kr'

// 호스트 입력값(이름·제목·검수 메모)이 메일 HTML에 들어가므로 이스케이프 필수
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function shell(title: string, bodyHtml: string, cta?: { label: string; href: string }) {
  return `<div style="margin:0;padding:32px 16px;background-color:#f8fafc;font-family:'Apple SD Gothic Neo','Malgun Gothic','Segoe UI',sans-serif;">
  <div style="max-width:480px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:36px 32px;">
    <p style="margin:0 0 24px;font-size:20px;font-weight:800;color:#0284c7;">Wakation</p>
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#111827;">${title}</h1>
    ${bodyHtml}
    ${cta ? `<a href="${cta.href}" style="display:inline-block;margin-top:8px;background-color:#0284c7;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:999px;">${cta.label}</a>` : ''}
    <hr style="margin:28px 0;border:none;border-top:1px solid #e2e8f0;" />
    <p style="margin:0 0 6px;font-size:12px;line-height:1.6;color:#94a3b8;">
      이 메일은 와케이션 호스트 등록·검수 진행 상황 안내를 위해 발송되었습니다. 문의: wakation.sf@gmail.com
    </p>
    <p style="margin:0;font-size:11px;line-height:1.6;color:#cbd5e1;">
      스테이포워드 | 대표 김용민 | 사업자등록번호 812-86-04005
    </p>
  </div>
</div>`
}

async function send(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[hostNotifications] RESEND_API_KEY 미설정 — 메일 발송 스킵:', subject)
    return
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [to], subject, html }),
    })
    if (!res.ok) {
      console.error('[hostNotifications] Resend 발송 실패', res.status, await res.text().catch(() => ''))
    }
  } catch (e) {
    console.error('[hostNotifications] Resend 발송 예외', e)
  }
}

export async function sendHostApprovedEmail(to: string, displayName: string) {
  const body = `<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#475569;">
    ${esc(displayName)}님, 호스트 등록이 <strong>승인</strong>되었습니다.<br />
    이제 대시보드에서 숙소 리스팅을 등록하실 수 있어요. 등록하신 리스팅은 검수 후 와케이션에 공개됩니다.
  </p>`
  await send(to, '[Wakation] 호스트 등록이 승인되었습니다', shell('호스트 승인 완료', body, { label: '리스팅 등록하러 가기', href: `${SITE}/host/dashboard` }))
}

export async function sendListingApprovedEmail(to: string, displayName: string, listingTitle: string, slug: string) {
  const url = `${SITE}/stays/${slug}`
  const body = `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
    ${esc(displayName)}님, 등록하신 리스팅 <strong>${esc(listingTitle)}</strong>이(가) 검수를 통과해 공개되었습니다.
  </p>
  <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:#64748b;">
    공개 주소: <a href="${url}" style="color:#0284c7;word-break:break-all;">${url}</a><br />
    예약·문의는 리스팅에 연결된 에어비앤비 페이지에서 진행됩니다.
  </p>`
  await send(to, '[Wakation] 리스팅이 공개되었습니다', shell('리스팅 공개 완료', body, { label: '내 리스팅 보기', href: url }))
}

export async function sendListingRejectedEmail(to: string, displayName: string, listingTitle: string, memo?: string) {
  const body = `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#475569;">
    ${esc(displayName)}님, 등록하신 리스팅 <strong>${esc(listingTitle)}</strong>은(는) 아래 사유로 이번 검수에서 보완이 필요합니다.
  </p>
  ${memo ? `<div style="margin:0 0 24px;padding:14px 16px;background-color:#fff7ed;border:1px solid #fed7aa;border-radius:12px;font-size:14px;line-height:1.7;color:#9a3412;">${esc(memo)}</div>` : ''}
  <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:#64748b;">
    대시보드에서 내용을 수정해 다시 제출하시면 재검수해 드립니다.
  </p>`
  await send(to, '[Wakation] 리스팅 보완 요청 안내', shell('리스팅 보완 요청', body, { label: '대시보드에서 수정하기', href: `${SITE}/host/dashboard` }))
}
