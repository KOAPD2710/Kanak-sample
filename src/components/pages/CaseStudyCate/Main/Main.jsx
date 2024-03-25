import './Main.scss';
import { useEffect, useState, useRef } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function CaseItem({ ...props }) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current

        const label = new SplitType(item.querySelector('.case-list-item-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector('.case-list-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const readMore = new SplitType(item.querySelector('.case-list-item-link-txt'), { types: 'lines, words', lineClass: 'split-line' })

        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(readMore.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.case-list-item-img-inner'), { opacity: 0, transform: 'scale(.4)', transformOrigin: "left bottom" }, { duration: 0 })
        animate(item.querySelector('.case-list-item-link-ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const itemSequence = [
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: 1.2, at: .2 }],
            [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1.2, at: .2 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: 1, delay: stagger(.05), at: "<" }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: "-.6" }],
            [item.querySelector('.case-list-item-img-inner'), { opacity: 1, transform: 'none' }, { duration: .6, at: 1 }],
            [readMore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: "-.4" }],
            [item.querySelector('.case-list-item-link-ic svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: "-.4" }]
        ]
        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                label.revert()
                title.revert()
                readMore.revert()
                item.querySelector('.line-bot').removeAttribute('style')
                item.querySelector('.line-ver').removeAttribute('style')
                item.querySelector('.case-list-item-img-inner').removeAttribute('style')
                item.querySelector('.case-list-item-link-ic svg').removeAttribute('style')
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
        </a>
    )
}
function CaseMain({ ...props }) {
    const allItem = props.list.filter((item) => item.data.category == props.currentCate)

    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        animate('.case-list-line', {scaleX: 0, transformOrigin: "left"}, {duration: 0})

        const sequence = [
            ['.case-list-line', {scaleX: 1}, {duration: 1}]
        ]

        inView('.case-list', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.case-list-line').removeAttribute('style')
            })
        })

        // Button Anim
        const btnTxt = new SplitType('.case-list-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })

        animate('.case-list-load', {opacity: 0}, {duration: 0})
        animate(btnTxt.words, {opacity: 0, transform: "translateY(100%)"}, {duration: 0})

        const btnSequence = [
            ['.case-list-load', {opacity: 1}, {duration: 1, at: 0}],
            [btnTxt.words, {opacity: 1, transform: "none"}, {duration: .4, delay: stagger(0.03), at: "-.6"}],
        ]

        inView('.case-list-load', () => {
            timeline(btnSequence).finished.then(() => {
                btnTxt.revert()
                document.querySelector('.case-list-load').removeAttribute('style')
            })
        })
        // End Button Anim
    }, [])

    return (
        <section className="case-main">
            <div className="case-list">
                <div className="container">
                    <div className="line line-bot case-list-line"></div>
                    <div className={`case-list-inner ${limit >= itemList.length && 'all-loaded'}`}>
                        {itemList.map((item, idx) => (
                            idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} /> : ''
                        ))}
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