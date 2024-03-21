function KustomerValueItem({ ...props }) {
    return (
        <div className="kustomer-val-main-item bg-dark">
            <div className="kustomer-val-main-item-head">
                <div className="heading txt-up txt-black kustomer-val-main-item-num">
                    {props.idx + 1 + '.'}
                </div>
                <div className="kustomer-val-main-item-ic">
                    {props.ic}
                </div>
            </div>
            <div className="kustomer-val-main-item-body">
                <h3 className="heading h1 txt-up txt-black kustomer-val-main-item-title">
                    {props.title}
                </h3>
                <p className="txt txt-18 txt-med kustomer-val-main-item-sub">
                    {props.sub_title}
                </p>
                <a href="#" className="txt txt-18 txt-med txt-orange kustomer-val-main-item-link txt-link">
                    Learn more
                </a>
            </div>
            {props.idx != 0 && <div className="line line-left"></div>}
        </div>
    )
}
export default KustomerValueItem