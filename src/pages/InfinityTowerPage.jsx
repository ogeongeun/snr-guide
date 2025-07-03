import { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/infinity_tower_teams.json';

const InfinityTowerPage = () => {
  const grouped = groupFloorsByRange(Object.keys(data), 10); // 10층 단위로 묶기
  const [openGroup, setOpenGroup] = useState(null);

  // ⚠️ TypeScript 문법 제거 (string[], number → 제거)
  function groupFloorsByRange(floors, rangeSize) {
    const parsed = floors
      .map(f => parseInt(f.replace(/[^0-9]/g, '')))
      .filter(n => !isNaN(n))
      .sort((a, b) => a - b);

    const groups = {};
    parsed.forEach(floorNum => {
      const start = Math.floor((floorNum - 1) / rangeSize) * rangeSize + 1;
      const end = start + rangeSize - 1;
      const key = `${start}~${end}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(`${floorNum}층`);
    });

    return groups;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🗼 무한의 탑 공략</h1>
      <div className="space-y-4">
        {Object.entries(grouped).map(([range, floors]) => (
          <div key={range} className="border rounded-xl shadow-sm bg-white">
            <button
              onClick={() => setOpenGroup(openGroup === range ? null : range)}
              className="w-full text-left px-4 py-2 font-semibold text-purple-700 hover:bg-purple-50 rounded-t-xl"
            >
              {range} {openGroup === range ? '▲' : '▼'}
            </button>
            {openGroup === range && (
              <ul className="grid grid-cols-2 gap-2 p-4">
                {floors.map((floor) => (
                  <li key={floor}>
                    <Link
                      to={`/infinity-tower/${encodeURIComponent(floor)}`}
                      className="block bg-gray-100 rounded-lg text-center py-2 hover:bg-purple-100"
                    >
                      {floor}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfinityTowerPage;
