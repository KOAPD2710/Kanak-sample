import './Hero.scss';

function KareersHero({ heroBg, ...props }) {
    return (
        <section className="kareer-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-up txt-black kareer-hero-title">
                    We are seeking some explosive factors
                </h1>
            </div>
            <div className="kareer-hero-bg bg-light">
                <div className="kareer-hero-bg-inner">
                    <div className="line line-top"></div>
                    {heroBg}
                </div>
            </div>
        </section>
    )
}
export default KareersHero