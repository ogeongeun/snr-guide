import React from 'react';
import { Users } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const userGroups = {
    '1군': ['겁많아요','렝차','아도어','Arrow','온다이','뉴비호이호','밤초','OneokRock'],
    '2군': ['건근본','이향','빈빈빈','나쁜남자 서동연','오리시기','때오','시기1','삼각백조','버터1230호','하이퍼울트라캡짱'],
    '3군': [ '파워달봉','사랑이차차차','갱자아빠','purplesky','함북이','법원','인생다이나믹','종아리','차사고낸놈','야왕조조']
    
    
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
