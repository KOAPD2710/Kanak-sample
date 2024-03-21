import "./CTA.scss"

function KustomerCta({ ...props }) {
    return (
        <section className="kustomer-cta">
            <div className="kustomer-cta-bg">
                {props.bg}
            </div>
            <div className="container grid">
                <div className="kustomer-cta-main bg-light">
                    <div className="kustomer-cta-main-head">
                        <h2 className="heading h1 txt-up txt-black kustomer-cta-title">
                            {/* {props.title} */}
                            Looking For More Than Just  Packaging?
                        </h2>
                    </div>
                    <div className="kustomer-cta-main-tail">
                        <div className="line"></div>
                        <a href="/contact" className="btn btn-lg btn-wide kustomer-cta-main-tail-btn">
                            <div className="txt txt-18 txt-med txt-up">
                                Request a quote
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="line kustomer-cta-line"></div>
            <div className="line line-bot"></div>
        </section>
    )
}

export default KustomerCta
