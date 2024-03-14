import "./Hero.scss";

function ResourceHero({ ...props }) {
    return (
        <section className="resource-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up resource-hero-title">
                    Resources
                </h1>
                <p className="txt txt-20 txt-black txt-up resource-hero-subtitle">
                    a one-stop destination for eco-friendly living. Explore practical tips, guides, and inspiration to help you make a positive impact on the planet.
                </p>
            </div>
        </section>
    )
}

export default ResourceHero