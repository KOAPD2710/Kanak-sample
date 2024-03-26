import { convertDate } from "@utils/text.js"
import { useEffect, useRef } from "react";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";


function PopItem({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const category = new SplitType(item.querySelector('.resource-main-pop-list-item-cate'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector('.resource-main-pop-list-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const date = new SplitType(item.querySelector('.resource-main-pop-list-item-date'), { types: 'lines, words', lineClass: 'split-line' })

        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(category.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(date.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const itemSequence = [
            [item.querySelector('.line'), { scaleX: 1 }, { duration: 1, at: props.idx * .2 }],
            [category.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.05), at: "-.8" }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.01), at: "-.6  " }],
            [date.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: "-.6" }],
        ]

        if (props.idx % 2 == 0) {
            animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            itemSequence.push(
                [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1, at: .8 }],
            )
        }
        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                category.revert()
                title.revert()
                date.revert()
                item.querySelector('.line').removeAttribute('style')
                if (props.idx % 2 == 0) {
                    item.querySelector('.line-ver').removeAttribute('style')
                }
            })
        })
    })
    return (
        <div className="resource-main-pop-list-item" ref={itemRef}>
            <a href={`/insights/${props.data.category.toLowerCase().replace(" ", "-")}`} className="txt txt-20 txt-bold resource-main-pop-list-item-cate" data-cursor="txtLink">
                {props.data.category}
            </a>
            <a href={`/insights/${props.uid}`} className="resource-main-pop-list-item-content-wrap" data-cursor="ext">
                <h3 className="heading h5 txt-black txt-up resource-main-pop-list-item-title">
                    {props.data.title}
                </h3>
                <span className='txt txt-18 txt-med resource-main-pop-list-item-date'>{convertDate(props.last_publication_date)}</span>
            </a>
            <div className="line"></div>
            {props.idx % 2 == 0 && <div className="line line-ver"></div>}
        </div>
    )
}

function ResourceMainPopular(props) {
    useEffect(() => {
        const heading = new SplitType('.resource-main-pop-title', { types: 'lines, words', lineClass: 'split-line' })
        animate(heading.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.resource-main-pop-line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        const sequence = [
            [heading.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.05), at: .4 }],
            ['.resource-main-pop-line', { scaleX: 1 }, { duration: 1, at: 0 }],
        ]

        inView('.resource-main-pop', () => {
            timeline(sequence).finished.then(() => {
                heading.revert()
            })
        })
    }, [])

    return (
        <div className="resource-main-pop">
            <h3 className="heading h4 txt-black txt-up resource-main-pop-title">Popular news</h3>
            <div className="line resource-main-pop-line"></div>
            <div className="resource-main-pop-list">
                {props.data.map((item, idx) => <PopItem {...item} idx={idx} key={idx} />)}
            </div>
        </div>
    )
}
export default ResourceMainPopular