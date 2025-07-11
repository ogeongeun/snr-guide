import { useParams } from 'react-router-dom';

import guildDefenseSkills from '../data/guild_defense_skills.json';

const GuildDefenseDetailPage = () => {
  const { teamId } = useParams();
 

   const skillData = guildDefenseSkills.skills[teamId?.toString()];

 

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
    

        {/* 영웅 목록 */}
        

        {/* 스킬 순서 */}
        {skillData && skillData.sequence.length > 0 ? (
          <>
            <p className="text-sm text-center text-gray-700 italic mb-4">
              💡 {skillData.note}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {skillData.sequence.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img
                    src={`/images/skills/${img}`}
                    alt={`Skill ${idx + 1}`}
                    className="w-12 h-12 object-contain border rounded-md"
                  />
                  <span className="text-xs text-gray-500 mt-1">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-600">
            스킬 순서 정보가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default GuildDefenseDetailPage;
