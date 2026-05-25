// Enquiry.jsx — contact form with underline inputs
const Enquiry = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [focused, setFocused] = React.useState(null);
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  return (
    <section className="sf-enquiry">
      <div className="sf-enquiry__rail">
        <span className="eyebrow"><span className="rule" /> Enquiry · 預約</span>
        <h2 className="sf-enquiry__h">Begin with a conversation.</h2>
        <p className="sf-enquiry__lead">
          Commissions begin with a 30-minute site reading. We will respond within two working days.
        </p>
        <p className="sf-enquiry__tc">
          每一項委託皆始於 30 分鐘的場域對話。我們將於兩個工作日內回覆。
        </p>
      </div>
      <form className="sf-form" onSubmit={onSubmit}>
        {submitted ? (
          <div className="sf-form__thanks">
            <div className="sf-form__rule" />
            <h3>Thank you.</h3>
            <p>Your enquiry has been received. We will write back within two working days.</p>
          </div>
        ) : (
          <>
            <div className="sf-form__row">
              <div className={`sf-field ${focused === 'name' ? 'is-focused' : ''}`}>
                <label>Your name · 姓名</label>
                <input onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} defaultValue="" placeholder="Mei-Lin Tsai" />
              </div>
              <div className={`sf-field ${focused === 'email' ? 'is-focused' : ''}`}>
                <label>Email · 信箱</label>
                <input type="email" onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="you@studio.tw" />
              </div>
            </div>
            <div className="sf-form__row">
              <div className={`sf-field ${focused === 'date' ? 'is-focused' : ''}`}>
                <label>Event date · 日期</label>
                <input onFocus={() => setFocused('date')} onBlur={() => setFocused(null)} placeholder="07 · 10 · 2026" />
              </div>
              <div className={`sf-field ${focused === 'service' ? 'is-focused' : ''}`}>
                <label>Service · 服務</label>
                <select onFocus={() => setFocused('service')} onBlur={() => setFocused(null)} defaultValue="">
                  <option value="" disabled>Select one</option>
                  <option>Installation Art · 裝置藝術</option>
                  <option>Wedding Design · 婚禮佈置</option>
                  <option>Seasonal Florals · 節慶花禮</option>
                </select>
              </div>
            </div>
            <div className={`sf-field sf-field--full ${focused === 'notes' ? 'is-focused' : ''}`}>
              <label>The space · 場域描述</label>
              <textarea
                rows="3"
                onFocus={() => setFocused('notes')}
                onBlur={() => setFocused(null)}
                placeholder="Describe the venue, the hour the work will be seen, and any constraints."
              />
            </div>
            <div className="sf-form__actions">
              <button type="submit" className="btn btn--primary">Submit enquiry</button>
              <span className="sf-form__note">Reply within 2 working days · 兩個工作日內回覆</span>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

window.Enquiry = Enquiry;
