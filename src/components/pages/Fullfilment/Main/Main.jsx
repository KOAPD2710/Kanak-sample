import './Main.scss'

import { useEffect, useState, useRef } from 'react'
import useDebounceCallback from "@hooks/useDebounce";

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function Item({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current
        const title = new SplitType(item.querySelector('.fullfil-main-content-item-head-title'), { types: "lines,words", lineClass: 'split-line' })
        const sub = new SplitType(item.querySelectorAll('.fullfil-main-content-item-sub p'), { types: "lines,words", lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        const itemSequence = [
            [item.querySelector('.line'), { scaleX: 1 }, { duration: .6, at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.02), at: 0.05 }],
            [sub.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.0025), at: .25 }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                title.revert()
                sub.revert()
                item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
            })
        }, { margin: '-20% 0px -20% 0px' })
    }, [])

    return (
        <a href='#' className={`fullfil-main-content-item ${props.isActive ? 'active' : ''}`} onMouseEnter={props.mouseEnter} ref={itemRef}>
            <div className="line line-top"></div>
            <div className="fullfil-main-content-item-head">
                <div className="heading h3 txt-black txt-up fullfil-main-content-item-head-title">National Reach, <br />Local Touch</div>
                <div className="dot"></div>
            </div>
            <div className="txt txt-18 txt-med fullfil-main-content-item-sub">
                <p>Exciting things are on the horizon with our UK facility, set to serve you with products crafted from 88% recycled, food-grade plastic. The reach? Global. The impact? Monumental.</p>
                <br />
                <p>We want you to feel empowered with every order placed and product used. With Kanak Naturals', you're not just investing in a service, you're partnering with a powerhouse that uplifts, supports, and evolves with you.</p>
            </div>
        </a>
    )
}
function FullfilMain({ ...props }) {
    const [idxActive, setIdxActive] = useState(0);
    const debounceHover = useDebounceCallback(setIdxActive, 200);

    useEffect(() => {
        // Anim Img
        animate('.fullfil-main-img', { opacity: 0, transform: "translateY(6rem)" }, { duration: 0 })

        const imgSquence = [
            ['.fullfil-main-img', { opacity: 1, transform: "none" }, { duration: .6, at: 0 }],
        ]

        inView('.fullfil-main-img', () => {
            timeline(imgSquence).finished.then(() => {
                document.querySelector('.fullfil-main-img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })

        // Anima List
        const title = new SplitType(".fullfil-main-content-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.fullfil-main-thumb', { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })

        const listSequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            ['.fullfil-main-thumb', { opacity: 1, transform: "none" }, { duration: .6, at: .2 }],
        ]
        inView('.fullfil-main-content', () => {
            timeline(listSequence).finished.then(() => {
                title.revert()
                document.querySelector('.fullfil-main-thumb').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
        console.log(props);
    }, [])
    return (
        <section className="fullfil-main">
            <div className="fullfil-main-img">
                <div className="line"></div>
                <div className="fullfil-main-img-inner">
                    <img src={props.img.url} alt={props.img.alt} width={props.img.dimensions.width} className='img img-h' />
                </div>
            </div>
            <div className="container grid">
                <div className="line fullfil-main-content-line"></div>
                <div className="fullfil-main-content">
                    <div className="heading h1 txt-black txt-up fullfil-main-content-title">{props.title}</div>
                    <div className="fullfil-main-content-list">
                        {[...Array(10)].map((el, idx) => (
                            <Item
                                key={idx}
                                isActive={idxActive == idx}
                                mouseEnter={(e) => debounceHover(idx)}>
                            </Item>
                        ))}
                    </div>
                </div>

                <div className="fullfil-main-thumb">
                    <div className="fullfil-main-thumb-sticky">
                        {[...Array(10)].map((el, idx) => (
                            <div className={`fullfil-main-thumb-inner ${idxActive === idx ? "active" : ''}`} key={idx}>
                                {props.thumb}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}


export default FullfilMain
