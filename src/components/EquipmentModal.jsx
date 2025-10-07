// src/components/EquipmentModal.jsx
import { useState } from 'react';
import equipmentData from '../data/equipmentRecommend.json';

export default function EquipmentModal({ heroKey, presetTag, onClose }) {
  // ✅ Hook은 최상단에
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const hero = equipmentData[heroKey];
  if (!hero) return null;

  // ✅ 프리셋 필터링
  const roles = hero.roles || {};
  const filteredRoles =
    presetTag && roles[presetTag]
      ? { [presetTag]: roles[presetTag] }
      : roles;

  const getCommonRing = () => hero?.roles?.ring || '';
  const parseOptions = (options) =>
    options ? options.split('/').map((opt) => opt.trim()) : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✖
        </button>

        {/* 영웅 이름 */}
        <h2 className="text-xl font-bold text-center mb-2">
          {hero.name} 장비 추천
        </h2>

        {/* 반지 표시 */}
        {getCommonRing() && (
          <div className="mb-4 text-center">
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-amber-100 border border-amber-300">
              💍 반지 추천: <strong>{getCommonRing()}</strong>
            </span>
          </div>
        )}

        {/* 역할 및 초월단계 표시 */}
        {Object.entries(filteredRoles).map(([roleName, stages]) => (
          <div key={roleName} className="mb-4">
            <h3 className="text-lg font-semibold text-center mb-2">{roleName}</h3>

            {Object.entries(stages)
              // ✅ 숫자키(0,1,2,3,4,5 등)는 제외
              .filter(([stageName]) => isNaN(Number(stageName)))
              .map(([stageName, builds]) => {
                const buildList = Array.isArray(builds)
                  ? builds
                  : Object.values(builds || {});

                return (
                  <div key={stageName}>
                    <h4 className="text-sm font-bold text-gray-700 mb-2 text-center">
                      {stageName}
                    </h4>

                    {buildList.map((build, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-4 bg-gray-50 shadow-sm mb-4"
                      >
                        {/* 세트 이름 */}
                        {build.set && (
                          <p className="font-semibold text-sm mb-2">
                            세트: {build.set}
                          </p>
                        )}

                        {/* 메인 옵션 */}
                        {build.mainOption && (
                          <div className="grid grid-cols-4 gap-2 mb-2">
                            {parseOptions(build.mainOption).map((opt, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-center border rounded-lg bg-white p-2 shadow text-xs text-center"
                              >
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 조건 */}
                        {build.subOption && (
                          <div className="border rounded-md bg-blue-50 border-blue-300 px-3 py-2 text-xs font-medium text-gray-700 mb-2">
                            📊 조건: {build.subOption}
                          </div>
                        )}

                        {/* 비고 */}
                        {build.note && (
                          <div className="border rounded-md bg-yellow-50 border-yellow-300 px-3 py-2 text-xs font-medium text-gray-700">
                            ⚡ 비고: {build.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
