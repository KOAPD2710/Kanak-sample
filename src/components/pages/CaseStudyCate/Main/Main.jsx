import './Main.scss';
import CaseItem from '../../CaseStudies/CaseItem/CaseItem';
import { useEffect, useState, useRef } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function CaseMain({ ...props }) {
    const allItem = props.list.filter((item) => item.data.category == props.currentCate)

    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        animate('.case-list-line', {scaleX: 0, transformOrigin: "left"}, {duration: 0})
        inView('.case-list', () => {
            animate('.case-list-line', {scaleX: 1}, {duration: 1}).finished.then(() => {
                document.querySelector('.case-list-line').removeAttribute('style')
            })
        })

        // Button Anim
        const btnTxt = new SplitType('.case-list-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })
        animate('.case-list-load', {opacity: 0}, {duration: 0})
        animate('.case-list-load .ic svg', { opacity: 0, transform: 'translateY(-40%) scale(.8)' }, { duration: 0 })
        animate(btnTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        animate('.case-list-load', {opacity: 0}, {duration: 0})
        animate(btnTxt.words, {opacity: 0, transform: "translateY(100%)"}, {duration: 0})

        const btnSequence = [
            ['.case-list-load', { opacity: 1}, { duration: .6, at: 0 }],
            ['.case-list-load .ic svg', { opacity: 1, transform: "none" }, { duration: .8, at: 0 }],
            [btnTxt.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(0.06), at: .2 }],
        ]

        inView('.case-list-load', () => {
            timeline(btnSequence).finished.then(() => {
                document.querySelector('.case-list-load').removeAttribute('style')
                document.querySelector('.case-list-load .ic svg').removeAttribute('style')
                btnTxt.revert()
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