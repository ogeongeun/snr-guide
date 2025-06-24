import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [count, setCount] = useState(0);

  
  const features = [
    {
      title: '쫄작 효율 비교',
      path: '/farming',
      description: '경험치/루비 손익 기준 효율 계산',
      emoji: '🔍'
    },
    {
      title: '필수 육성 영웅',
      path: '/essential-heroes',
      description: '레이드,공성전 및 요일별 추천 영웅 정리',
      emoji: '⭐'
    },
    {
      title: '레이드 공략',
      path: '/raid-guide',
      description: '레이드 영웅장비 및 추천 스킬순서',
      emoji: '🐉'
    },
    {
      title: '공성전 공략',
      path: '/siege',
      description: '요일별 공성전 영웅, 스킬순서',
      emoji: '🏰'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          세븐나이츠 리버스 공략 도우미
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          현재 방문자 수: {count}명
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link
              to={feature.path}
              key={index}
              className="bg-white shadow hover:shadow-lg rounded-xl p-5 transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">{feature.emoji}</div>
              <h2 className="text-lg font-semibold text-gray-800">{feature.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center text-sm text-gray-500">
        made by 건근
      </div>
      <div className="absolute bottom-2 right-4 text-xs text-gray-400">
        sj
      </div>
    </div>
  );
};

export default Home;
