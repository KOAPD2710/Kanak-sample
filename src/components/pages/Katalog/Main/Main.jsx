import "./Main.scss"
import ArrowDropdown from "@/components/globals/IcArrow/ArrowDropdown.jsx";
import ArrowDown from "@/components/globals/IcArrow/ArrowDown.jsx";
import { formatData } from "@/components/utils/text";
import { isEmpty } from "@/components/utils/text";
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { useState, useEffect, useRef, useMemo } from "react";

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function Item({ ...props }) {

    const itemRef = useRef();
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const item = itemRef.current

        const name = new SplitType(item.querySelector('.katalog-main-list-item-info-name'), { types: "lines,words", lineClass: 'split-line' })
        if (animationStarted) {
            timeline().cancel();
            name.revert();
            item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
            item.querySelector('.katalog-main-list-item-img').removeAttribute('style');
            item.querySelector('.katalog-main-list-item-img-inner').removeAttribute('style');
        }

        animate(item.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-mid'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-qr'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(name.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.katalog-main-list-item-info-qr-inner'), { opacity: 0, scale: .9 }, { duration: 0 })
        animate(item.querySelector('.katalog-main-list-item-img'), { opacity: 0, scale: .9 }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
            [item.querySelector('.katalog-main-list-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
            [item.querySelector('.line-mid'), { scaleX: 1 }, { duration: .4, at: .35 }],
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .45, at: .5 }],
            [item.querySelector('.line-right'), { scaleY: 1 }, { duration: .5, at: .6 }],
            [item.querySelector('.line-qr'), { scaleY: 1 }, { duration: .4, at: .6 }],
            [name.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .5 }],
            [item.querySelector('.katalog-main-list-item-info-qr-inner'), { opacity: 1, scale: 1 }, { duration: .6, at: .45 }],
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                setAnimationStarted(false);
                name.revert();
                item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
                item.querySelector('.katalog-main-list-item-img').removeAttribute('style');
                item.querySelector('.katalog-main-list-item-info-qr-inner').removeAttribute('style');
            })
        })
    }, [props.tag, props.cate])
    return (
        <button className="katalog-main-list-item" data-popup="open" ref={itemRef}>
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
                        !isEmpty(image) && (
                            <div className="keen-slider__slide" key={idx} >
                                <img src={image.url} alt={image.alt} width={image.dimensions.width} />
                            </div>
                        )
                    ))}
                </div>
                <div className="data-variants">
                    {props.variants.map((item, idx) => (
                        <div className="txt txt-16 txt-med popup-itemdtl-table-item" key={idx}>
                            <div className="popup-itemdtl-table-item-div desktop">
                                <div className="popup-itemdtl-table-code">{item.sku ? item.sku : '-'}</div>
                                <div className="popup-itemdtl-table-size">{item.size ? item.size : '-'}</div>
                                <div className="popup-itemdtl-table-color">{item.color ? item.color : '-'}</div>
                                <div className="popup-itemdtl-table-count">{item.pack_count ? item.pack_count : '-'}</div>
                                <div className="popup-itemdtl-table-dtl">{item.details ? item.details : '-'}</div>
                                <div className="popup-itemdtl-table-model">
                                    <div className="popup-itemdtl-table-model-inner">
                                        {!isEmpty(item.qr_code) ? (
                                            <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />)
                                            : '-'
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="popup-itemdtl-table-item-div tablet">
                                <div className="line line-top"></div>
                                <div className="line line-ver line-mid"></div>
                                {idx == props.variants.length - 1 && (
                                    <div className="line line-bot"></div>
                                )}
                                <div className="div-left">
                                    <div className="wrap popup-itemdtl-table-code">
                                        <div className="head">SKU</div>
                                        {item.sku ? item.sku : '-'}
                                    </div>
                                    <div className="wrap popup-itemdtl-table-model">
                                        <div className="head">3D Model</div>
                                        <div className="popup-itemdtl-table-model-inner">
                                            {!isEmpty(item.qr_code) ? (
                                                <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />)
                                                : '-'
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="div-right">
                                    <div className="wrap popup-itemdtl-table-size">
                                        <div className="head">Size</div>
                                        <div className="body">{item.size ? item.size : '-'}</div>
                                    </div>
                                    <div className="wrap popup-itemdtl-table-color">
                                        <div className="head">Color</div>
                                        <div className="body">{item.color ? item.color : '-'}</div>
                                    </div>
                                    <div className="wrap popup-itemdtl-table-count">
                                        <div className="head">Pack / Count</div>
                                        <div className="body">{item.pack_count ? item.pack_count : '-'}</div>
                                    </div>
                                    <div className="wrap popup-itemdtl-table-dtl">
                                        <div className="head">Details</div>
                                        <div className="body">{item.details ? item.details : '-'}</div>
                                    </div>
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

        if (isEmpty(value)) {
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
        if (searchParam.has("category")) {
            setCategory(props.cateList.find(item => formatData(item) === searchParam.get("category")))
        };
        if (searchParam.has("kustomer")) {
            setTag(props.tagList.find(item => formatData(item) === searchParam.get("kustomer")));
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
                <Item key={idx} name={data.title} img={data.thumbnail} qr={data.qr} variants={data.variants} carousel={data.carousel_imgs} cate={category} tag={tag}></Item>
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
        window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'category', formatData(category)));
    }, [category])
    useEffect(() => {
        if (tag == "All") {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'kustomer', ''));
        } else {
            window.history.replaceState(null, null, UpdateUrlSearch(window.location.href, 'kustomer', formatData(tag)));
        }
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
        animate('.katalog-main-line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-line-left', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-line-right', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-list-line', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.katalog-main-filter-list-pdf', { opacity: 0 }, { duration: 0 })
        animate('.katalog-main-filter-list-toggle-btn', { opacity: 0 }, { duration: 0 })
        animate('.katalog-main-filter .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.katalog-main-cate-list .katalog-main-cate-item', { transform: "translateX(-2rem)", opacity: 0 }, { duration: 0 })

        const sequence = [
            ['.katalog-main-line-top', { scaleX: 1 }, { duration: .6, at: 0 }],
            ['.katalog-main-line-bot', { scaleX: 1 }, { duration: .8, at: .1 }],
            ['.katalog-main-line-left', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-line-right', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-list-line', { scaleY: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-filter .line-bot', { scaleX: 1 }, { duration: .6, at: .1 }],
            ['.katalog-main-filter-list-toggle-btn', { opacity: 1 }, { duration: .4, at: .6 }],
            ['.katalog-main-cate-list .katalog-main-cate-item', { transform: "none", opacity: 1 }, { duration: .5, delay: stagger(.05), at: .2 }],
        ]

        const splitTitles = []
        document.querySelectorAll('.katalog-main-filter-list-dropdown .katalog-main-filter-item').forEach((item, idx) => {
            const label = new SplitType(item.querySelector('.katalog-main-filter-item-txt'), { types: 'lines, words', lineClass: 'split-line' })
            animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            sequence.push(
                [label.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .2 + .04 * idx }],
            )
            splitTitles.push(label)
        })
        if (window.innerWidth > 767) {
            sequence.push(
                ['.katalog-main-filter-list-pdf', { opacity: 1 }, { duration: .6, at: .6 }]
            )
        } else {
            sequence.push(
                ['.katalog-main-filter-list-pdf', { opacity: 1 }, { duration: .6, at: .1 }]
            )
        }

        inView(".katalog-main", () => {
            timeline(sequence).finished.then(() => {
                splitTitles.forEach(item => item.revert())
                document.querySelector('.katalog-main-line-top').removeAttribute('style')
                document.querySelector('.katalog-main-line-bot').removeAttribute('style')
                document.querySelector('.katalog-main-line-left').removeAttribute('style')
                document.querySelector('.katalog-main-line-right').removeAttribute('style')
                document.querySelector('.katalog-main-list-line').removeAttribute('style')
                document.querySelector('.katalog-main-filter-list-pdf').removeAttribute('style')
                document.querySelector('.katalog-main-filter-list-toggle-btn').removeAttribute('style')
                document.querySelector('.katalog-main-filter .line-bot').removeAttribute('style')
                document.querySelectorAll('.katalog-main-cate-list .katalog-main-cate-item').forEach(item => item.removeAttribute('style'))
            })
        })
    }, [])
    return (
        <section className="katalog-main">
            <div className="container grid">
                <div className="katalog-main-filter">
                    <div className="line line-top katalog-main-line-top"></div>
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
                            <div className="katalog-main-filter-list-pdf-wrap">
                                <a href="" className="btn katalog-main-filter-list-pdf" data-cursor="hide">
                                    <div className="line line-ver line-left"></div>
                                    <div className="txt txt-20 txt-med katalog-main-filter-list-pdf-txt">Download Catalog</div>
                                </a>
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
