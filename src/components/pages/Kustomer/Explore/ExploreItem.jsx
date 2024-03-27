import ExploreInner from "./ExploreInner";

function ExploreItem({ title, label, list, ...props }) {

    return (
        <div className="kustomer-explore-main-item">
            <div className="line kustomer-explore-main-item-line"></div>
            <a href="" className="kustomer-explore-main-item-main" data-cursor="ext">
                <div className="heading h5 txt-black txt-up kustomer-explore-main-item-main-label">{label}</div>
                <h2 className="heading h1 txt-black txt-up kustomer-explore-main-item-main-title">{title}</h2>
                <div className="kustomer-explore-main-item-main-img">
                    {props.img}
                </div>
            </a>
            <div className="kustomer-explore-main-item-list">
                <div className="line line-ver"></div>
                {list.map((item, idx) =>
                    <ExploreInner list={item} key={idx} />
                )}
            </div>
        </div>
    )
}


export default ExploreItem