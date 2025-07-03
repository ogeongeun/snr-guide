import { Link } from 'react-router-dom';
import data from '../data/adventure_teams.json';

const Adventure = () => {
  const stages = Object.keys(data);

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        📘 모험 덱 목록
      </h2>
      <p className="text-sm font-semibold text-center text-red-500 mb-4">
    스테이지를 클릭하세여! 팀구성 화면으로 넘어갑니다
  </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {stages.map((stage) => (
          <Link
            key={stage}
            to={`/adventure/${stage}`}
            className="bg-white hover:bg-blue-50 border border-gray-200 shadow-md hover:shadow-xl transition-all rounded-2xl p-6 flex flex-col items-center text-center"
          >

            <h3 className="text-xl font-semibold text-gray-800 mb-1">{stage}</h3>
           
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Adventure;
