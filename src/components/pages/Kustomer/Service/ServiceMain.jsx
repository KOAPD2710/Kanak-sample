function ServiceMain({ ...props }) {
    const allItem = props.listItem
    return (
        <div className="kustomer-service-main">
            <div className="line line-ver"></div>
            <div className="kustomer-service-main-inner">
                {allItem.map((item, idx) => (
                    <div className="kustomer-service-main-item" key={idx}>
                        <div className="kustomer-service-main-item-img">
                            <img src={item.image.src} alt="" className="img img-fill" />
                        </div>
                        <div className="kustomer-service-main-item-content">
                            <h3 className="heading h4 txt-black txt-up kustomer-service-main-item-content-title">
                                {item.title}
                            </h3>
                            <div className="kustomer-service-main-item-content-info">
                                <div className="txt txt-18 txt-med kustomer-service-main-item-content-des">
                                    {item.describe}
                                </div>
                                <a href="#" className="txt txt-18 txt-bold kustomer-service-main-item-content-link">Learn More</a>
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServiceMain