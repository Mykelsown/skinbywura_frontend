const DEFAULT_WORDS = [
  "CURATED SKINCARE",
  "BARE SKIN",
  "GOLDEN HOUR GLOW",
  "HAND-PICKED BRANDS",
  "CONFIDENCE, DELIVERED",
  "GLOW YOUR WAY",
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
