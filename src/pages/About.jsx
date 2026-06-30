import Ticker from "../components/Ticker.jsx";
import "./About.css";

const VALUES = [
  { title: "Skin-first curation", body: "Every brand we stock is chosen with real Nigerian skin tones and climates in mind, not adapted from somewhere else." },
  { title: "No empty promises", body: "If a product is on our shelf, we've checked the ingredient list and the claims actually hold up." },
  { title: "Joy is the point", body: "Skincare should feel like self-respect, not a chore. We design the shopping experience for both." },
];

const TIMELINE = [
  { year: "2022", text: "Wura starts hand-picking skincare from independent Nigerian brands for friends and family." },
  { year: "2023", text: "SkinByWura launches online with four trusted brands and a waitlist of 800." },
  { year: "2024", text: "We formalise our vetting process and start requiring independent dermatology testing from every brand we onboard." },
  { year: "2026", text: "12,000+ customers later, we're still hand-selecting every product we sell." },
];

export default function About() {
  return (
    <div>
      <section className="section about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="eyebrow">Our story</span>
            <h1>We built the skincare shop we couldn't find on the shelf.</h1>
            <p>
              SkinByWura started as a one-woman search for honest skincare and grew into a
              curated marketplace, because too many "universal" skincare brands quietly weren't
              built for us. We're changing that by sourcing the ones that are.
            </p>
          </div>
          <img src="/images/our-story-alt.webp" alt="SkinByWura founder reviewing skincare products" />
        </div>
      </section>

      <Ticker words={["CURATED IN LAGOS", "TRUSTED BRANDS", "DERMATOLOGIST APPROVED", "BUILT FOR US"]} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we stand for</span>
            <h2>The non-negotiables</h2>
          </div>
          <div className="values-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How we got here</span>
            <h2>From one recommendation to your bathroom shelf</h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="timeline-item" key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
