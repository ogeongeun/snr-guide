import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuildDefensePage() {
  const navigate = useNavigate();

  const features = [
    {
      label: '방어팀 구축',
      path: '/guild-defense/build',
      bg: 'bg-indigo-600'
    },
    {
      label: '공격전 결과',
      path: '/guild-defense/result',
      bg: 'bg-gray-400',
      disabled: true // 추후 기능 예고용
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-10">길드전</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => {
              if (!feature.disabled) navigate(feature.path);
            }}
            className={`h-36 flex items-center justify-center text-xl font-semibold rounded-xl shadow-md transition transform hover:scale-105 active:scale-95 ${
              feature.disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `${feature.bg} text-white`
            }`}
          >
            {feature.label}
          </button>
        ))}
      </div>
    </div>
  );
}
