import { useEffect, useState, useRef, useMemo } from "react"
import { getAllByType } from "@/prismic"
import "./Sustainable.scss"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function SustainableItem(props) {
    const itemRef = useRef()
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const item = itemRef.current

        const name = new SplitType(item.querySelector('.kustomer-sus-main-table-item-info-name'), { types: "lines,words", lineClass: 'split-line' })
        if (animationStarted) {
            timeline().cancel();
            name.revert();
            item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
            item.querySelector('.kustomer-sus-main-table-item-img').removeAttribute('style');
            item.querySelector('.kustomer-sus-main-table-item-info-qr-inner').removeAttribute('style');
        }

        animate(item.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-mid'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-qr'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(name.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.kustomer-sus-main-table-item-info-qr-inner'), { opacity: 0, scale: .9 }, { duration: 0 })
        animate(item.querySelector('.kustomer-sus-main-table-item-img'), { opacity: 0, scale: .9 }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
            [item.querySelector('.kustomer-sus-main-table-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
            [item.querySelector('.line-mid'), { scaleX: 1 }, { duration: .4, at: .35 }],
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .45, at: .5 }],
            [item.querySelector('.line-right'), { scaleY: 1 }, { duration: .5, at: .6 }],
            [item.querySelector('.line-qr'), { scaleY: 1 }, { duration: .4, at: .6 }],
            [name.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .5 }],
            [item.querySelector('.kustomer-sus-main-table-item-info-qr-inner'), { opacity: 1, scale: 1 }, { duration: .6, at: .45 }]
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                setAnimationStarted(false);
                setTimeout(() => {
                    name.revert();
                    item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
                    item.querySelector('.kustomer-sus-main-table-item-img').removeAttribute('style');
                    item.querySelector('.kustomer-sus-main-table-item-info-qr-inner').removeAttribute('style');
                }, 1000)
            })
        })
    }, [props.filter])
    return (
        <a href="#" className="kustomer-sus-main-table-item" ref={itemRef}>
            <div className="kustomer-sus-main-table-item-img">
                <img src={props.data.thumbnail.url} alt={props.data.thumbnail.alt} width={props.data.thumbnail.dimensions.width} className="img" />
            </div>
            <div className="kustomer-sus-main-table-item-info">
                <div className="line line-mid"></div>
                <h4 className="heading h6 txt-black txt-up kustomer-sus-main-table-item-info-name">
                    {props.data.title}
                </h4>
                <div className="kustomer-sus-main-table-item-info-qr">
                    <div className="line line-ver line-qr"></div>
                    <div className="kustomer-sus-main-table-item-info-qr-inner">
                        <img src={props.data.qr.url} alt={props.data.qr.alt} width={props.data.qr.dimensions.width} />
                    </div>
                </div>
            </div>
            <div className="line line-ver line-left"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
        </a>
    )
}

function KustomerSustain(props) {
    const allItem = props.productList
    const [filter, setFilter] = useState(0);

    const renderList = useMemo(() => {
        let list = props.cateList[filter].list.map((uid) => allItem.filter((item) => item.uid == uid)[0]);
        return (
            list.map((item, idx) => (
                <SustainableItem {...item} img={props.img} qr={props.qr} key={idx} filter={filter} />
            ))
        )
    }, [filter]);

    useEffect(() => {
        const subtitle = new SplitType('.kustomer-sus-head-sub', { types: "lines,words", lineClass: 'split-line' })

        animate('.kustomer-sus-head-img', { opacity: 0, transform: "translateY(30%) scale(.9)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.kustomer-sus-main-line-top', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(".kustomer-sus-main-cate-list-item", { opacity: 0, transform: "translateX(20px)" }, { duration: 0 })

        const sequence = [
            ['.kustomer-sus-head-img', { opacity: 1, transform: "none" }, { duration: .6, at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.0085), at: .15 }],
            ['.kustomer-sus-main-line-top', { scaleX: 1 }, { duration: .6, at: .2 }],
            [".kustomer-sus-main-cate-list-item", { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.05), at: .2 }]
        ]

        inView('.kustomer-sus', () => {
            timeline(sequence).finished.then(() => {
                subtitle.revert();
                document.querySelector('.kustomer-sus-head-img').removeAttribute('style');
                document.querySelector('.kustomer-sus-main-line-top').removeAttribute('style');
                document.querySelector('.kustomer-sus-main-cate-list-item').removeAttribute('style');
            })
        })
    }, [])

    return (
        <section className="kustomer-sus">
            <div className="container grid">
                <div className="kustomer-sus-head">
                    <div className="kustomer-sus-head-img">
                        {props.sustainable}
                    </div>
                    <span className="heading h6 txt-black txt-up kustomer-sus-head-sub">
                        {props.subtitle}
                    </span>
                </div>
                <div className="kustomer-sus-main">
                    <div className="line kustomer-sus-main-line-top"></div>
                    <div className="kustomer-sus-main-cate">
                        <ul className="kustomer-sus-main-cate-list">
                            {props.cateList.map((el, idx) => (
                                <li className="kustomer-sus-main-cate-list-item" key={idx}>
                                    <button className={`kustomer-sus-main-cate-list-item-inner ${filter == idx ? 'active' : ''}`}
                                        data-cursor="txtLink"
                                        data-cursor-txtlink="child"
                                        onClick={() => setFilter(idx)}>
                                        <div className="dot"></div>
                                        <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-list-item-txt" data-cursor-txtlink-child="true">{el.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="kustomer-sus-main-table">
                        {renderList}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerSustain
