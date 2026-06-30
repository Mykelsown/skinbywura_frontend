const DEFAULT_WORDS = [
  "VITAMIN C",
  "BARE SKIN",
  "GOLDEN HOUR GLOW",
  "CURATED IN LAGOS",
  "CONFIDENCE, DELIVERED",
  "TRUSTED BRANDS ONLY",
];

export default function Ticker({ words = DEFAULT_WORDS }) {
  const loop = [...words, ...words];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {loop.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
