import { useEffect, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ExploreInner({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const title = new SplitType(item.querySelector(".kustomer-explore-main-item-list-inner-title"), { types: 'lines, words', lineClass: 'split-line' })
        const des = new SplitType(item.querySelector(".kustomer-explore-main-item-list-inner-des"), { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(des.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line'), { scaleX: 1 }, { duration: .6, at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.04), at: .1 }],
            [des.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .3 }],
        ]
        inView(item, () => {
            timeline(sequence).finished.then(() => {
                des.revert()
                title.revert()
                item.querySelector('.line').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <div className="keen-slider__slide kustomer-explore-main-item-list-inner" ref={itemRef}>
            <h4 className="heading h5 txt-black txt-up kustomer-explore-main-item-list-inner-title">{props.data.title[0].text}</h4>
            <p className="txt txt-20 txt-med kustomer-explore-main-item-list-inner-des">{props.data.describe}</p>
            <div className="line"></div>
        </div>
    )
}

export default ExploreInner