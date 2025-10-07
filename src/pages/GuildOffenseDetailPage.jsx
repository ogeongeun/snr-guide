// src/pages/GuildOffenseDetailPage.jsx
import { useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import data from '../data/guildCounter.json';
import equipmentData from '../data/equipmentRecommend.json';
import EquipmentModal from '../components/EquipmentModal';

export default function GuildOffenseDetailPage() {
  const { category, teamIndex } = useParams();
  const [searchParams] = useSearchParams();

  // ✅ 추가: 장비 모달 상태 관리
  const [selectedHeroKey, setSelectedHeroKey] = useState(null);
  const [presetTag, setPresetTag] = useState(null);

  const decodedCategory = decodeURIComponent(category || '');
  const idx = Number.parseInt(teamIndex, 10);
  const entry = data?.categories?.[decodedCategory]?.[idx];

  if (!entry) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-red-500 text-center text-lg mt-10">
          해당 팀 데이터를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  // --- helpers ---
  const heroImg = (src) =>
    src?.startsWith('/images/') ? src : `/images/heroes/${src || ''}`;

  // ✅ 영웅 클릭 시 장비 추천 모달 열기
  const handleHeroClick = (hero) => {
    const heroKey = Object.keys(equipmentData).find(
      (key) => equipmentData[key].name === hero.name
    );
    if (heroKey) {
      setSelectedHeroKey(heroKey);
      setPresetTag(hero.preset || null);
    }
  };

  const renderHeroCard = (hero) => (
    <div
      key={`${hero.name}-${hero.image}`}
      onClick={() => handleHeroClick(hero)} // ✅ 클릭 시 모달 오픈
      className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm hover:bg-blue-50 cursor-pointer transition"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={heroImg(hero.image)}
          alt={hero.name}
          className="w-14 h-14 object-contain"
        />
      </div>
      {hero.note ? (
        <p className="text-[9px] text-red-500 italic mt-0.5 text-center">
          {hero.note}
        </p>
      ) : (
        <div className="h-[14px]" />
      )}
      <p className="text-[10px] mt-1 text-center">{hero.name}</p>
    </div>
  );

  const SkillStrip = ({ skills, size = 'w-10 h-10' }) => {
    if (!Array.isArray(skills) || skills.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((img, i) => (
          <img
            key={`${img}-${i}`}
            src={`/images/skills/${img}`}
            alt={`Skill ${i + 1}`}
            className={`${size} border rounded`}
          />
        ))}
      </div>
    );
  };

  const defenseNotes = Array.isArray(entry.defenseNotes)
    ? entry.defenseNotes.filter(Boolean)
    : [];

  const variants = Array.isArray(entry.defenseVariants)
    ? entry.defenseVariants
    : null;
  const variantParam = searchParams.get('variant');
  const variantIdx =
    variantParam !== null ? Number.parseInt(variantParam, 10) : null;

  const legacyCounters = Array.isArray(entry.recommendedCounters)
    ? entry.recommendedCounters
    : [];

  const renderCounterCard = (recommended, j) => {
    const grouped = Array.isArray(recommended.skillOrders)
      ? recommended.skillOrders
      : null;
    const legacy = Array.isArray(recommended.skillOrder)
      ? recommended.skillOrder
      : null;

    return (
      <div
        key={j}
        className="mb-6 border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
      >
        {/* ⭐ 추천도 표시 */}
        {recommended.recommendation && (
          <div className="text-center mb-2">
            <span className="text-yellow-500 text-sm font-bold">
              {'★'.repeat(Number(recommended.recommendation))}
            </span>
            <span className="text-gray-300 text-sm font-bold">
              {'☆'.repeat(3 - Number(recommended.recommendation))}
            </span>
            <p className="text-[11px] text-gray-600 mt-1">
              추천도 {recommended.recommendation}/3
            </p>
          </div>
        )}

        {/* 팀 */}
        {Array.isArray(recommended.team) && recommended.team.length > 0 && (
          <div
            className={`grid gap-2 ${
              recommended.team.length === 3 ? 'grid-cols-3' : 'grid-cols-5'
            }`}
          >
            {recommended.team.map(renderHeroCard)}
          </div>
        )}

        {/* 설명 */}
        {recommended.note && (
          <p className="text-sm text-gray-600 mt-2 italic">※ {recommended.note}</p>
        )}

        {/* 스킬 순서 */}
        {grouped && grouped.length > 0 ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm font-semibold text-gray-700">스킬 순서</p>
            {grouped.map((g, gi) => (
              <div key={`grp-${gi}`} className="border rounded-md p-2 bg-gray-50">
                {g.label && (
                  <p className="text-xs font-semibold text-red-600 mb-1">{g.label}</p>
                )}
                <SkillStrip skills={g.skills} size="w-9 h-9" />
              </div>
            ))}
          </div>
        ) : legacy ? (
          <div className="mt-3">
            <p className="text-sm font-semibold text-gray-700">스킬 순서</p>
            <SkillStrip skills={legacy} size="w-9 h-9" />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">카운터덱 상세</h1>

      <div className="mb-3 text-center">
        <span className="text-sm text-gray-500">카테고리</span>{' '}
        <span className="text-sm font-semibold">[{decodedCategory}]</span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-sm text-gray-500">라벨</span>{' '}
        <span className="text-sm font-semibold">{entry.label || '라벨없음'}</span>
      </div>

      {/* 상대 방어팀 요약 */}
      {Array.isArray(entry.defenseTeam) && entry.defenseTeam.length > 0 && (
        <div className="mb-6 border border-blue-200 rounded-xl p-4 bg-blue-50/40">
          <p className="text-xs font-semibold text-gray-700 mb-2">상대 방어팀 (요약)</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {entry.defenseTeam.map(renderHeroCard)}
          </div>

          {variants &&
          typeof variantIdx === 'number' &&
          !Number.isNaN(variantIdx) &&
          variants[variantIdx] ? (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-1">방어팀 스킬 순서</p>
              <SkillStrip skills={variants[variantIdx].defenseSkills} size="w-8 h-8" />
            </>
          ) : Array.isArray(entry.defenseSkillOrder) &&
            entry.defenseSkillOrder.length > 0 ? (
            <>
              <p className="text-xs font-semibold text-gray-700 mb-1">방어팀 스킬 순서</p>
              <SkillStrip skills={entry.defenseSkillOrder} size="w-8 h-8" />
            </>
          ) : null}
        </div>
      )}

      {/* 방어 메모 */}
      {defenseNotes.length > 0 && (
        <div className="mb-4">
          {defenseNotes.map((n, i) => (
            <p key={i} className="text-[12px] text-red-500 italic">※ {n}</p>
          ))}
        </div>
      )}

      {/* 본문 */}
      {variants && variants.length > 0 ? (
        typeof variantIdx === 'number' &&
        !Number.isNaN(variantIdx) &&
        variantIdx >= 0 &&
        variantIdx < variants.length ? (
          <div className="mb-6 border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">패턴 #{variantIdx + 1}</h3>
              <span className="text-xs text-gray-500">
                카운터 {Array.isArray(variants[variantIdx].counters) ? variants[variantIdx].counters.length : 0}개
              </span>
            </div>

            <div className="mt-4">
              {Array.isArray(variants[variantIdx].counters) &&
              variants[variantIdx].counters.length > 0 ? (
                variants[variantIdx].counters.map((rc, j) => renderCounterCard(rc, j))
              ) : (
                <p className="text-sm text-gray-500">등록된 카운터덱이 없습니다.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {variants.map((v, vIdx) => (
              <div
                key={`variant-${vIdx}`}
                className="mb-2 border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">패턴 #{vIdx + 1}</h3>
                  <span className="text-xs text-gray-500">
                    카운터 {Array.isArray(v.counters) ? v.counters.length : 0}개
                  </span>
                </div>

                <div className="mt-1">
                  <p className="text-xs font-semibold text-gray-700 mb-1">방어팀 스킬 순서</p>
                  <SkillStrip skills={v.defenseSkills} size="w-8 h-8" />
                </div>

                <div className="mt-4">
                  {Array.isArray(v.counters) && v.counters.length > 0 ? (
                    v.counters.map((rc, j) => renderCounterCard(rc, j))
                  ) : (
                    <p className="text-sm text-gray-500">등록된 카운터덱이 없습니다.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <>
          <h3 className="text-lg font-semibold mt-2 mb-3">추천 카운터덱</h3>
          {legacyCounters.length === 0 ? (
            <p className="text-sm text-gray-500">등록된 카운터덱이 없습니다.</p>
          ) : (
            legacyCounters.map((rc, j) => renderCounterCard(rc, j))
          )}
        </>
      )}

      {/* ✅ 장비 모달 */}
      {selectedHeroKey && (
        <EquipmentModal
          heroKey={selectedHeroKey}
          presetTag={presetTag}
          onClose={() => {
            setSelectedHeroKey(null);
            setPresetTag(null);
          }}
        />
      )}
    </div>
  );
}
