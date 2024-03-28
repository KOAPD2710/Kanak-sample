import { useEffect, useState } from "react"
import { getAllByType } from "@/prismic"
import "./Sustainable.scss"

function SustainableItem({ ...props }) {
    useEffect(() => {
    }, [])

    return (
        <a href="#" className="kustomer-sus-main-table-item">
            <div className="kustomer-sus-main-table-item-img">
                <img src={props.data.thumbnail.url} alt={props.data.thumbnail.alt} />
                {/* width={props.data.thumbnail.dimensions.width} */}
            </div>
            <div className="kustomer-sus-main-table-item-info">
                <div className="line line-mid"></div>
                <h4 className="heading h6 txt-black txt-up kustomer-sus-main-table-item-info-name">
                    {props.data.title}
                </h4>
                <div className="kustomer-sus-main-table-item-info-qr">
                    <div className="line line-ver line-qr"></div>
                    <div className="kustomer-sus-main-table-item-info-qr-inner">
                        <img src={props.data.qr_code.url} alt={props.data.qr_code.alt} width={props.data.qr_code.dimensions.width} />
                    </div>
                </div>
            </div>
            <div className="line line-ver line-left"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
        </a>
    )
}

function KustomerSustain({ ...props }) {
    const allItem = props.productList
    const [filter, setFilter] = useState(props.cateList[0].uid)
    const [itemList, setItemList] = useState(allItem);
    const [currentList, setCurrentList] = useState(props.cateList[0].list)

    function filterList(e, uid, list) {
        e.preventDefault();
        setFilter(uid)
        setCurrentList(list)
    }

    useEffect(() => {
        let currentItems = allItem.filter(item => currentList.includes(item.uid));
        setItemList(currentItems)
    }, [filter])

    useEffect(() => {
    }, [])
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
                    <div className="kustomer-sus-main-cate">
                        <ul className="kustomer-sus-main-cate-list">
                            {props.cateList.map((el, idx) => (
                                <li className="kustomer-sus-main-cate-list-item" key={idx}>
                                    <a href="#" className="kustomer-sus-main-cate-list-item-inner" data-cursor="txtLink" onClick={(e) => { filterList(e, el.uid, el.list) }}>
                                        <div className="dot"></div>
                                        <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-item-txt">{el.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="kustomer-sus-main-table">
                        {itemList.map((item, idx) => (
                            <SustainableItem {...item} img={props.img} qr={props.qr} key={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerSustain
