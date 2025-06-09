import data from '../data/essential-heroes.json';

const EssentialHeroesPage = () => {
  const { bossCounters, elementalEffects, siegeCounters } = data || {};

  const renderHeroes = (heroes) => {
    if (!Array.isArray(heroes)) return null;

    return (
      <div className="flex flex-wrap gap-4">
        {heroes.map((hero, idx) => {
          const image = typeof hero === 'string' ? `${hero}.png` : hero.image;

          return (
            <div
              key={idx}
              className="flex items-center justify-center bg-white border rounded-lg p-2 shadow-sm w-24 h-24"
            >
              <img
                src={`/images/heroes/${image}`}
                alt=""
                className="w-24 h-24 object-contain"
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderSection = (title, color, dataObj) => (
    <section className="mb-10">
      <h2 className={`text-2xl font-semibold mb-4 text-${color}-600`}>{title}</h2>
      {Object.entries(dataObj).map(([category, traits], idx) => (
        <div key={idx} className="mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-2">{category}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(traits).map(([trait, heroes], i) =>
              trait === '비고' ? (
                <li key={i} className="col-span-full text-sm italic text-gray-500">※ {heroes}</li>
              ) : (
                <li
                  key={i}
                  className={`bg-${color}-50 border border-${color}-200 rounded-lg p-3`}
                >
                  <p className={`font-semibold text-${color}-500 mb-3`}>{trait}</p>
                  {renderHeroes(heroes)}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📋 필수 육성 영웅</h1>

        {bossCounters && renderSection('🛡 보스별 필수 영웅', 'blue', bossCounters)}
        {elementalEffects && renderSection('🌈 속성별 특수효과 영웅', 'green', elementalEffects)}
        {siegeCounters && renderSection('🏰 공성전 필수 영웅', 'purple', siegeCounters)}
      </div>
    </div>
  );
};

export default EssentialHeroesPage;
