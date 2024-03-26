import { useEffect, useState, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

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

    let thumbItem = useRef()
    useEffect(() => {
        const thumb = thumbItem.current
        let thumbReq;
        function thumbMove() {
            let cursorX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-left'))
            let cursorY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-top'))
            let curX = thumb.getBoundingClientRect().left
            let curY = thumb.getBoundingClientRect().top
            let wrapTop = document.querySelector(".kustomer-commit-main-wrapper").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kustomer-commit-main-wrapper").getBoundingClientRect().left

            let targetX = 0
            let targetY = 0
            if (document.querySelector('.kustomer-commit-main:hover')) {
                targetX = lerp(curX, cursorX - wrapLeft, .1)
                targetY = lerp(curY, cursorY - wrapTop, .1)
            }
            // thumb.style.transform = `translate(100px, ${targetY}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }
        thumbReq = requestAnimationFrame(thumbMove)

        return () => {
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
                <div className="kustomer-commit-main-thumb-wrapper" ref={thumbItem}>
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
