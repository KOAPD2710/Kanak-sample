function ResDtlRichTxt(props) {
    return (
        <div className="resource-dtl-richtxt">
            <div className="line line-ver"></div>
            <div className="txt txt-20 txt-med resource-dtl-richtxt-main">
                <div className="resource-dtl-richtxt-main-premble-img">
                    <img
                        src={props.premble.feature_image.url}
                        alt={props.premble.feature_image.alt}
                        width={props.premble.feature_image.dimensions.width}
                        className="img img-fill"/>
                </div>
                <h2 className="heading h5 resource-dtl-richtxt-main-premble-sapo">{props.premble.sapo}</h2>
                {props.richTxt}
            </div>
        </div>
    )
}

export default ResDtlRichTxt