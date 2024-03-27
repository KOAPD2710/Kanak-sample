import "./Sustainable.scss"
import KustomerSustainItem from "./SustainableItem"

import IcUpRight from "@/components/globals/IcArrow/ArrowUpRight"

function KustomerSustain({ ...props }) {
    return (
        <section className="kustomer-sus">
            <div className="container grid">
                <div className="kustomer-sus-head">
                    <div className="kustomer-sus-head-img">
                        {props.sustainable}
                    </div>
                    <span className="heading h6 txt-black txt-up kustomer-sus-head-sub">
                        our premier line of dinnerware crafted from premium sugarcane bagasse.
                    </span>
                </div>
            </div>
        </section>
    )
}

export default KustomerSustain
