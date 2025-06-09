import { Link } from 'react-router-dom';

const Home = () => {
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
      description: '보스 및 속성별 추천 영웅 정리',
      emoji: '⭐'
    }
    // 앞으로 여기에 기능 추가
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          세븐나이츠 리버스 공략 도우미
        </h1>

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
    </div>
  );
};

export default Home;
