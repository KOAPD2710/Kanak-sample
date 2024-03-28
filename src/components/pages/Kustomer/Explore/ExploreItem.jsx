import ExploreInner from "./ExploreInner";

import { useEffect, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ExploreItem({ title, label, list, ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const label = new SplitType(item.querySelector(".kustomer-explore-main-item-main-label"), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector(".kustomer-explore-main-item-main-title"), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-list-line'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-main-img img'), { opacity: 0, scale: .8, transformOrigin: 'right bottom' }, { duration: 0 })


        const sequence = [
            [item.querySelector('.kustomer-explore-main-item-line'), { scaleX: 1 }, { duration: .8, at: 0 }],
            [item.querySelector('.kustomer-explore-main-item-list-line'), { scaleY: 1 }, { duration: .6, at: .23 }],
            [label.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .2 }],
            [item.querySelector('.kustomer-explore-main-item-main-img img'), { opacity: 1, scale: 1 }, { duration: .6, at: .4 }],
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
                item.querySelector('.kustomer-explore-main-item-line').removeAttribute('style')
                item.querySelector('.kustomer-explore-main-item-list-line').removeAttribute('style')
                item.querySelector('.kustomer-explore-main-item-main-img img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])

    return (
        <div className="kustomer-explore-main-item" ref={itemRef}>
            <div className="line kustomer-explore-main-item-line"></div>
            <a href="" className="kustomer-explore-main-item-main" data-cursor="ext">
                <div className="heading h5 txt-black txt-up kustomer-explore-main-item-main-label">{label}</div>
                <h2 className="heading h1 txt-black txt-up kustomer-explore-main-item-main-title">{title}</h2>
                <div className="kustomer-explore-main-item-main-img">
                    {props.img}
                </div>
            </a>
            <div className="kustomer-explore-main-item-list">
                <div className="line line-ver kustomer-explore-main-item-list-line"></div>
                {list.map((item, idx) =>
                    <ExploreInner list={item} key={idx} />
                )}
            </div>
        </div>
    )
}


export default ExploreItem