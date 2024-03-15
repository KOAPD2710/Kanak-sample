import './Culture.scss'
function KareerCulture({...props}) {
    return (
        <section className="kareer-cult bg-light">
            <div className="line line-top"></div>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black kareer-cult-title">
                    Unveiling Our <span className="txt-green">Dynamic</span> Company Vibe
                </h2>
                <div className="kareer-cult-sub-wrap">
                    <p className="txt txt-20 txt-med kareer-cult-sub">
                        Within our intimate team, we cherish the diverse backgrounds, cultures and perspectives that each individual brings. By nurturing an environment where different ideas are encouraged and celebrated, we cultivate an atmosphere of inclusivity, where everyone can thrive and contribute their unique strengths.
                    </p>
                    <div className="kareer-cult-btn-wrap">
                        <a href="#" className="btn btn-lg">
                            <div className="txt txt-18 txt-up txt-med">
                                Views open positions
                            </div>
                        </a>
                    </div>
                </div>
                <div className="kareer-cult-main">
                    {[...Array(4)].map((item, idx) => (
                        <div className="kareer-cult-main-item bg-light" key={idx} style={
                            {'--top': `calc(14rem + 10rem * ${idx + 1})`,
                            '--pBot': `calc(10rem * ${4 - idx - 1})`,
                            '--mTop': `calc(10rem * ${idx == 0 ? 0 : 4 - idx} * -1)`}
                            }>
                            <div className="kareer-cult-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="kareer-cult-main-item-content">
                                    <div className="kareer-cult-main-item-title">
                                        <div className="kareer-cult-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black kareer-cult-main-item-title-txt">
                                            Collaborative Ecosystem
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med kareer-cult-main-item-sub">
                                        Teamwork is at the core of this culture, fostering an environment where collaboration is not just encouraged but essential. Open communication, shared goals, and mutual support are the building blocks of success.
                                    </p>
                                </div>
                                <div className="kareer-cult-main-item-img">
                                    {props.itemImg}
                                </div>
                                {idx == 3 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default KareerCulture