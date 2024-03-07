function CasedtlRel({...props}) {
    return (
        <div className="casedtl-rel">
            <div className="casedtl-rel-head"> 
                <h3 className="heading h4 txt-up txt-black casedtl-rel-title">
                    Other case studIes
                </h3>
                <div className="casedtl-rel-nav">
                    <button className="casedtl-rel-nav-item casedtl-rel-nav-item-prev">
                        <div className="ic ic-16">
                            {props.arrIcon}
                        </div>
                    </button>
                    <button className="casedtl-rel-nav-item casedtl-rel-nav-item-next">
                        <div className="ic ic-16">
                            {props.arrIcon}
                        </div>
                    </button>
                </div>
                <div className="line line-top"></div>
                <div className="line line-bot"></div>
            </div>
            <div className="casedtl-rel-main">
                <div className="casedtl-rel-main-inner">
                    
                </div>
            </div>
        </div>
    )
}
export default CasedtlRel