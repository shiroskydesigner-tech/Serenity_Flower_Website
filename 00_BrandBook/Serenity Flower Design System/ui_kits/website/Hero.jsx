// Hero.jsx — full-bleed display hero
const Hero = () => (
  <section className="sf-hero">
    <div className="sf-hero__grid">
      <div className="sf-hero__copy">
        <span className="eyebrow">
          <span className="rule" /> Atelier · Est. 2019 · Taipei
        </span>
        <h1 className="sf-hero__display">
          Stillness,<br/><em>restructured.</em>
        </h1>
        <div className="sf-hero__tc">靜謐，重構。</div>
        <p className="sf-hero__lead">
          We treat plant material as a structural medium — installation art, wedding architecture, and seasonal florals composed with the restraint of a building, not the abundance of a garden.
        </p>
        <div className="sf-hero__actions">
          <button className="btn btn--primary">Reserve a date</button>
          <a href="#" className="sf-hero__view">View the atelier <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <figure className="sf-hero__figure">
        <div className="sf-hero__image">
          {/* Placeholder: replace with photography. */}
          <svg viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="400" height="540" fill="#EEE5D6"/>
            <g fill="none" stroke="#3E2D21" strokeLinecap="round" strokeLinejoin="round">
              {/* center petal */}
              <path d="M200 320 C 162 268, 162 168, 200 120 C 238 168, 238 268, 200 320 Z" strokeWidth="3"/>
              {/* left petal */}
              <path d="M200 320 C 144 290, 112 220, 138 160 C 178 210, 198 260, 200 320 Z" strokeWidth="2.25" opacity="0.92"/>
              {/* right petal */}
              <path d="M200 320 C 256 290, 288 220, 262 160 C 222 210, 202 260, 200 320 Z" strokeWidth="2.25" opacity="0.92"/>
              <circle cx="200" cy="320" r="4" fill="#3E2D21" stroke="none"/>
              {/* stem */}
              <line x1="200" y1="320" x2="200" y2="448" strokeWidth="3" strokeLinecap="square"/>
              {/* leaf */}
              <path d="M200 386 C 156 380, 124 408, 116 452 C 164 444, 192 416, 200 396" strokeWidth="2.25"/>
              {/* ground rule */}
              <line x1="120" y1="456" x2="280" y2="456" strokeWidth="1.5" strokeLinecap="square" opacity="0.7"/>
            </g>
          </svg>
        </div>
        <figcaption className="sf-hero__caption">
          <span>Installation 04 · Yangmingshan</span>
          <span>—</span>
          <span>Spring 2026</span>
        </figcaption>
      </figure>
    </div>
  </section>
);

window.Hero = Hero;
