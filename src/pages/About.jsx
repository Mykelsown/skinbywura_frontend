import Ticker from "../components/Ticker.jsx";
import "./About.css";

const VALUES = [
  { title: "Skin-first curation", body: "We choose brands with melanin-rich skin and Nigerian weather in mind." },
  { title: "Clear information", body: "Every product page lists what it is, who it suits and how much you get, so you can decide with confidence." },
  { title: "Joy is the point", body: "Skincare should feel like self-respect, not a chore. We design the shopping experience for both." },
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
              SkinByWura is a curated skincare shop. We bring together products from brands we
              trust, so finding what suits your skin is easier.
            </p>
          </div>
          <img src="/images/our-story-alt.webp" alt="SkinByWura founder reviewing skincare products" />
        </div>
      </section>

      <Ticker words={["CURATED SKINCARE", "TRUSTED BRANDS", "BUILT FOR US"]} />

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
    </div>
  );
}
