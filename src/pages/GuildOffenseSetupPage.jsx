import React from 'react';
import { Users } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const userGroups = {
    '본성': ['겁많아요', '아도어', '시기1', '하이퍼울트라캡짱', '건근분'],
    '본성~내성': ['풉키', 'Purplesky', '사랑이차차차','갱자아빠','이향'],
    '내성': [ '빈빈빈', '법원', '오리시기','홍일기','명랑한화','버터1203호'],
    '내성~외성': ['함북이','렝차','시로','지옥신','준석아범','차사고낸놈'],
    '외성': ['야왕조조','랄릴','호두2','nest','파워달봉','uhyun'],
    '방벽': ['여뚜','주브벨링엄']
  };

  const displayOrder = ['본성', '본성~내성', '내성', '내성~외성', '외성', '방벽'];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3x1 font-extrabold mb-6 text-center text-gray-800">🛡️ 길드전 사용자별 공격 배치</h1>

      <div className="space-y-6">
        {displayOrder.map((group) => (
          <div key={group} className="bg-gray-50 border rounded-lg p-4 shadow">
            <h3 className="text-md font-bold text-gray-800 flex items-center mb-2">
              <Users className="w-4 h-4 mr-1" /> {group}
            </h3>
            <ul className="text-sm text-gray-700 list-disc list-inside ml-1">
              {userGroups[group].map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuildOffenseSetupPage;
