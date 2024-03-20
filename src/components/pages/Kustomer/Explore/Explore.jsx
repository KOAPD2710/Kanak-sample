import "./Explore.scss"
import ExploreItem from "./ExploreItem"

function KustomerExplore({ ...props }) {
    const allItem = props.list
    return (
        <section className="kustomer-explore">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up kustomer-explore-title">Explore our <span className="txt-green">customizable offers</span></h1>
                <div className="kustomer-explore-main">
                    {allItem.map((item, idx) =>
                        <ExploreItem
                            title={item.title}
                            label={item.label}
                            list={item.list}
                            key={idx}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default KustomerExplore