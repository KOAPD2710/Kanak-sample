

function KustomerSustainItem({ ...props }) {
    return (
        <div className="kustomer-sus-item kustomer-sus-item-frag">
            <div className="ic kustomer-sus-item-frag-ic">
                {props.ic}
            </div>
            <div className="kustomer-sus-item-frag-content">
                <h5 className="heading h5 txt-black txt-up kustomer-sus-item-frag-content-title">Renewable Revolution</h5>
                <p className="txt txt-20 txt-med kustomer-sus-item-frag-content-des">Back to earth, forward to future.</p>
            </div>
            <div className="line line-top"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}

export default KustomerSustainItem
