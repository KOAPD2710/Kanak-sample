import "./ItemDtlPopup.scss"


function GlobalPopup({ ...props }) {
    return (
        <div className="popup">
            <div className="container grid">
                <div className="popup-itemdtl">
                    <div className="popup-itemdtl-card">
                        <div className="popup-itemdtl-card-img">
                            <div className="popup-itemdtl-card-img-inner">
                                {props.img}
                            </div>
                        </div>
                        <div className="popup-itemdtl-card-bottom">
                            <div className="popup-itemdtl-card-pagi">
                                {[...Array(5)].map((el) => (
                                    <button className="popup-itemdtl-card-pagi-btn"></button>
                                ))}
                            </div>
                            <div className="popup-itemdtl-card-nav">
                                <button className="popup-itemdtl-card-nav-btn prev">
                                    <div className="ic ic-24">
                                        {props.arrIcon}
                                    </div>
                                </button>
                                <button className="popup-itemdtl-card-nav-btn next">
                                    <div className="ic ic-24">
                                        {props.arrIcon}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="popup-itemdtl-content">
                        <h3 className="heading h3 txt-black txt-up popup-itemdtl-content-title">Molded Fiber PLATES</h3>
                        <div className="popup-itemdtl-table">
                            <div className="txt txt-14 txt-med popup-itemdtl-table-head">
                                <div className="popup-itemdtl-table-code">SKU</div>
                                <div className="popup-itemdtl-table-size">Size</div>
                                <div className="popup-itemdtl-table-color">Color</div>
                                <div className="popup-itemdtl-table-count">Pack / Count</div>
                                <div className="popup-itemdtl-table-dtl">Details</div>
                                <div className="popup-itemdtl-table-model">3D Model</div>
                            </div>
                            <div className="popup-itemdtl-table-item-wrap" data-lenis-prevent="#">
                                <div className="popup-itemdtl-table-item-inner">
                                    {[...Array(15)].map((el) => (
                                        <div className="txt txt-16 txt-med popup-itemdtl-table-item">
                                            <div className="popup-itemdtl-table-code">BA5500</div>
                                            <div className="popup-itemdtl-table-size">6”</div>
                                            <div className="popup-itemdtl-table-color">White</div>
                                            <div className="popup-itemdtl-table-count">12 / 15</div>
                                            <div className="popup-itemdtl-table-dtl">Promotional Pack</div>
                                            <div className="popup-itemdtl-table-model">
                                                <div className="popup-itemdtl-table-model-inner">
                                                    {props.qr}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalPopup