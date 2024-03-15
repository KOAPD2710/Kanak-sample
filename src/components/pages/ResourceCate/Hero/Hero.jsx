function ResourceCateHero({ ...props }) {
    return (
        <>
            <div className="txt txt-20 txt-bold resource-cate-hero-bread">
                <a href="/" className="txt-bold resource-cate-hero-bread-link">Home</a>
                <div className="txt txt-14 txt-med resource-cate-hero-bread-div">/</div>
                <a href="/resources" className="txt-bold resource-cate-hero-bread-link">Resource</a>
            </div>
            <div className="txt-bold resource-cate-hero-head">
                <h1 className="heading h0 txt-black txt-up resource-cate-hero-head-title">{props.title}</h1>
                <p className="txt txt-20 txt-black txt-up resource-cate-hero-head-quote">Comprehensive Analysis and Expert Insights into Market Trends, Dynamics, and Future Projections.</p>
            </div>
        </>
    )
}

export default ResourceCateHero