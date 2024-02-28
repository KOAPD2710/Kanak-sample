import './Brand.scss';
function HomeBrand({ ...props }) {
    return (
        <section className="home-brand">
            <div className="container grid">
                <div className="home-brand-canvas">
                    <div className="home-brand-canvas-inner"></div>
                </div>
                <div className="line line-ver"></div>
                <div className="home-brand-main">
                    <h2 className="heading h0 txt-up txt-black home-brand-title" dangerouslySetInnerHTML={{ __html: props.title }}/>
                    <div className="home-brand-main-list">
                        {props.list.map(({ data }, idx) => (
                            <a href="#" className="home-brand-main-item" key={idx}>
                                <div className="home-brand-main-item-head">
                                    <h3 className="heading h4 txt-up txt-black home-brand-main-item-title">
                                        {data.title[0].text}
                                    </h3>
                                    <div className="ic ic-20 home-brand-main-item-ic">
                                        {props.arrIcon}
                                    </div>
                                </div>
                                <div className="home-brand-main-item-body">
                                    <p className="txt txt-18 txt-med home-brand-main-item-sub">
                                        {data.sub_title}
                                    </p>
                                </div>
                                <div className="line"></div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="line line-bot"></div>
            </div>
        </section>
    )
}
export default HomeBrand;