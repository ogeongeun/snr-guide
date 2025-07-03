import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: '공성전 공략',
      path: '/siege',
      description: '요일별 공성전 영웅, 스킬순서',
      
    },
     {
  title: '모험',
  path: '/adventure',
  description: '모험 콘텐츠용 클리어 덱',
  
},{
  title: '무한의 탑',
  path: '/infinity-tower',
  description: '층별 조건에 맞춘 공략 덱 정보',
  
},

    {
      title: '레이드 공략',
      path: '/raid-guide',
      description: '레이드 영웅장비 및 추천 스킬순서',
      
    },
    {
      title: '성장던전',
      path: '/essential-heroes',
      description: '요일별 성장던전 클리어덱',
      
    },
    {
      title: '스킬 강화 순서',
      path: '/skill-order',
      description: '영웅별 스킬 강화 우선순위 추천',
      
    },
    {
      title: '쫄작 효율 비교',
      path: '/farming',
      description: '경험치/루비 손익 기준 효율 계산',
    
    },
    
    
    
    
   

  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          세븐나이츠 리버스 공략 도우미 
          <p className="text-center text-xs text-gray-500 mb-4 italic">
            본 콘텐츠는 천우회 길드 전용이며, 무단 사용 및 복제를 금합니다.
          </p>
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6 italic">made by 건근</p>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <Link
              to={feature.path}
              key={index}
              className="bg-white shadow hover:shadow-lg rounded-xl p-5 transition transform hover:-translate-y-1"
            >
              
              <h2 className="text-lg font-semibold text-gray-800">{feature.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 오른쪽 하단 마크 */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-400">
        sj
      </div>
    </div>
  );
};

export default Home;
