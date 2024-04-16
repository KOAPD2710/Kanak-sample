import './Hero.scss'

function ComplianceHero({ ...props }) {
    return (
        <section className='complian-hero'>
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up complian-hero-title">Testing, QC and Compliance</h1>
                <div className="txt txt-20 txt-med complian-hero-sub">We guarantee the reliability of our products, ensuring peace of mind for all our clients.</div>
            </div>
            <div className="complian-hero-img">
                <div className="line"></div>
                <div className="complian-hero-img-inner">
                    {props.img}
                    {/* <img src="" alt="" /> */}
                </div>
            </div>
        </section>
    )
}

export default ComplianceHero