import './Hero.scss';

function CaseHero({...props}) {
   return (
    <section className="case-hero">
        <div className="container grid">
            <h1 className="heading h0 txt-black txt-up case-hero-title">
                {props.title}
            </h1>
            <div className="case-hero-content">
                <p className="txt txt-18 txt-bold case-hero-content-sub">
                    {props.client_quote}
                </p>
                <div className="line"></div>
                <div className="case-hero-content-author">
                    <div className="case-hero-content-author-info">
                        <div className="case-hero-content-author-ava">
                            {props.authorAvatar}
                        </div>
                        <div className="case-hero-content-author-inner">
                            <div className="txt txt-18 txt-bold case-hero-content-author-name">
                                {props.client_name}
                            </div>
                            <div className="txt txt-14 txt-semi case-hero-content-author-job">
                                {props.client_job}
                            </div>
                        </div>
                    </div>
                    <div className="case-hero-content-author-company">
                        {props.authorCompany}
                    </div>
                </div>
            </div>
        </div>
    </section>
   ) 
}

export default CaseHero