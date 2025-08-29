import React from 'react';
import { Users } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const userGroups = {
    '본성': ['겁많아요','렝차','아도어','Arrow','온다이','뉴비호이호'],
    '본성~내성(내성중 방어회수 높은애 공격)': ['밤초','건근본','이향','빈빈빈','나쁜남자 서동연','오리시기'],
    '내성': [ '시기1','파워달봉','삼각백조','사랑이차차차','버터1230호','하이퍼울트라캡짱'],
     '내성~외성(외성중 방어회수 높은애 공격)': ['구름품은달','갱자아빠','purplesky','함북이','법원','인생다이나믹'],
    '외성': ['종아리','차사고낸놈','야왕조조','홍일기'],
    
  };

  const displayOrder = ['본성', '본성~내성(내성중 방어회수 높은애 공격)', '내성',  '내성~외성(외성중 방어회수 높은애 공격)', '외성'];

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
