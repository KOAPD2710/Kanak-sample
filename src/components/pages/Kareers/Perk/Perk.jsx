import './Perk.scss';

function KareersPerk({...props}) {
    return (
        <section className="kareer-perk bg-dark">
            <div className="container">
                <div className="kareer-perk-title-wrap">
                    <h3 className="heading h3 txt-up txt-black kareer-perk-sub">
                        Elevating Employee Well-Being
                    </h3>
                    <h2 className="heading h0 txt-up txt-black kareer-perk-title">
                        A Dive into Our Employee <span className="txt-green">Perks Paradise</span>
                    </h2>
                </div>
                <div className="kareer-perk-main">
                    {[...Array(6)].map((item, idx) => (
                        <div className="kareer-perk-main-item" key={idx}>
                            <div className="kareer-perk-main-item-inner">
                                <div className="ic ic-60">
                                    {props.itemIc}
                                </div>
                                <h3 className="heading h5 txt-up txt-black kareer-perk-main-item-title">
                                    Health Insurance
                                </h3>
                                <p className="txt txt-20 txt-med kareer-perk-main-item-sub">
                                    A healthy work-life balance is imperative. That's why we offer flexible working arrangements and 30 days of vacation per year, ensuring ample time to rest.
                                </p>
                            </div>
                            <div className="line line-right"></div>
                            <div className="line line-bot"></div>
                        </div>
                    ))}
                    <div className="line line-top"></div>
                    <div className="line line-bot"></div>
                </div>
            </div>
        </section>
    )
}
export default KareersPerk