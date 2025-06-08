import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">세븐나이츠 리버스 공략 앱</h1>
      <Link to="/farming" className="text-blue-500 underline">
        → 쫄작 효율 비교 페이지 보기
      </Link>
    </div>
  );
};

export default Home;
