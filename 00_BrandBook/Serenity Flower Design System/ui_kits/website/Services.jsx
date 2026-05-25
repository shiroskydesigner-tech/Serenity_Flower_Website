// Services.jsx — three service cards
const SERVICES = [
  {
    num: '01',
    en: 'Installation Art',
    tc: '裝置藝術',
    body: 'Sculptural objects and spatial interventions. We strip an object of its received appearance and rebuild its geometric volume — the visual anchor of a venue.',
    palette: '#EEE5D6',
  },
  {
    num: '02',
    en: 'Wedding Design',
    tc: '婚禮佈置',
    body: 'Architectural choreography of an event space. Circulation, void, and material balance, planned with the logic of a building — not the abundance of a garden.',
    palette: '#EEE5D6',
  },
  {
    num: '03',
    en: 'Seasonal Florals',
    tc: '節慶花禮',
    body: 'Object-scale gift work. We extract a plant\u2019s purest line and silhouette, then translate that micro-life into a rigorous, restrained structure.',
    palette: '#EEE5D6',
  },
];

const Services = () => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <section className="sf-services">
      <header className="sf-services__head">
        <span className="eyebrow"><span className="rule" /> Services · 服務項目</span>
        <h2 className="sf-services__h">Three lines, one architectural language.</h2>
        <p className="sf-services__tc">三項服務，同一套建築語彙。</p>
      </header>
      <div className="sf-services__grid">
        {SERVICES.map((s, i) => (
          <article
            key={s.num}
            className={`sf-svc ${hovered === i ? 'is-hovered' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="sf-svc__plate" style={{ background: s.palette }}>
              <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="#3E2D21" strokeLinecap="round" strokeLinejoin="round">
                  {/* center petal — tulip cup, varied slightly per card */}
                  <path d={`M100 ${116 + i * 2} C 84 96, 84 60, 100 ${42 + i * 2} C 116 60, 116 96, 100 ${116 + i * 2} Z`} strokeWidth="1.75"/>
                  {i !== 2 && (
                    <>
                      <path d="M100 116 C 78 104, 64 80, 74 58 C 90 76, 100 96, 100 116 Z" strokeWidth="1.25" opacity="0.9"/>
                      <path d="M100 116 C 122 104, 136 80, 126 58 C 110 76, 100 96, 100 116 Z" strokeWidth="1.25" opacity="0.9"/>
                    </>
                  )}
                  <circle cx="100" cy="116" r="2.5" fill="#3E2D21" stroke="none"/>
                  <line x1="100" y1="116" x2="100" y2={166 - i * 4} strokeWidth="2" strokeLinecap="square"/>
                  <path d={`M100 ${136 - i * 2} C 78 ${134 - i * 2}, 64 ${148 - i * 2}, 60 ${168 - i * 4} C 80 ${162 - i * 4}, 94 ${152 - i * 4}, 100 ${142 - i * 2}`} strokeWidth="1.5"/>
                </g>
              </svg>
            </div>
            <div className="sf-svc__body">
              <div className="sf-svc__num">{s.num}</div>
              <h3 className="sf-svc__en">{s.en}</h3>
              <div className="sf-svc__tc">{s.tc}</div>
              <div className="sf-svc__rule" />
              <p className="sf-svc__desc">{s.body}</p>
              <a href="#" className="sf-svc__more">Read the brief <span aria-hidden="true">→</span></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

window.Services = Services;
