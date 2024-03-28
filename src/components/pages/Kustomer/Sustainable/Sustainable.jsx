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
                <div className="kustomer-sus-main">
                    <div className="line kustomer-sus-main-line-top"></div>
                    <div className="line line-ver kustomer-sus-main-line-right"></div>
                    <div className="kustomer-sus-main-cate">
                        <ul className="kustomer-sus-main-cate-list">
                            <li className="kustomer-sus-main-cate-list-item">
                                <a href="" className="kustomer-sus-main-cate-list-item-inner">
                                    <div className="dot"></div>
                                    <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-item-txt">Bowl</span>
                                </a>
                            </li>
                            <li className="kustomer-sus-main-cate-list-item">
                                <a href="" className="kustomer-sus-main-cate-list-item-inner">
                                    <div className="dot"></div>
                                    <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-item-txt">Plates & Platters</span>
                                </a>
                            </li>
                            <li className="kustomer-sus-main-cate-list-item">
                                <a href="" className="kustomer-sus-main-cate-list-item-inner">
                                    <div className="dot"></div>
                                    <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-item-txt">Cups</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="kustomer-sus-main-table">
                        <a href="#" className="kustomer-sus-main-table-item">
                            <div className="kustomer-sus-main-table-item-img">
                                {props.img}
                            </div>
                            <div className="kustomer-sus-main-table-item-info">
                                <h4 className="heading h5 kustomer-sus-main-table-item-info-name"></h4>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerSustain
