import { useParams } from 'react-router-dom';
import { useState } from 'react';
import trialSkills from '../data/trial_tower_skills.json';

const TrialSkillDetailPage = () => {
  const { floor, teamIndex } = useParams();

  const decodedFloor = decodeURIComponent(floor);
  const teamKey = teamIndex !== undefined ? parseInt(teamIndex).toString() : "0";

  // ✅ 해당 층의 모든 스킬 키 중 'teamKey'로 시작하는 것만 필터링 (ex: "0", "0-1")
  const floorData = trialSkills?.[decodedFloor] ?? {};
  const allTeamSkillVariants = Object.entries(floorData).filter(([key]) =>
    key === teamKey || key.startsWith(`${teamKey}-`)
  );

  // ✅ YouTube 링크는 첫 번째 스킬 버전의 videoUrl만 사용
  const videoUrl = floorData?.[teamKey]?.videoUrl;

  const [selectedKey, setSelectedKey] = useState(allTeamSkillVariants[0]?.[0] || null);

  const selectedData = floorData[selectedKey] ?? {};
  const skills = Array.isArray(selectedData)
    ? selectedData
    : Array.isArray(selectedData?.skills)
    ? selectedData.skills
    : [];

  const note = typeof selectedData === 'object' && selectedData?.note;

  if (!selectedKey || !skills || skills.length === 0) {
    return (
      <div className="p-6 text-center text-red-600">
        ⚠️ 스킬 정보를 찾을 수 없습니다.
        <br />
        층: <strong>{decodedFloor}</strong>, 팀: <strong>{teamKey}</strong>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          🔥 {decodedFloor} - 팀 {parseInt(teamKey) + 1} 스킬 순서
        </h1>

        {/* 유튜브 링크 */}
        {videoUrl && (
          <div className="text-center mb-4">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              📺 공략 영상 보기
            </a>
          </div>
        )}

        {/* 스킬 순서 선택 버튼 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {allTeamSkillVariants.map(([key, value], idx) => (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`px-3 py-1 text-sm rounded-lg border ${
                selectedKey === key
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-white text-red-500 border-red-300'
              } hover:bg-red-100`}
            >
              {value.title || `스킬 ${idx + 1}`}
            </button>
          ))}
        </div>

        {/* 설명 */}
        {note && (
          <p className="text-center text-[13px] text-dark-600 italic mb-4">{note}</p>
        )}

        {/* 스킬 이미지 출력 */}
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((img, i) => {
            const isObject = typeof img === 'object' && img !== null;
            const imageSrc = isObject ? img.image : img;
            const label = isObject ? img.label : null;

            return (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={`/images/skills/${imageSrc}`}
                  alt={`Skill ${i + 1}`}
                  title={imageSrc}
                  className="w-12 h-12 object-contain border rounded-md"
                />
                <span className="text-xs mt-1 text-gray-500">#{i + 1}</span>
                {label && (
                  <span className="text-[11px] text-red-500 italic mt-0.5">
                    {label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrialSkillDetailPage;
