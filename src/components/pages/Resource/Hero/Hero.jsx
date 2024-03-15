import "./Hero.scss";

function ResourceHero(props) {
    return (
        <section className="resource-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up resource-hero-title">
                    {props.title}
                </h1>
                <p className="txt txt-20 txt-black txt-up resource-hero-subtitle">
                    {props.subTitle}
                </p>
            </div>
        </section>
    )
}

export default ResourceHero