import "./Benefit.scss"

function BenefitItem({ ...props }) {
    return (
        <div className="kustomer-benefit-item kustomer-benefit-item-frag">
            <div className="ic kustomer-benefit-item-frag-ic">
                {props.ic}
            </div>
            <div className="kustomer-benefit-item-frag-content">
                <h5 className="heading h5 txt-black txt-up kustomer-benefit-item-frag-content-title">Renewable Revolution</h5>
                <p className="txt txt-18 txt-med kustomer-benefit-item-frag-content-des">Back to earth, forward to future.</p>
            </div>
            <div className="line line-top"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}

function KusomterBenefit({ ...props }) {
    return (
        <section className="kustomer-benefit">
            <div className="container">
                <div className="kustomer-benefit-grid">
                    {[...Array(5)].map((item, idx) => (
                        <BenefitItem key={idx} ic={props.ic} />
                    ))}
                    <div className="kustomer-benefit-item kustomer-benefit-item-title">
                        <h3 className="heading h4 txt-black txt-up kustomer-benefit-item-title-txt">
                            Our versatile pack sizes and shelf-ready options offer an easy, CARBON-CONSCIOUS choice for single-use dinnerware.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KusomterBenefit