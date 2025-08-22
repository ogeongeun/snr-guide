import { useLocation, useNavigate } from 'react-router-dom';

export default function GlobalBackButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 홈(/)에선 안 보이게 (원하면 조건 빼도 됨)
  if (pathname === '/') return null;

  return (
    <button
      onClick={() => navigate(-1)}
      // 화면 좌상단에 고정, 페이지 레이아웃에 영향 X
      className="
        fixed z-50 
        left-[max(1rem,env(safe-area-inset-left))] 
        top-[max(1rem,env(safe-area-inset-top))] 
        w-9 h-9 rounded-full 
        bg-white/90 border border-gray-300 shadow
        flex items-center justify-center
        text-blue-600 text-lg font-bold
        hover:bg-gray-100 transition
      "
      aria-label="뒤로가기"
      title="뒤로가기"
    >
      ←
    </button>
  );
}
