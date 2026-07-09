import 'server-only'

// ─────────────────────────────────────────────────────────────────────────────
// Gemini 클라이언트 — 무료 티어(gemini-2.5-flash) REST 직접 호출 (추가 패키지 0)
//
// 비용 전략: AI 호출을 Gemini 우선으로, 실패/키 부재 시 Anthropic 폴백.
// - json: responseMimeType으로 JSON 강제 (정규식 파싱보다 안정)
// - search: Google Search 그라운딩 (visa 최신성 — web_search 대체, 무료)
// - thinkingBudget 0: 2.5 계열은 thinking 토큰이 출력 한도를 잠식하므로 비활성
// ─────────────────────────────────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-2.5-flash'

// 콜드스타트 시 키 존재 로그 — 배포 후 runtime logs로 env 설정 검증용
console.log(`[gemini] GEMINI_API_KEY ${process.env.GEMINI_API_KEY ? 'present' : 'MISSING'}`)

export function hasGeminiKey(): boolean {
  return !!process.env.GEMINI_API_KEY
}

export async function geminiGenerate(opts: {
  system?: string
  user: string
  /** JSON 응답 강제 (search와 동시 사용 불가) */
  json?: boolean
  /** Google Search 그라운딩 (최신 정보) */
  search?: boolean
  maxOutputTokens?: number
}): Promise<string> {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY not set')

  const body: Record<string, unknown> = {
    contents: [{ role: 'user', parts: [{ text: opts.user }] }],
    generationConfig: {
      maxOutputTokens: opts.maxOutputTokens ?? 2048,
      thinkingConfig: { thinkingBudget: 0 },
      ...(opts.json ? { responseMimeType: 'application/json' } : {}),
    },
  }
  if (opts.system) body.systemInstruction = { parts: [{ text: opts.system }] }
  if (opts.search) body.tools = [{ google_search: {} }]

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Gemini API ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = await res.json()
  const text: string = (data.candidates?.[0]?.content?.parts ?? [])
    .map((p: { text?: string }) => p.text ?? '')
    .join('')
    .trim()
  if (!text) throw new Error('Gemini empty response')
  return text
}
