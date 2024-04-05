import "./Main.scss"
import { useState, useEffect, useRef, useMemo } from "react";

function Item({ ...props }) {
    return (
        <a href="#" className="katalog-main-list-item" >
            <div className="katalog-main-list-item-img">
                <img src={props.img.url} alt={props.img.alt} width={props.img.dimensions.width} className="img" />
            </div>
            <div className="katalog-main-list-item-info">
                <div className="line line-mid"></div>
                <h4 className="heading h6 txt-black txt-up katalog-main-list-item-info-name">
                    {props.name}
                </h4>
                <div className="katalog-main-list-item-info-qr">
                    <div className="line line-ver line-qr"></div>
                    <div className="katalog-main-list-item-info-qr-inner">
                        <img src={props.qr.url} alt={props.qr.alt} width={props.qr.dimensions.width} />
                    </div>
                </div>
            </div>
            <div className="line line-ver line-left"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
        </a>
    )
}


function FilterTag({ ...props }) {
    return (
        <button className={`katalog-main-filter-item ${props.isActive ? "active" : ""}`} data-filter={props.name} onClick={props.onClick}>
            <div className="txt txt-20 txt-bold katalog-main-filter-item-txt">
                {props.name}
            </div>
            <div className="line"></div>
        </button>
    )
}

function FilterCate({ ...props }) {
    return (
        <li className={`katalog-main-cate-item ${props.isActive ? "active" : ""}`} >
            <button className="katalog-main-cate-item-inner" data-cursor="txtLink" data-cursor-txtlink="child" data-cate={props.data} onClick={props.onClick}>
                <div className="dot"></div>
                <div className="txt txt-20 txt-black txt-up katalog-main-cate-item-txt" data-cursor-txtlink-child="true">{props.data}</div>
            </button>
        </li>
    )
}

function KatalogMain({ ...props }) {
    const { allItem: allItem } = props;
    const [filter, setFilter] = useState('All');
    const [category, setCategory] = useState(props.cateList[0]);

    let newList = allItem.filter((item) => {
        if (filter == "All") {
            return item.cate === category && item;
        } else {
            return item.data.tag_grp.some(tag => tag.tags === filter) && item.cate === category && item
        }
    });
    const renderFilterTag = useMemo(() => {
        return (
            <>
                <FilterTag name={'All'}
                    // count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e) }} />
                {props.tagList.map((el, idx) => (
                    <FilterTag name={el}
                        // count={allItem.filter((item) => item.data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])

    const renderFilterCate = useMemo(() => {
        return (
            props.cateList.map((el) => (
                <FilterCate
                    key={el}
                    data={el}
                    onClick={(e) => { filterList(e) }}
                    isActive={category == el}
                />
            ))
        )
    }, [category])

    const renderListItem = useMemo(() => {
        return (
            newList.map((item, idx) => (
                <Item key={idx} name={item.data.title} img={item.data.thumbnail} qr={item.data.qr} ></Item>
            ))
        )
    }, [newList, category, filter])

    function filterList(e) {
        let target = e.target
        if (target.hasAttribute('data-filter')) {
            let data = e.target.getAttribute('data-filter')
            setFilter(data)
        } else if (target.hasAttribute('data-cate')) {
            let data = e.target.getAttribute('data-cate')
            setCategory(data)
        }
    }
    return (
        <section className="katalog-main">
            <div className="container grid">
                <div className="katalog-main-filter">
                    <div className="line line-top"></div>
                    <div className="katalog-main-filter-inner">
                        <div className="katalog-main-filter-list">
                            <button className="katalog-main-filter-list-toggle">
                                <div className="txt txt-18 txt-bold katalog-main-filter-list-toggle-txt">
                                    {filter == 'All' ? 'Categories' : filter}
                                </div>
                                <div className={`ic ic-20 katalog-main-filter-list-toggle-ic`}>
                                    {props.icDropdown}
                                </div>
                            </button>
                            <div className={`katalog-main-filter-list-dropdown`}>
                                <div className="katalog-main-filter-list-dropdown-inner">
                                    {renderFilterTag}
                                </div>
                                <button className="katalog-main-filter-list-pdf">
                                    <div className="line line-ver line-left"></div>
                                    <div className="txt txt-20 txt-med katalog-main-filter-list-pdf-txt">Download Catalog</div>
                                </button>
                                <div className="line line-ver katalog-main-filter-list-dropdown-line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="line line-bot"></div>
                </div>
                <div className="katalog-main-cate">
                    <ul className="katalog-main-cate-list">
                        {renderFilterCate}
                    </ul>
                </div>
                <div className="katalog-main-list">
                    {renderListItem}
                </div>
            </div>
        </section>
    )
}

export default KatalogMain
