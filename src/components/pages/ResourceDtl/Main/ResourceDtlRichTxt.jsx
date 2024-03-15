function ResDtlRichTxt(props) {
    return (
        <div className="resource-dtl-richtxt">
            <div className="line line-ver"></div>
            <div className="txt txt-20 txt-med resource-dtl-richtxt-main">
                {props.children}
            </div>
        </div>
    )
}

export default ResDtlRichTxt