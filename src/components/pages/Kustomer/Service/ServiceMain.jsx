function ServiceMain({ ...props }) {
    const allItem = props.listItem
    console.log(allItem);
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
                            <div className="kustomer-service-main-item-content-title">
                                {item.title}
                            </div>
                            <div className="kustomer-service-main-item-content-des">
                                {item.describe}
                            </div>
                            <a href="#" className="kustomer-service-main-item-content-link">Learn More</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServiceMain