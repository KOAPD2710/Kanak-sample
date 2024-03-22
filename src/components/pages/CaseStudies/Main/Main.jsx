import { useEffect, useMemo, useState, useRef } from 'react';
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

import './Main.scss';

function CaseItem({ ...props }) {
    const itemRef = useRef();

    useEffect(() => {
        const label = new SplitType(itemRef.current.querySelector('.case-list-item-label'), { types: 'lines, words, chars', lineClass: 'split-line' })
        const title = new SplitType(itemRef.current.querySelector('.case-list-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const readmore = new SplitType(itemRef.current.querySelector('.case-list-item-link-txt'), { types: 'lines, words, chars', lineClass: 'split-line' })

        animate(itemRef.current.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(itemRef.current.querySelector('.line-ver'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(label.chars, { opacity: 0 }, { duration: 0 })
        animate(title.words, { opacity: 0 }, { duration: 0 })
        animate(readmore.chars, { opacity: 0 }, { duration: 0 })
        animate(itemRef.current.querySelector('.case-list-item-img-inner'), { opacity: 0, transform: 'scale(.4)', transformOrigin: "left bottom" }, { duration: 0 })
        animate(itemRef.current.querySelector('.case-list-item-link-ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const itemSequence = [
            [itemRef.current.querySelector('.line-bot'), { scaleX: 1 }, { duration: 1.2 }],
            [itemRef.current.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1.2, at: 0 }],
            [label.chars, { opacity: 1 }, { duration: .6, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1 }, { duration: 1, delay: stagger(.04), at: .6 }],
            [itemRef.current.querySelector('.case-list-item-img-inner'), { opacity: 1, transform: 'none' }, { duration: .6, at: 1 }],
            [readmore.chars, { opacity: 1 }, { duration: .6, delay: stagger(.04), at: 1.2 }],
            [itemRef.current.querySelector('.case-list-item-link-ic svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: 1.4 }]
        ]
        inView(itemRef.current, () => {
            timeline(itemSequence).finished.then(() => {
                label.revert()
                title.revert()
                readmore.revert()
                itemRef.current.classList.add("anim-done")
            })
        }, { margin: "-15% 0px -15% 0px" })
    }, [])

    return (
        <a href={`/kase-studies/${props.uid}`} className="case-list-item" ref={itemRef}>
            <p className="txt txt-20 txt-bold case-list-item-label">
                {props.data.category}
            </p>
            <h2 className="heading h3 txt-up txt-black case-list-item-title">
                {props.data.title[0].text}
            </h2>
            <div className="case-list-item-bot">
                <div className="case-list-item-img">
                    <div className="case-list-item-img-inner">
                        <img className='img img-h' src={props.data.images[0].image_item.url} alt='' width={props.data.images[0].image_item.dimensions.width} height={props.data.images[0].image_item.dimensions.height} />
                    </div>
                </div>
                <div className="case-list-item-link">
                    <div className="txt txt-18 txt-bold case-list-item-link-txt">Read more</div>
                    <div className="ic ic-16 case-list-item-link-ic">
                        {props.icArrowExt}
                    </div>
                </div>
            </div>
            <div className="line line-bot"></div>
            <div className="line line-ver"></div>
            {/* {props.lineTop && (
                <div className="line line-top"></div>
            )} */}
        </a>
    )
}
function FilterItem({ ...props }) {
    return (
        <button className={`case-filter-item ${props.isActive ? 'active' : ''}`} onClick={props.onClick} data-filter={props.name}>
            <div className="txt txt-20 txt-bold case-filter-item-txt">
                {props.name}
            </div>
            <div className="txt txt-12 txt-medium case-filter-item-count">
                [{props.count}]
            </div>
            <div className="line"></div>
        </button>
    )
}

function renderCases() {

}
function CaseMain({ ...props }) {
    const { list: allItem } = props;
    const [layout, setLayout] = useState('grid');
    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);
    const [categoryToggle, setCategoryToggle] = useState(false)
    const toggleRef = useRef();

    useOutsideAlerter(toggleRef, () => { setCategoryToggle(false) })

    const renderFilter = useMemo(() => {
        return (
            <>
                <FilterItem name={'All'}
                    count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e); setCategoryToggle(false) }}
                />
                {props.cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter((item) => item.data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e); setCategoryToggle(false) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])

    const renderCases = useMemo(() => (
        itemList.map((item, idx) => (
            idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} lineTop={idx < 2} /> : ''
        ))
    ), [itemList, limit])

    function filterList(e) {
        let type = e.target.dataset.filter;
        setFilter(type)
    }
    useEffect(() => {
        if (filter == 'All') {
            setItemList(allItem)
        } else {
            let filterList = allItem.filter((item) => item.data.category == filter)
            setItemList(filterList)
        }
    }, [filter])

    useEffect(() => {
        // Animation Filter
        let delayMb = 0
        if (window.innerWidth < 768) {
            delayMb = 1;
        }
        const toggle = new SplitType('.case-filter-list-toggle-txt', { types: 'lines, words, chars', lineClass: 'split-line' })

        animate('.case-filter .line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.case-filter-view', { opacity: 0 }, { duration: 0 })
        animate(toggle.chars, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.case-filter-list-toggle .ic img', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate('.case-filter .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.case-filter .line-top', { scaleX: 1 }, { duration: 2, at: delayMb + 0 }],
            ['.case-filter .line-bot', { scaleX: 1 }, { duration: 1.8, at: delayMb + .2 }],
            ['.case-filter-view', { opacity: 1 }, { duration: .8, at: delayMb + 1.7 }],
            [toggle.chars, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.017), at: delayMb + 1 }],
            ['.case-filter-list-toggle .ic img', { opacity: 1, transform: "none" }, { duration: .5, at: delayMb + 1.3 }],
        ]

        let listItem = []
        document.querySelectorAll('.case-filter-list-dropdown .case-filter-item').forEach((item, idx) => {
            const txt = new SplitType(item.querySelectorAll('.case-filter-item-txt'), { types: 'lines, words', lineClass: 'split-line' })

            animate(txt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelectorAll('.case-filter-item-count'), { opacity: 0, transform: "translateY(50%)" }, { duration: 0 })

            sequence.push(
                [txt.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.01), at: .5 + .1 * idx }],
                [item.querySelectorAll('.case-filter-item-count'), { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.015), at: .7 + .1 * idx }]
            )
            listItem.push(txt)
        })

        inView('.case-filter', () => {
            timeline(sequence).finished.then(() => {
                listItem.map((split, idx) => {
                    split.revert()
                })
                toggle.revert()
            })
        }, window.innerWidth > 767 ? { margin: "-30% 0px -30% 0px" } : { margin: "-20% 0px -20% 0px" })
        // End Animation Filter
    }, [])

    return (
        <section className="case-main">
            <div className="case-filter">
                <div className="container">
                    <div className="line line-top"></div>
                    <div className="case-filter-inner">
                        <div className="case-filter-list" ref={toggleRef}>
                            <button className="case-filter-list-toggle" onClick={(e) => { setCategoryToggle(!categoryToggle) }}>
                                <div className="txt txt-18 txt-bold case-filter-list-toggle-txt">
                                    {filter == 'All' ? 'Categories' : filter}
                                </div>
                                <div className={`ic ic-20 case-filter-list-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                                    {props.icDropdown}
                                </div>
                            </button>
                            <div className={`case-filter-list-dropdown ${categoryToggle ? 'active' : ''}`}>
                                {renderFilter}
                            </div>
                        </div>
                        <div className="case-filter-view">
                            <button className={`case-filter-view-item ${layout == 'list' && 'active'}`} onClick={() => setLayout('list')}>
                                <div className="ic ic-16">
                                    {props.icViewList}
                                </div>
                            </button>
                            <button className={`case-filter-view-item ${layout == 'grid' && 'active'}`} onClick={() => setLayout('grid')}>
                                <div className="ic ic-16">
                                    {props.icViewGrid}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="line line-bot"></div>
                </div>
            </div>
            <div className="case-list">
                <div className="container">
                    <div className={`case-list-inner ${layout == 'list' ? 'layout-list' : ''} ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                        {renderCases}
                    </div>
                    <div className={`case-list-load ${limit >= itemList.length ? 'hidden' : ''}`}>
                        <button className="case-list-load-btn" onClick={() => setLimit(limit + 4)}>
                            <div className="case-list-load-btn-ic">
                                <div className="ic ic-24">
                                    {props.icArrowDown}
                                </div>
                            </div>
                            <div className="txt txt-20 txt-med case-list-load-btn-txt">
                                Load more
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CaseMain