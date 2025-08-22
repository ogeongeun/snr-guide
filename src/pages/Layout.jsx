// src/components/Layout.jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 홈("/")에서는 뒤로가기 버튼 안 보이게
  const showBackButton = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">

        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-lg font-bold text-blue-600 hover:underline"
          >
            ←
          </button>
        )}

        {/* 여기에 각 페이지 컴포넌트가 들어감 */}
        <Outlet />
      </div>
    </div>
  );
}
