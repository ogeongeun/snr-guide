// src/pages/GuildOffenseDetailPage.jsx
import { useParams, useSearchParams } from 'react-router-dom';
import data from '../data/guildCounter.json';

export default function GuildOffenseDetailPage() {
  const { category, teamIndex } = useParams();
  const [searchParams] = useSearchParams();

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

  const renderHeroCard = (hero) => (
    <div
      key={`${hero.name}-${hero.image}`}
      className="flex flex-col items-center bg-white border rounded-lg p-1 shadow-sm"
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
      <div className="flex flex-wrap gap-2">
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

  // --- 공통 방어 메모 ---
  const defenseNotes = Array.isArray(entry.defenseNotes)
    ? entry.defenseNotes.filter(Boolean)
    : [];

  // --- 신규 구조: defenseVariants 선택 처리 ---
  const variants = Array.isArray(entry.defenseVariants)
    ? entry.defenseVariants
    : null;
  const variantParam = searchParams.get('variant');
  const variantIdx =
    variantParam !== null ? Number.parseInt(variantParam, 10) : null;

  // --- 레거시 카운터 ---
  const legacyCounters = Array.isArray(entry.recommendedCounters)
    ? entry.recommendedCounters
    : [];

  // 카운터 카드 (신규/레거시 공용)
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
        className="mb-6 border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
      >
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

      {/* 상대 방어팀 요약 + (선택) 스킬 순서 */}
      {Array.isArray(entry.defenseTeam) && entry.defenseTeam.length > 0 && (
        <div className="mb-6 border border-blue-200 rounded-xl p-4 bg-blue-50/40">
          <p className="text-xs font-semibold text-gray-700 mb-2">상대 방어팀 (요약)</p>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {entry.defenseTeam.map(renderHeroCard)}
          </div>

          {/* variant가 선택되어 있으면 해당 패턴의 스킬 순서 표시,
              아니면 레거시 defenseSkillOrder가 있을 때만 표시 */}
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

      {/* 공통 메모 */}
      {defenseNotes.length > 0 && (
        <div className="mb-4">
          {defenseNotes.map((n, i) => (
            <p key={i} className="text-[12px] text-red-500 italic">※ {n}</p>
          ))}
        </div>
      )}

      {/* 본문: defenseVariants 우선, 없으면 레거시 */}
      {variants && variants.length > 0 ? (
        typeof variantIdx === 'number' &&
        !Number.isNaN(variantIdx) &&
        variantIdx >= 0 &&
        variantIdx < variants.length ? (
          // 선택한 패턴만
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
          // 모든 패턴 나열
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
        // 레거시
        <>
          <h3 className="text-lg font-semibold mt-2 mb-3">추천 카운터덱</h3>
          {legacyCounters.length === 0 ? (
            <p className="text-sm text-gray-500">등록된 카운터덱이 없습니다.</p>
          ) : (
            legacyCounters.map((rc, j) => renderCounterCard(rc, j))
          )}
        </>
      )}
    </div>
  );
}
