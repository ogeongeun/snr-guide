import React from 'react';
import { Users } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const userGroups = {
    '본성': ['아도어','하이퍼울트라캡짱','렝차','시기1','겁많아요'],
    '본성~내성': ['건근본','사랑이차차차','빈빈빈','버터1230호','오리시기'],
    '내성': [ '구름이머그믄빛','purplesky','갱자아빠','함북이','풉키','이향'],
    '내성~외성': ['준석아범','홍일기','명랑한화','인생다이나믹','법원','파워달봉'],
    '외성': ['차사고낸놈','지옥신','야왕조조','호두2','NESTS','랄릴','주브벨링엄'],
    
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
