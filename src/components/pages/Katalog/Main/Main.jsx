import "./Main.scss"
import ArrowDropdown from "@/components/globals/IcArrow/ArrowDropdown.jsx";
import ArrowDown from "@/components/globals/IcArrow/ArrowDown.jsx";
import { formatData } from "@/components/utils/text";
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { useState, useEffect, useRef, useMemo } from "react";

function Item({ ...props }) {
    console.log(props);
    return (
        <button className="katalog-main-list-item" data-popup="open">
            <div className="katalog-main-list-item-img">
                <div className="katalog-main-list-item-img-inner data-thumb">
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
            <div className="hidden-data">
                <div className="data-name">{props.name}</div>
                <div className="data-carousel">
                    {props.carousel.map(({ image }, idx) => (
                        <div className="keen-slider__slide" key={idx} >
                            <img src={image.url} alt={image.alt} width={image.dimensions.width} />
                        </div>
                    ))}
                </div>
                <div className="data-variants">
                    {props.variants.map((item, idx) => (
                        <div className="txt txt-16 txt-med popup-itemdtl-table-item" key={idx}>
                            <div className="popup-itemdtl-table-code">{item.sku}</div>
                            <div className="popup-itemdtl-table-size">{item.size}</div>
                            <div className="popup-itemdtl-table-color">{item.color}</div>
                            <div className="popup-itemdtl-table-count">{item.pack_count}</div>
                            <div className="popup-itemdtl-table-dtl">{item.details}</div>
                            <div className="popup-itemdtl-table-model">
                                <div className="popup-itemdtl-table-model-inner">
                                    <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </button >
    )
}

function FilterDropdownTag({ ...props }) {
    return (
        <button className={`katalog-main-filter-item ${props.isActive ? "active" : ""}`} data-tag={props.name} onClick={props.onClick}>
            <div className="txt txt-20 txt-bold katalog-main-filter-item-txt">
                {props.name}
            </div>
            <div className="line"></div>
        </button>
    )
}

function FilterDropdownCate({ ...props }) {
    return (
        <button className={`katalog-main-filter-item ${props.isActive ? "active" : ""}`} data-cate={props.name} onClick={props.onClick}>
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
            <button className="katalog-main-cate-item-inner" data-cursor="txtLink" data-cursor-txtlink="child" data-cate={props.name} onClick={props.onClick}>
                <div className="dot"></div>
                <div className="txt txt-20 txt-black txt-up katalog-main-cate-item-txt" data-cursor-txtlink-child="true">{props.name}</div>
            </button>
        </li>
    )
}

function KatalogMain({ ...props }) {
    const { allItem } = props;
    const [tag, setTag] = useState('All');
    const [category, setCategory] = useState(props.cateList[0]);
    const [isOpenTagDropdown, setIsOpenTagDropdow] = useState(false);
    const [isOpenCateDropdown, setIsOpenCateDropdown] = useState(false);
    const [limit, setLimit] = useState(999999);

    const toggleRef = useRef();

    useOutsideAlerter(toggleRef, () => { setIsOpenTagDropdow(false) })

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
        if (tag == "All") {
            return item
        } else {
            return item.data.tag_grp.some(target => target.tags.uid == formatData(tag)) && item
        }
    });
    let currCatelist = []
    newList.map((el) => {
        if (!currCatelist.includes(el.cate)) {
            currCatelist.push(el.cate)
        }
    })
    let renderList = newList.filter((item) => {
        return item.cate == formatData(category) && item
    })
    useEffect(() => {
        const searchParam = new URLSearchParams(window.location.search);
        if (searchParam.has("cate")) {
            setCategory(props.cateList.find(item => formatData(item) === searchParam.get("cate")))
        };
        if (searchParam.has("tag")) {
            setTag(props.tagList.find(item => formatData(item) === searchParam.get("tag")));
        }
    }, [])
    const renderFilterDropdownTag = useMemo(() => {
        return (
            <>
                <FilterDropdownTag name={'All'}
                    isActive={tag == 'All'}
                    onClick={(e) => { filterList(e); setIsOpenTagDropdow(false) }} />
                {props.tagList.map((el, idx) => (
                    <FilterDropdownTag name={el}
                        isActive={tag == el}
                        onClick={(e) => { filterList(e); setIsOpenTagDropdow(false) }}
                        key={idx} />
                ))}
            </>
        )
    }, [tag])
    const renderFilterDropdownCate = useMemo(() => {
        return (
            <>
                {tag == "all" ?
                    props.cateList.map((el) => (
                        <FilterDropdownCate name={el}
                            isActive={category == el}
                            onClick={(e) => { filterList(e); setIsOpenCateDropdown(false) }}
                            key={el} />
                    )) :
                    props.cateList.map((el) => (
                        currCatelist.includes(formatData(el)) &&
                        <FilterDropdownCate name={el}
                            isActive={category == el}
                            onClick={(e) => { filterList(e); setIsOpenCateDropdown(false) }}
                            key={el} />
                    ))}
            </>
        )
    }, [category, tag])
    const renderToggleBtn = useMemo(() => {
        return (
            <div className={`katalog-main-filter-list-toggle`}>
                <button className={`katalog-main-filter-list-toggle-btn katalog-main-filter-list-toggle-btn-tag ${isOpenTagDropdown ? "active" : ""}`} onClick={(e) => { setIsOpenTagDropdow(!isOpenTagDropdown); setIsOpenCateDropdown(false) }}>
                    <div className="txt txt-18 txt-bold katalog-main-filter-list-toggle-txt">
                        <div className="katalog-main-filter-list-toggle-txt-wrap">
                            <div className="txt-16 txt-up txt-black katalog-main-filter-list-toggle-txt-head">Kustomer</div>
                            <div className="katalog-main-filter-list-toggle-txt-title">
                                {tag == 'All' ? 'All' : tag}
                            </div>
                        </div>
                    </div>
                    <div className={`ic ic-20 katalog-main-filter-list-toggle-ic`}>
                        <ArrowDropdown />
                    </div>
                </button>
                <button className={`katalog-main-filter-list-toggle-btn katalog-main-filter-list-toggle-btn-cate ${isOpenCateDropdown ? "active" : ""}`} onClick={(e) => { setIsOpenCateDropdown(!isOpenCateDropdown); setIsOpenTagDropdow(false) }} >
                    <div className="txt txt-18 txt-bold katalog-main-filter-list-toggle-txt">
                        <div className="katalog-main-filter-list-toggle-txt-wrap">
                            <div className="txt-16 txt-up txt-black katalog-main-filter-list-toggle-txt-head">product</div>
                            <div className="katalog-main-filter-list-toggle-txt-title">
                                {category}
                            </div>
                        </div>
                    </div>
                    <div className={`ic ic-20 katalog-main-filter-list-toggle-ic`}>
                        <ArrowDropdown />
                    </div>
                </button>
            </div>
        )
    }, [isOpenTagDropdown, isOpenCateDropdown, tag, category])
    const renderListItem = useMemo(() => {
        return (
            renderList.map(({ data }, idx) => (
                idx < limit &&
                <Item key={idx} name={data.title} img={data.thumbnail} qr={data.qr} variants={data.variants} carousel={data.carousel_imgs}></Item>
            ))
        )
    }, [category, tag])
    const renderFilterCate = useMemo(() => {
        let forceCategory
        if (!currCatelist.includes(formatData(category))) {
            forceCategory = props.cateList.find((el) => currCatelist.includes(formatData(el)))
            setCategory(forceCategory)
        }
        return (
            tag == "all" ?
                props.cateList.map((el) => (
                    <FilterCate
                        key={el}
                        name={el}
                        onClick={(e) => { filterList(e) }}
                        isActive={category == el}
                    />
                )) :
                props.cateList.map((el) => (
                    currCatelist.includes(formatData(el)) &&
                    <FilterCate
                        key={el}
                        name={el}
                        onClick={(e) => { filterList(e) }}
                        isActive={category == el}
                    />
                ))
        )
    }, [category, tag])

    useEffect(() => {
        window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'cate', formatData(category)));
        console.log(category);
    }, [category])
    useEffect(() => {
        if (tag == "All") {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'tag', ''));
        } else {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'tag', formatData(tag)));
        }
        console.log(tag);
    }, [tag])
    function filterList(e) {
        let target = e.target
        if (target.hasAttribute('data-tag')) {
            let data = e.target.getAttribute('data-tag')
            setTag(data)
        } else if (target.hasAttribute('data-cate')) {
            let data = e.target.getAttribute('data-cate')
            setCategory(data)
        }
    }
    useEffect(() => {
        if (window.innerWidth < 768) {
            setLimit(4)
        }
    }, [])
    return (
        <section className="katalog-main">
            <div className="container grid">
                <div className="katalog-main-filter">
                    <div className="line line-top"></div>
                    <div className="katalog-main-filter-inner">
                        <div className="katalog-main-filter-list" ref={toggleRef}>
                            {renderToggleBtn}
                            <div className={`katalog-main-filter-list-dropdown ${isOpenTagDropdown ? "active" : ""}`}>
                                <div className="katalog-main-filter-list-dropdown-inner" ref={toggleRef}>
                                    {renderFilterDropdownTag}
                                </div>
                            </div>
                            <div className={`katalog-main-filter-list-dropdown katalog-main-filter-list-dropdown-cate ${isOpenCateDropdown ? "active" : ""}`}>
                                <div className="katalog-main-filter-list-dropdown-inner" ref={toggleRef}>
                                    {renderFilterDropdownCate}
                                </div>
                            </div>
                            <button className="btn katalog-main-filter-list-pdf" data-cursor="hide">
                                <div className="line line-ver line-left"></div>
                                <div className="txt txt-20 txt-med katalog-main-filter-list-pdf-txt">Download Catalog</div>
                            </button>
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
                        <div className="line line-ver katalog-main-list-line"></div>
                        {renderListItem}
                    </div>
                </div>
                <div className="line katalog-main-line-bot"></div>
                <div className="line line-ver katalog-main-line-left"></div>
                <div className="line line-ver katalog-main-line-right"></div>
            </div>
            <div className="container">
                <div className={`katalog-main-load ${limit >= renderList.length ? 'hidden' : ''}`}>
                    <button className="katalog-main-load-btn" onClick={() => setLimit(limit + 4)}>
                        <div className="katalog-main-load-btn-ic">
                            <div className="ic ic-16">
                                <ArrowDown />
                            </div>
                        </div>
                        <div className="txt txt-16 txt-med katalog-main-load-btn-txt">
                            Load more
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default KatalogMain
