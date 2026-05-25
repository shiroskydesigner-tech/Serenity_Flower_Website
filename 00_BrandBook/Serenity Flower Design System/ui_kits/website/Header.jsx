// Header.jsx — top navigation
const Header = () => {
  const links = [
    ['Atelier', '工作室'],
    ['Installation', '裝置藝術'],
    ['Wedding', '婚禮佈置'],
    ['Florals', '節慶花禮'],
    ['Journal', '誌記'],
    ['Contact', '預約'],
  ];
  const [active, setActive] = React.useState('Installation');

  return (
    <header className="sf-header">
      <a href="#" className="sf-header__mark" aria-label="Serenity Flower · 靜謐花間">
        <img src="../../assets/logo-primary.png" alt="Serenity Flower · Floral Designs · 靜謐花間" />
      </a>
      <nav className="sf-header__nav">
        {links.map(([en, tc]) => (
          <a
            key={en}
            href="#"
            className={`sf-navlink ${active === en ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); setActive(en); }}
          >
            <span className="sf-navlink__en">{en}</span>
            <span className="sf-navlink__tc">{tc}</span>
          </a>
        ))}
      </nav>
      <div className="sf-header__cta">
        <button className="btn btn--primary">Reserve a date</button>
      </div>
    </header>
  );
};

window.Header = Header;
