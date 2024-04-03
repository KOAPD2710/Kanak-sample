import "./Benefit.scss"

function BenefitItem({ data }) {
    return (
        <div className="kustomer-benefit-item">
            <div className="ic kustomer-benefit-item-ic">
                <img src={data.icon.url} alt={data.icon.alt} width={data.icon.dimensions.width} className="img img-fill" />
            </div>
            <div className="kustomer-benefit-item-content">
                <h5 className="heading h5 txt-black txt-up kustomer-benefit-item-content-title">{data.title[0].text}</h5>
                <p className="txt txt-18 txt-med kustomer-benefit-item-content-des">{data.subtitle}</p>
            </div>
            <div className="line line-top"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}

function KustomerBenefit(props) {
    return (
        <section className="kustomer-benefit">
            <div className="container">
                <div className="kustomer-benefit-grid">
                    <div className="kustomer-benefit-title">
                        <h3 className="heading h4 txt-black txt-up kustomer-benefit-title-txt">
                            {props.title}
                        </h3>
                    </div>
                    {props.list.map((item, idx) => (
                        <BenefitItem key={idx} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KustomerBenefit