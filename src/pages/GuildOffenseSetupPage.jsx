import React from 'react';
import { Users } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const userGroups = {
    '1군': ['OneokRock','아도어','JJJOUND','신주노입니다','빈빈빈','겁많아요','뉴비호이호','때오','렝차','이향'],
    '2군': ['차윤다','연발이','밤초','Arrow','건근본','하이퍼울트라캡짱','오리시기','버터1230호','삼각백조','나쁜남자 서동연'],
    '3군': [ '함북이','사랑이차차차','시기1','purplesky','파워달봉','법원','종아리','차사고낸놈','밀리엔']
    
    
  };

  const displayOrder = ['1군', '2군', '3군'];

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
