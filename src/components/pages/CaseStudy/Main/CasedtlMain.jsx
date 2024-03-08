function CasedtlMain({...props}) {
    return (
        <div className="casedtl-main">
            <div className="casedtl-bread">
                <a href="/" className="txt txt-20 txt-bold casedtl-bread-link">
                    Home
                </a>
                <div className="txt txt-14 txt-semi casedtl-bread-div">/</div>
                <a href="/kase-studies" className="txt txt-20 txt-bold casedtl-bread-link">
                    Kase studies
                </a>
                <div className="txt txt-14 txt-semi casedtl-bread-div">/</div>
                <a href={`/kase-studies#${encodeURI(props.data.category)}`} className="txt txt-20 txt-bold casedtl-bread-link">
                    {props.data.category}
                </a>
                <div className="line"></div>
            </div>
            <div className="casedtl-content">
                <div className="casedtl-content-head">
                    <div className="casedtl-content-title-wrap">
                        <h1 className="heading h3 txt-up txt-black casedtl-content-title">
                            {props.data.title[0].text}
                        </h1>
                        <h2 className="heading h6 txt-up txt-black casedtl-content-sub txt-green">
                            {props.data.sub_title}
                        </h2>
                    </div>
                    <div className="casedtl-content-client-img">
                        {props.clientLogo}
                    </div>
                    <div className="line"></div>
                </div>
                <div className="casedtl-content-richtext richtext">
                    {props.content}
                    <div className="holder"></div>
                </div>
            </div>
        </div>
    )
}

export default CasedtlMain