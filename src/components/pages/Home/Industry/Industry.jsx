import './Industry.scss'

const HomeIndustry = (props) => {
    return (
        <section class="home-indus bg-dark">
            <div class="container grid">
                <div class="home-indus-title-wrap">
                    <div class="home-indus-title-stick">
                        <p class="heading h4 txt-up txt-black home-indus-label">{props.label}</p>
                        <h2 class="heading h0 txt-up txt-black home-indus-title">{props.title}</h2>
                        <div class="home-indus-cta-wrap">
                            <a href="#" class="home-indus-cta">
                                <div class="home-indus-cta-inner">{props.arrIcon}</div>
                                <div class="home-indus-cta-outer">{props.ctaTxt}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="home-indus-main">
                    <div class="home-indus-main-list">
                        {props.listServices}
                    </div>
                </div>
            </div>
        </section>
    );
};

HomeIndustry.propTypes = {};

export default (HomeIndustry);