import { useState } from 'react';
import raidData from '../data/raid_guide.json';

const RaidGuidePage = () => {
  const [selectedKey, setSelectedKey] = useState(null);
  const [activeTab, setActiveTab] = useState('heroes');
  const selectedBoss = selectedKey ? raidData[selectedKey] : null;

  const renderTabButton = (id, label) => (
    <button
      key={id}
      onClick={() => setActiveTab(id)}
      className={`px-3 py-1 rounded-full text-sm font-medium border ${
        activeTab === id
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  const renderHeroes = () => (
    <div className="flex flex-wrap gap-4">
      {Object.entries(selectedBoss.team).map(([role, members], i) => (
        <div
          key={i}
          className="bg-gray-50 p-4 rounded-xl shadow w-full md:w-[calc(50%-0.5rem)]"
        >
          <p className="font-semibold mb-2 text-gray-800">{role}</p>
          <div className="flex flex-wrap gap-2">
            {members.map((hero, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-20 text-center"
              >
                <img
                  src={`/images/heroes/${hero.image}`}
                  alt={hero.name}
                  className="w-20 h-20 object-contain border rounded"
                />
                <span className="text-xs mt-1 text-gray-700">{hero.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEquipment = () => (
    <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
      {Object.entries(selectedBoss.equipment || {}).map(([target, equip], idx) => (
        <li key={idx}>
          <strong>{target}</strong>:
          <div className="ml-2 mt-1">
            {Array.isArray(equip) && typeof equip[0] === 'object' ? (
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {equip.map((e, i) => (
                  <li key={i}>
                    <span className="font-medium">{e.세트}</span>: {e.옵션}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="ml-1">{equip.join(', ')}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  

  const renderSeian = () =>
    selectedBoss.seianUsage ? (
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {selectedBoss.seianUsage.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">세인 관련 정보 없음</p>
    );

  const renderNotes = () => (
    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
      {selectedBoss.notes.map((note, i) => (
        <li key={i}>{note}</li>
      ))}
    </ul>
  );

  const renderBossDetail = () => (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {selectedBoss.name} 공략 ⭐
      </h2>
      <p className="text-sm text-gray-600 mb-4">{selectedBoss.dropInfo}</p>

      {/* 탭 버튼 */}
      <div className="flex gap-2 flex-wrap mb-6">
        {renderTabButton('heroes', '🧙 영웅')}
        {renderTabButton('equipment', '🛠 템세팅')}
        
        {renderTabButton('seian', '⚔️ 스킬순서')}
        {renderTabButton('notes', '📌 참고 사항')}
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'heroes' && renderHeroes()}
      {activeTab === 'equipment' && renderEquipment()}
      
      {activeTab === 'seian' && renderSeian()}
      {activeTab === 'notes' && renderNotes()}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          ⚔️ 레이드 공략
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          🔍 보스를 클릭하면 아래에 공략이 표시됩니다
        </p>

        {/* 보스 선택 버튼 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {Object.entries(raidData).map(([key, boss]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key);
                setActiveTab('heroes');
              }}
              className={`text-sm px-3 py-2 rounded border bg-white hover:bg-gray-100 transition ${
                selectedKey === key ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {boss.name}
            </button>
          ))}
        </div>

        {/* 상세 공략 */}
        {selectedBoss && renderBossDetail()}
      </div>
    </div>
  );
};

export default RaidGuidePage;
