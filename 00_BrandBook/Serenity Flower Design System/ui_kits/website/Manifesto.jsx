// Manifesto.jsx — typographic statement of philosophy
const Manifesto = () => (
  <section className="sf-manifesto">
    <div className="sf-manifesto__rail">
      <span className="eyebrow"><span className="rule" /> Manifesto · 宣言</span>
    </div>
    <div className="sf-manifesto__body">
      <p className="sf-manifesto__lead">
        SERENITY FLOWER rejects the ornament of abundance. We work in the vocabulary of architecture — volume, skeleton, circulation, void — applied to material that is alive.
      </p>
      <p className="sf-manifesto__tc">
        我們將自然物象視為建築的延伸，專注於媒材的幾何解構與骨架重組，以內斂的大地色系為基底，嚴格執行空間中的藝術張力與克制。
      </p>
      <ul className="sf-manifesto__refusals">
        <li><span className="sf-manifesto__no">No</span><span className="sf-manifesto__what">force-fed ornament</span></li>
        <li><span className="sf-manifesto__no">No</span><span className="sf-manifesto__what">arbitrary material excess</span></li>
        <li><span className="sf-manifesto__no">No</span><span className="sf-manifesto__what">composition without negative space</span></li>
        <li><span className="sf-manifesto__no">No</span><span className="sf-manifesto__what">flowers presented as flowers</span></li>
      </ul>
    </div>
  </section>
);

window.Manifesto = Manifesto;
