import "./CTA.scss"
import { useEffect } from "react"
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function KustomerCta({ ...props }) {
    useEffect(() => {
        
    }, [])

    return (
        <section className="kustomer-cta">
            <div className="kustomer-cta-bg">
                <img src={props.background.url} alt={props.background.alt} width={props.background.dimensions.width} className="img img-fill" />
            </div>
            <div className="container grid">
                <div className="kustomer-cta-main bg-light">
                    <div className="kustomer-cta-main-head">
                        <h2 className="heading h1 txt-up txt-black kustomer-cta-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="kustomer-cta-main-tail">
                        <div className="line"></div>
                        <a href="/contact" className="btn btn-lg btn-wide kustomer-cta-main-tail-btn" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-18 txt-med txt-up" data-cursor-txtlink-child>
                                {props.btn}
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
