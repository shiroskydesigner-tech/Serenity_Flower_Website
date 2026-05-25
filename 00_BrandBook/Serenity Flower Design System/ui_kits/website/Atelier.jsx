// Atelier.jsx — split-block image + body about the studio
const Atelier = () => (
  <section className="sf-atelier">
    <div className="sf-atelier__left">
      <div className="sf-atelier__plate">
        <svg viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="400" height="480" fill="#3E2D21"/>
          <g stroke="#EFD7C2" fill="none" strokeLinecap="square" opacity="0.92">
            <rect x="80" y="80" width="240" height="320" strokeWidth="1.5"/>
            <line x1="200" y1="80" x2="200" y2="400" strokeWidth="3"/>
            <line x1="80" y1="240" x2="320" y2="240" strokeWidth="1"/>
            <circle cx="200" cy="240" r="60" strokeWidth="1.25"/>
            <circle cx="200" cy="240" r="4" fill="#EFD7C2" stroke="none"/>
          </g>
        </svg>
        <span className="sf-atelier__tag">Atelier · Da'an, Taipei</span>
      </div>
    </div>
    <div className="sf-atelier__right">
      <span className="eyebrow"><span className="rule" /> The Atelier · 工作室</span>
      <h2 className="sf-atelier__h">A workshop, not a shop.</h2>
      <p className="sf-atelier__lead">
        Our atelier in Da'an receives clients by appointment. There is no retail floor and no walk-in counter. Every commission begins with a conversation about the space — its dimensions, its movement, the light at the hour the work will be seen.
      </p>
      <p className="sf-atelier__tc">
        每一件作品始於對場域的閱讀，而非對花材的選擇。我們先理解空間、動線、與光，再決定植物的角色。
      </p>
      <dl className="sf-atelier__facts">
        <div><dt>Founded</dt><dd>2019 · Taipei</dd></div>
        <div><dt>Practice</dt><dd>Studio of 4</dd></div>
        <div><dt>Hours</dt><dd>By appointment</dd></div>
        <div><dt>Languages</dt><dd>繁體中文 · English</dd></div>
      </dl>
    </div>
  </section>
);

window.Atelier = Atelier;
