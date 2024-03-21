import "./Sustainable.scss"
import KustomerSustainItem from "./SustainableItem"

import IcUpRight from "@/components/globals/IcArrow/ArrowUpRight"

function KustomerSustain({ ...props }) {
    return (
        <section className="kustomer-sus">
            <div className="container">
                <div className="kustomer-sus-wrapper">
                    {[...Array(5)].map((item, idx) => (
                        <KustomerSustainItem key={idx} ic={props.ic} />
                    ))}
                    <div className="kustomer-sus-item kustomer-sus-item-title">
                        <div className="kustomer-sus-item-title-logo">
                            {props.sustainable}
                        </div>
                        <h4 className="heading h6 txt-black txt-up kustomer-sus-item kustomer-sus-item-title-txt">
                            <span>our premier line of dinnerware crafted from premium sugarcane bagasse.</span>
                        </h4>
                    </div>
                    <div className="kustomer-sus-item kustomer-sus-item-explore">
                        <h2 className="heading h3 txt-black txt-up kustomer-sus-item-explore-title">
                            Our versatile pack sizes and shelf-ready options offer an easy, eco-friendly choice for single-use dinnerware.
                        </h2>
                        <button className="kustomer-sus-item-explore-btn">
                            <div className="ic ic-40">
                                <IcUpRight />
                            </div>
                            <h4 className="heading h5 txt-black txt-up kustomer-sus-item-explore-btn-txt">Explore</h4>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerSustain
