import "./Main.scss"
import { useState, useEffect, useRef, useMemo } from "react";

function Item({ ...props }) {
    return (
        <a href="#" className="katalog-main-list-item" >
            <div className="katalog-main-list-item-img">
                {props.img}
                {/* <img src={props.data.thumbnail.url} alt={props.data.thumbnail.alt} width={props.data.thumbnail.dimensions.width} className="img" /> */}
            </div>
            <div className="katalog-main-list-item-info">
                <div className="line line-mid"></div>
                <h4 className="heading h6 txt-black txt-up katalog-main-list-item-info-name">
                    {/* {props.data.title} */}
                    Bowls
                </h4>
                <div className="katalog-main-list-item-info-qr">
                    <div className="line line-ver line-qr"></div>
                    <div className="katalog-main-list-item-info-qr-inner">
                        {/* <img src={props.data.qr_code.url} alt={props.data.qr_code.alt} width={props.data.qr_code.dimensions.width} /> */}
                        {props.qr}
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
    const { list: allItem } = props;
    const [filter, setFilter] = useState('All');
    const [category, setCategory] = useState(props.cateList[0]);
    // const [itemList, setItemList] = useState(allItem);
    // const [limit, setLimit] = useState(4);
    const toggleRef = useRef();

    const renderFilterTag = useMemo(() => {
        return (
            <>
                <FilterTag name={'All'}
                    // count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterTag(e) }} />
                {props.tagList.map((el, idx) => (
                    <FilterTag name={el}
                        // count={allItem.filter((item) => item.data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterTag(e) }}
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
                    onClick={(e) => { filterCate(e) }}
                    isActive={category == el}
                />
            ))
        )
    }, [category])

    function filterTag(e) {
        const targetTag = e.target.getAttribute('data-filter')
        setFilter(targetTag)
    }
    function filterCate(e) {
        const targetTag = e.target.getAttribute('data-cate')
        setCategory(targetTag)
    }
    // useEffect(() => {
    //     console.log(filter);
    // }, [filter])
    // useEffect(() => {
    //     console.log(category);
    // }, [category])

    useEffect(() => {
        console.log(props.allItem);
        console.log(props.check);
    }, [])
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
                    {props.allItem.map((item, idx) => (
                        <Item key={idx} {...item} img={props.img} qr={props.qr} ></Item>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KatalogMain
