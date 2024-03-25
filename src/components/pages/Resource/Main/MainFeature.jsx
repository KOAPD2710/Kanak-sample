import { useEffect, useState, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import { convertDate } from "@utils/text.js"

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";


function FeatItem({ ...props }) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current

        if (props.firstItem) {
            const category = new SplitType(item.querySelector('.resource-main-fea-main-inner-item-cate-txt'), { types: 'lines, words', lineClass: 'split-line' })
            const title = new SplitType(item.querySelector('.resource-main-fea-main-inner-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            const date = new SplitType(item.querySelector('.resource-main-fea-main-inner-item-date'), { types: 'lines, words', lineClass: 'split-line' })

            animate(item.querySelector('.resource-main-fea-main-inner-item-img'), { opacity: 0, scale: .6, transformOrigin: "left bottom" }, { duration: 0 })
            animate(category.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(date.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            const itemSequence = [
                [item.querySelector('.resource-main-fea-main-inner-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: 1 }],
                [category.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.05), at: "-.4" }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.01), at: "-.3" }],
                [date.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: "-.45" }],
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    category.revert()
                    title.revert()
                    date.revert()
                    item.querySelector('.resource-main-fea-main-inner-item-img').removeAttribute('style')
                })
            })
        }
    }, [])

    return (
        <a href={`/resources/${props.uid}`} className="keen-slider__slide resource-main-fea-main-inner-item" ref={itemRef}>
            <div className="resource-main-fea-main-inner-item-img">
                <img
                    className='img img-fill'
                    src={props.image.url}
                    alt={props.image.alt}
                    width={props.image.dimensions.width}
                    height={props.image.dimensions.height} />
            </div>
            <div className="resource-main-fea-main-inner-item-content">
                <div className="resource-main-fea-main-inner-item-cate">
                    <div className="txt txt-20 txt-bold resource-main-fea-main-inner-item-cate-txt">
                        {props.category}
                    </div>
                </div>
                <h2 className='heading h4 txt-black txt-up resource-main-fea-main-inner-item-title'>
                    {props.title}
                </h2>
                <span className='txt txt-18 txt-med resource-main-fea-main-inner-item-date'>{convertDate(props.date)}</span>
            </div>
        </a>
    )
}

function ResourceMainFeature(props) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [opacities, setOpacities] = useState([])

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: {
            spacing: 36,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        // detailsChanged(s) {
        //     const new_opacities = s.track.details.slides.map((slide) => slide.portion)
        //     setOpacities(new_opacities)
        // },
        created() {
            setLoaded(true)
        },
    })

    useEffect(() => {
        if (!loaded) return

        animate('.resource-main-fea .line-ver', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate('.resource-main-fea-main-control .line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.resource-main-fea-main-nav', { opacity: 0 }, { duration: 0 })
        animate('.resource-main-fea-main-line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.resource-main-fea .line-ver', { scaleY: 1 }, { duration: 1, at: .6 }],
            ['.resource-main-fea-main-line-bot', { scaleX: 1 }, { duration: 1, at: .4 }],
            ['.resource-main-fea-main-control .line', { scaleX: 1 }, { duration: 1, at: 2 }],
        ]

        if (window.innerWidth > 991) {
            sequence.push(
                ['.resource-main-fea-main-nav', { opacity: 1 }, { duration: .6, at: "-.2" }],
            )
        } else {
            sequence.push(
                ['.resource-main-fea-main-nav', { opacity: 1 }, { duration: .6, at: "-.8" }],
            )
        }

        document.querySelectorAll('.resource-main-fea-main-pagi .resource-main-fea-main-pagi-item').forEach((el, idx) => {
            animate(el, { opacity: 0 }, { duration: 0 })
            if (idx == 0) {
                sequence.push(
                    [el, { opacity: 1 }, { duration: .3, at: "-.8" }]
                )
            } else {
                sequence.push(
                    [el, { opacity: 1 }, { duration: .3, at: "-.15" }]
                )
            }
        })

        inView('.resource-main-fea', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.resource-main-fea .line-ver').removeAttribute('style')
                document.querySelector('.resource-main-fea-main-control .line').removeAttribute('style')
                document.querySelector('.resource-main-fea-main-nav').removeAttribute('style')
                document.querySelectorAll('.resource-main-fea-main-pagi .resource-main-fea-main-pagi-item').forEach((el, idx) => {
                    el.removeAttribute('style')
                })
            })
        })
    }, [loaded])

    return (
        <div className="resource-main-fea">
            <div className="resource-main-fea-main">
                <div className="keen-slider resource-main-fea-main-inner" ref={sliderRef}>
                    {props.data.map((item, idx) => <FeatItem uid={item.uid} image={item.data.feature_image} category={item.data.category} title={item.data.title} date={item.last_publication_date} key={idx} firstItem={idx == 0 && true} />)}
                </div>
                <div className="resource-main-fea-main-control">
                    <div className="line"></div>
                    <div className="resource-main-fea-main-pagi">
                        {loaded && instanceRef && (
                            props.data.map((item, idx) => (
                                <button className={"resource-main-fea-main-pagi-item" + (currentSlide === idx ? " active" : "")} key={idx}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx)
                                    }}>
                                </button>
                            ))
                        )}
                    </div>
                    <div className="resource-main-fea-main-nav">
                        {loaded && instanceRef && (
                            <>
                                <button className="resource-main-fea-main-nav-item resource-main-fea-main-nav-item-prev"
                                    onClick={() => { instanceRef.current.prev() }}
                                    disabled={instanceRef.current.track.details.rel === 0}>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                                <button className="resource-main-fea-main-nav-item resource-main-fea-main-nav-item-next"
                                    onClick={() => { instanceRef.current.next() }}
                                    disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="line line-ver"></div>
                <div className="line resource-main-fea-main-line-bot"></div>
            </div>
        </div>
    )
}
export default ResourceMainFeature