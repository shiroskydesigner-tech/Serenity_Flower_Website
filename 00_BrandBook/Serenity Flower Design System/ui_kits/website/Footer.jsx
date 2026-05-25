// Footer.jsx — wordmark + secondary nav + colophon
const Footer = () => (
  <footer className="sf-footer">
    <div className="sf-footer__top">
      <a href="#" className="sf-footer__mark">
        <img src="../../assets/logo-primary.png" alt="Serenity Flower · 靜謐花間" />
      </a>
      <div className="sf-footer__cols">
        <div className="sf-footer__col">
          <span className="sf-footer__heading">Studio</span>
          <a href="#">Atelier</a>
          <a href="#">Process</a>
          <a href="#">Journal</a>
          <a href="#">Press</a>
        </div>
        <div className="sf-footer__col">
          <span className="sf-footer__heading">Services</span>
          <a href="#">Installation Art</a>
          <a href="#">Wedding Design</a>
          <a href="#">Seasonal Florals</a>
        </div>
        <div className="sf-footer__col">
          <span className="sf-footer__heading">Contact</span>
          <a href="mailto:atelier@serenity-flower.tw">atelier@serenity-flower.tw</a>
          <span className="sf-footer__addr">No. 12, Lane 4, Da'an Rd. Sec. 2<br/>Da'an Dist., Taipei 106</span>
          <span className="sf-footer__addr tc">台北市大安區大安路二段 4 巷 12 號</span>
        </div>
      </div>
    </div>
    <div className="sf-footer__bottom">
      <span>© 2026 SERENITY FLOWER · 靜謐花間有限公司</span>
      <span>Atelier · Est. 2019 · Taipei</span>
      <span>Privacy &middot; Terms</span>
    </div>
  </footer>
);

window.Footer = Footer;
