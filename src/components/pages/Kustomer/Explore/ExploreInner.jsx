function ExploreInner({ ...props }) {
    return (
        <div className="kustomer-explore-main-item-list-inner">
            <h4 className="heading h5 txt-black txt-up kustomer-explore-main-item-list-inner-title">{props.list.title}</h4>
            <p className="txt txt-20 txt-med kustomer-explore-main-item-list-inner-des">{props.list.describle}</p>
            <div className="line"></div>
        </div>
    )
}

export default ExploreInner