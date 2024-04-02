import { useEffect, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ServiceItem({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const title = new SplitType(item.querySelector(".kustomer-service-main-item-content-title"), { types: 'lines, words', lineClass: 'split-line' })
        const des = new SplitType(item.querySelector(".kustomer-service-main-item-content-des"), { types: 'lines, words', lineClass: 'split-line' })
        const learmore = new SplitType(item.querySelector(".kustomer-service-main-item-content-link"), { types: 'lines, words, chars', lineClass: 'split-line' })

        animate(item.querySelector('.kustomer-service-main-item-img img'), { opacity: 0, scale: .8, transformOrigin: "left bottom" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(des.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(learmore.chars, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })


        const sequence = [
            [item.querySelector('.kustomer-service-main-item-img img'), { opacity: 1, scale: 1 }, { duration: .7 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [des.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .2 }],
            [item.querySelector('.line'), { scaleX: 1 }, { duration: .55, at: .2 }],
        ]
        inView(item, () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                des.revert()
                item.querySelector('.line').removeAttribute('style')
                item.querySelector('.kustomer-service-main-item-img img').removeAttribute('style')

            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <div className="kustomer-service-main-item" ref={itemRef}>
            <div className="kustomer-service-main-item-img">
                <img src={props.data.image.url} alt={props.data.image.alt} width={props.data.image.dimensions.width} className="img img-fill" />/
            </div>
            <div className="kustomer-service-main-item-content">
                <h3 className="heading h4 txt-black txt-up kustomer-service-main-item-content-title">
                    {props.data.title}
                </h3>
                <div className="kustomer-service-main-item-content-info">
                    <div className="txt txt-18 txt-med kustomer-service-main-item-content-des">
                        {props.data.describle}
                    </div>
                    <a href="#" className="txt txt-18 txt-bold kustomer-service-main-item-content-link">Learn More</a>
                </div>
                <div className="line"></div>
            </div>
        </div>
    )
}

function ServiceMain({ ...props }) {
    const allItem = props.list

    useEffect(() => {
        animate('.kustomer-service-main-line', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        const sequence = [
            ['.kustomer-service-main-line', { scaleY: 1 }, { duration: 2 }],
        ]
        inView(".kustomer-service-main", () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.kustomer-service-main-line').removeAttribute('style')
            })
        })
    }, [])
    return (
        <div className="kustomer-service-main">
            <div className="line line-ver kustomer-service-main-line"></div>
            <div className="kustomer-service-main-inner">
                {allItem.map((item, idx) => (
                    <ServiceItem {...item} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default ServiceMain