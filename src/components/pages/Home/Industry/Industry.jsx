import './Industry.scss'

const HomeIndustry = (props) => {
    return (
        <section className="home-indus bg-dark">
            <div className="container grid">
                <div className="home-indus-title-wrap">
                    <div className="home-indus-title-stick">
                        <p className="heading h4 txt-up txt-black home-indus-label">{props.label}</p>
                        <h2 className="heading h0 txt-up txt-black home-indus-title">{props.title}</h2>
                        <div className="home-indus-cta-wrap">
                            <a href="#" className="home-indus-cta">
                                <div className="home-indus-cta-inner">{props.arrIcon}</div>
                                <div className="home-indus-cta-outer">{props.ctaTxt}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-indus-main">
                    <div className="home-indus-main-list">
                        {props.listServices}
                    </div>
                </div>
            </div>
        </section>
    );
};

HomeIndustry.propTypes = {};

export default (HomeIndustry);