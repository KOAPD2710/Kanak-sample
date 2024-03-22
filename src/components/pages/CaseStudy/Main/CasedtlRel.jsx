import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CasedtlRel({ ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [limit, setLimit] = useState(999);

    let perView = 2;
    let newList = props.list.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % perView === 0) {
            accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
    }, [])
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        disabled: false,
        slides: {
            spacing: 36,
        },
        defaultAnimation: {
            duration: 800
        },
        breakpoints: {
            '(max-width: 767px)': {
                disabled: true
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    useEffect(() => {
        if (!loaded) return
        if (window.innerWidth < 768) {
            setLimit(1)
        }
        const title = new SplitType('.casedtl-rel-title', { types: 'lines, words', lineClass: 'split-line' })

        animate('.casedtl-rel-head .line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.casedtl-rel-head .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.casedtl-rel-nav', { opacity: 0 }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            ['.casedtl-rel-head .line-top', { scaleX: 1 }, { duration: 1.8, at: 0 }],
            ['.casedtl-rel-head .line-bot', { scaleX: 1 }, { duration: 1.65, at: +.2 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.05), at: .4 }],
            ['.casedtl-rel-nav', { opacity: 1 }, { duration: .8, at: 1.2 }],
        ]

        document.querySelectorAll('.casedtl-rel-main-group:first-child .casedtl-rel-main-item').forEach((el, idx) => {
            const titleItem = new SplitType(el.querySelector('.casedtl-rel-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            const readmore = new SplitType(el.querySelector('.casedtl-rel-main-item-link-txt'), { types: 'lines, words, chars', lineClass: 'split-line' })

            animate(titleItem.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(readmore.chars, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(el.querySelector('.casedtl-rel-main-item-link svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

            if (idx == 0) {
                animate(el.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            }

            sequence.push(
                [el.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1.2, at: .8 }],
                [titleItem.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.04), at: 1.1 }],
                [readmore.chars, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.012), at: 1.45 }],
                [el.querySelector('.casedtl-rel-main-item-link svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: "-.2" }]
            )
        })

        inView('.casedtl-rel', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                document.querySelector('.casedtl-rel-head .line-top').removeAttribute('style')
                document.querySelector('.casedtl-rel-head .line-bot').removeAttribute('style')
            })
        })

    }, [loaded])
    return (
        <div className="casedtl-rel">
            <div className="casedtl-rel-head">
                <h3 className="heading h4 txt-up txt-black casedtl-rel-title">
                    Other case studies
                </h3>
                {loaded && instanceRef && props.list.length > perView && (
                    <div className="casedtl-rel-nav">
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}
                            disabled={instanceRef.current.track.details.rel === 0}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}
                            disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                )}
                <div className="line line-top"></div>
                <div className="line line-bot"></div>
            </div>
            <div className="casedtl-rel-main">
                <div className={`keen-slider casedtl-rel-main-inner bg-light ${limit >= newList.length ? 'all-loaded' : ''}`} ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) =>
                        idx < limit && (
                            <div className='keen-slider__slide casedtl-rel-main-group' key={idx}>
                                {chunk.map((item) => (
                                    <a href={`/kase-studies/${item.uid}`} className={`casedtl-rel-main-item ${props.list.length < perView ? 'single' : ''}`} key={`${idx}-${item.id}`}>
                                        <h4 className="heading h5 txt-up txt-black casedtl-rel-main-item-title">
                                            {item.data.title[0].text}
                                        </h4>
                                        <div className="casedtl-rel-main-item-link-wrapper">
                                            <div className="casedtl-rel-main-item-img">
                                                <div className="casedtl-rel-main-item-img-inner">
                                                    <img className='img img-h' src={item.data.images[0].image_item.url} alt='' width={item.data.images[0].image_item.dimensions.width} height={item.data.images[0].image_item.dimensions.height} />
                                                </div>
                                            </div>
                                            <div className="casedtl-rel-main-item-link">
                                                <div className="txt txt-18 txt-bold casedtl-rel-main-item-link-txt">
                                                    Read more
                                                </div>
                                                <div className="ic ic-16">
                                                    {props.icArrowExt}
                                                </div>
                                            </div>
                                            <div className="line line-ver"></div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )
                    )}
                </div>
                <button className={`casedtl-rel-load-btn ${limit >= newList.length ? 'hidden' : ''}`} onClick={(e) => setLimit(limit + 1)}>
                    <div className="casedtl-rel-load-btn-ic">
                        <div className="ic ic-16">
                            {props.icArrowDown}
                        </div>
                    </div>
                    <div className="txt txt-16 txt-med casedtl-rel-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div>
    )
}
export default CasedtlRel