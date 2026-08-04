// 카카오 심볼(말풍선) — 공식 로그인 버튼 가이드: 컨테이너 #FEE500, 심볼·라벨 검정(투명도 85%)
export function KakaoIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#000000"
        fillOpacity="0.9"
        d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65l-.95 3.51c-.08.3.26.54.52.37l4.18-2.76c.52.05 1.05.08 1.59.08 5.52 0 10-3.54 10-7.9S17.52 3 12 3z"
      />
    </svg>
  )
}
