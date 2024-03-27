import { useEffect, useState, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { parseRem } from "@/js/utils";

function CommitItem({ title, describle, ...props }) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current

        const title = new SplitType(item.querySelector('.kustomer-commit-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const describe = new SplitType(item.querySelector('.kustomer-commit-main-item-des p'), { types: 'lines. words', lineClass: 'split-line' })

        animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate(describe.lines, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const itemSequence = [
            [title.words, { transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [describe.lines, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: "-.2" }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                title.revert()
                // describe.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <div className="kustomer-commit-main-item" {...props} ref={itemRef}>
            <h3 className="heading h4 txt-black txt-up kustomer-commit-main-item-title">{title}</h3>
            <div className="txt txt-18 txt-med kustomer-commit-main-item-des">
                <p>{describle}</p>
            </div>
            <div className="kustomer-commit-main-item-bg"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
    )
}

function KustomerCommitMain({ ...props }) {
    const allItem = props.listItem
    const thumbList = allItem.map(item => ({ tag: item.tag, thumb: item.thumb }));

    const [activeIc, setActiveIc] = useState('')

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    useEffect(() => {
        const thumb = document.querySelector('.kustomer-commit-main-thumb-wrapper')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42

            let cursorX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-left'))
            let cursorY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-top'))
            let wrapTop = document.querySelector(".kustomer-commit-main-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kustomer-commit-main-thumb").getBoundingClientRect().left

            if (document.querySelector('.kustomer-commit-main:hover')) {
                // targetX = cursorX - wrapLeft - thumb.offsetWidth / 2 - document.querySelector(".kustomer-commit-main-thumb").offsetWidth / 2
                // targetY = - thumb.offsetHeight / 2 + (cursorY - wrapTop) / (document.querySelector(".kustomer-commit-main-thumb").offsetHeight) * parseRem(300)
                targetX = - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".kustomer-commit-main-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - thumb.offsetHeight / 2 - document.querySelector(".kustomer-commit-main-thumb").offsetHeight / 2
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        inView('.kustomer-commit-main', () => {
            thumbReq = requestAnimationFrame(thumbMove)
        })

        return () => {
            cancelAnimationFrame(thumbReq)
        }
    }, [])

    return (
        <div className="kustomer-commit-main">
            <div className="kustomer-commit-main-wrapper">
                {allItem.map((item, idx) =>
                    <CommitItem
                        title={item.title}
                        describle={item.describle}
                        key={idx}
                        onMouseEnter={() => { setActiveIc(item.tag) }}
                        onMouseLeave={() => { setActiveIc('') }}
                    />
                )}
            </div>
            <div className="kustomer-commit-main-thumb">
                <div className="kustomer-commit-main-thumb-wrapper">
                    {thumbList.map((thumb, thumbIdx) => (
                        <div className={`kustomer-commit-main-thumb-item ${activeIc == thumb.tag ? 'active' : ''}`} key={thumbIdx}>
                            <img src={thumb.thumb.src} alt="" className="img" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KustomerCommitMain
