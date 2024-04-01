import "./Benefit.scss"

function BenefitItem({ ...props }) {
    return (
        <div className="kustomer-benefit-item kustomer-benefit-item-frag">
            <div className="ic kustomer-benefit-item-frag-ic">
                <img src={props.data.icon.url} alt={props.data.icon.alt} width={props.data.icon.dimensions.width} className="img img-fill" />
            </div>
            <div className="kustomer-benefit-item-frag-content">
                <h5 className="heading h5 txt-black txt-up kustomer-benefit-item-frag-content-title">{props.data.title[0].text}</h5>
                <p className="txt txt-18 txt-med kustomer-benefit-item-frag-content-des">{props.data.subtitle}</p>
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
                    {props.itemList.map((item, idx) => (
                        <BenefitItem key={idx} {...item} />
                    ))}
                    <div className="kustomer-benefit-item kustomer-benefit-item-title">
                        <h3 className="heading h4 txt-black txt-up kustomer-benefit-item-title-txt">
                            {props.title}
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KusomterBenefit