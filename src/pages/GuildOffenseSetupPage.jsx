import React from 'react';
import offenseData from '../data/guildOffense.json';
import { ShieldCheck, Target, AlertTriangle } from 'lucide-react';

const GuildOffenseSetupPage = () => {
  const { conditions } = offenseData;

  const sectionOrder = ['본성', '내성', '외성'];

  const colorMap = {
    본성: 'red-500',
    내성: 'green-500',
    외성: 'yellow-500',
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">🛡️ 길드전 공격 조건 안내</h1>
<p className="text-sm font-semibold text-red-500 mb-4">
           
          </p>
      <div className="space-y-6">
        {sectionOrder.map((key) => {
          const section = conditions[key];
          if (!section) return null;

          const borderColor = colorMap[key] || 'gray-400';

          return (
            <div
              key={key}
              className={`border-l-4 border-${borderColor} bg-white rounded-xl shadow p-5`}
            >
              <h2 className={`text-xl font-bold text-${borderColor} flex items-center mb-1`}>
                <ShieldCheck className="w-5 h-5 mr-2" />
                {key}
              </h2>

              <p className="text-sm text-gray-600 mb-4">{section.설명}</p>

              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-1 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-red-400" />
                  추천 조건
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-1">
                  {section.추천조건.map((cond, i) => (
                    <li key={i} className="pl-1">{cond}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-gray-500 italic flex items-center mt-2">
                <Target className="w-4 h-4 mr-1 text-indigo-400" />
                {section.공격목표}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuildOffenseSetupPage;
