// Process.jsx — numbered four-step process
const STEPS = [
  ['01', 'Read the site',    '閱讀場域', 'We begin with the space. Dimensions, light, circulation. The plant material is chosen last, not first.'],
  ['02', 'Reduce to skeleton', '骨架還原', 'Every species is reduced to its line and silhouette. We work from the geometry, never from the bloom.'],
  ['03', 'Build the volume',  '量體建構', 'Material is assembled architecturally — masses, voids, and the rules between them.'],
  ['04', 'Install in situ',   '現場安裝', 'The work is fabricated on-site. Negative space is reserved before the first stem is placed.'],
];

const Process = () => (
  <section className="sf-process">
    <header className="sf-process__head">
      <span className="eyebrow"><span className="rule" /> Process · 流程</span>
      <h2 className="sf-process__h">Four movements, in order.</h2>
    </header>
    <ol className="sf-process__list">
      {STEPS.map(([num, en, tc, body]) => (
        <li key={num} className="sf-step">
          <div className="sf-step__num">{num}</div>
          <div className="sf-step__body">
            <h3 className="sf-step__en">{en}</h3>
            <div className="sf-step__tc">{tc}</div>
            <p className="sf-step__desc">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);

window.Process = Process;
