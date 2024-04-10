import "./Main.scss"
import { parseUrl, formatData } from "@/components/utils/text";
import { useState, useEffect, useRef, useMemo } from "react";

function Item({ ...props }) {
    return (
        <a href="#" className="katalog-main-list-item" >
            <div className="katalog-main-list-item-img">
                <div className="katalog-main-list-item-img-inner">
                    <img src={props.img.url} alt={props.img.alt} width={props.img.dimensions.width} className="img" />
                </div>
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
        <button className={`katalog-main-filter-item ${props.isActive ? "active" : ""}`} data-filter={formatData(props.name)} onClick={props.onClick}>
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
            <button className="katalog-main-cate-item-inner" data-cursor="txtLink" data-cursor-txtlink="child" data-cate={formatData(props.data)} onClick={props.onClick}>
                <div className="dot"></div>
                <div className="txt txt-20 txt-black txt-up katalog-main-cate-item-txt" data-cursor-txtlink-child="true">{props.data}</div>
            </button>
        </li>
    )
}

function KatalogMain({ ...props }) {
    const { allItem: allItem } = props;
    const [filter, setFilter] = useState('all');
    const [category, setCategory] = useState(formatData(props.cateList[0]));

    function UpdateUrlSearch(url, key, value) {
        let urlObject = new URL(url);
        let searchParams = new URLSearchParams(urlObject.search);

        if (value === "") {
            searchParams.delete(key);
        } else {
            if (searchParams.has(key)) {
                searchParams.set(key, value);
            } else {
                searchParams.append(key, value);
            }
        }

        urlObject.search = searchParams.toString();
        return urlObject.toString();
    }
    let newList = allItem.filter((item) => {
        if (filter == "all") {
            return item
        } else {
            return item.data.tag_grp.some(target => formatData(target.tags) == filter) && item
        }
    });
    let currCatelist = []
    newList.map((el) => {
        if (!currCatelist.includes(el.cate)) {
            currCatelist.push(el.cate)
        }
    })
    useEffect(() => {
        const searchParam = new URLSearchParams(window.location.search);
        if (searchParam.has("cate")) {
            setCategory(searchParam.get("cate"))
        };
        if (searchParam.has("tag")) {
            setFilter(searchParam.get("tag"))
        }
    }, [])
    const renderFilterTag = useMemo(() => {
        return (
            <>
                <FilterTag name={'All'}
                    isActive={filter == 'all'}
                    onClick={(e) => { filterList(e) }} />
                {props.tagList.map((el, idx) => (
                    <FilterTag name={el}
                        isActive={filter == formatData(el)}
                        onClick={(e) => { filterList(e) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])
    const renderListItem = useMemo(() => {
        return (
            newList.map((item, idx) => (
                item.cate == category &&
                <Item key={idx} name={item.data.title} img={item.data.thumbnail} qr={item.data.qr} ></Item>
            ))
        )
    }, [category, filter])
    const renderFilterCate = useMemo(() => {
        let forceCategory
        if (!currCatelist.includes(category)) {
            forceCategory = props.cateList.find((el) => currCatelist.includes(formatData(el)))
            setCategory(formatData(forceCategory))
        }
        return (
            filter == "all" ?
                props.cateList.map((el) => (
                    <FilterCate
                        key={el}
                        data={el}
                        onClick={(e) => { filterList(e) }}
                        isActive={category == formatData(el)}
                    />
                )) :
                props.cateList.map((el) => (
                    currCatelist.includes(formatData(el)) &&
                    <FilterCate
                        key={el}
                        data={el}
                        onClick={(e) => { filterList(e) }}
                        isActive={category == formatData(el)}
                    />
                ))
        )
    }, [category, filter])
    useEffect(() => {
        window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'cate', formatData(category)));
    }, [category])
    useEffect(() => {
        if (filter == "all") {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'tag', ''));
        } else {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'tag', formatData(filter)));
        }
    }, [filter])

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
                    <div className="katalog-main-list-wrap">
                        {renderListItem}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KatalogMain
