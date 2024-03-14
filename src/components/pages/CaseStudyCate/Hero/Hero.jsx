import './Hero.scss';

function CaseCateHero({...props}) {
   return (
    <section className="case-cate-hero">
        <div className="container grid">
            <div className="case-cate-hero-title-wrap">
                <div className="case-cate-hero-bread">
                    <a href="/" className="txt txt-20 txt-bold case-cate-hero-bread-link">
                        Home
                    </a>
                    <div className="txt txt-14 txt-semi case-cate-hero-bread-div">/</div>
                    <a href="/kase-studies" className="txt txt-20 txt-bold case-cate-hero-bread-link">
                        Kase studies
                    </a>
                </div>
                <h1 className="heading h0 txt-black txt-up case-cate-hero-title">
                    {props.title}
                </h1>
            </div>
            <div className="case-cate-hero-content">
                <p className="txt txt-18 txt-bold case-cate-hero-content-sub">
                    {props.client_quote}
                </p>
            </div>
        </div>
    </section>
   ) 
}

export default CaseCateHero