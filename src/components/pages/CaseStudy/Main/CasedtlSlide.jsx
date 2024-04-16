import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

import { animate, timeline, stagger, inView } from "motion";

function CasedtlSlide({ ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    useEffect(() => {
        if (!loaded) return
        animate('.casedtl-slide-line-ver', { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate('.casedtl-slide-stick-line, .casedtl-slide-main-control > .line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate('.casedtl-slide-main', { opacity: 0 }, { duration: 0 })
        animate('.casedtl-slide-main-pagi-item', { opacity: 0, scale: .6 }, { duration: 0 })
        animate('.casedtl-slide-main-nav-item .line-ver', { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

        const sequence = [
            ['.casedtl-slide .casedtl-slide-line-ver', { scaleY: 1 }, { duration: 1, at: 0 }],
            ['.casedtl-slide-stick-line', { scaleX: 1 }, { duration: .8, at: .2 }],
            ['.casedtl-slide-main', { opacity: 1 }, { duration: .8, at: .2 }],
            ['.casedtl-slide-main-control > .line', { scaleX: 1 }, { duration: .6, at: .3 }],
            ['.casedtl-slide-main-pagi-item', { opacity: 1, scale: 1 }, { duration: .4, delay: stagger(.06), at: .3 }],
            ['.casedtl-slide-main-nav-item .line-ver', { scaleY: 1 }, { duration: .5, delay: stagger(.1), at: .4 }]
        ]
        inView('.casedtl-slide', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.casedtl-slide-line-ver').removeAttribute('style')
                document.querySelector('.casedtl-slide-stick-line').removeAttribute('style')
                document.querySelector('.casedtl-slide-main').removeAttribute('style')
                document.querySelector('.casedtl-slide-main-control > .line').removeAttribute('style')
                document.querySelectorAll('.casedtl-slide-main-pagi-item').forEach((el) => {
                    el.removeAttribute('style')
                })
                document.querySelectorAll('.casedtl-slide-main-nav-item .line-ver').forEach((el) => {
                    el.removeAttribute('style')
                })
            })
        })
    }, [loaded])
    return (
        <div className="casedtl-slide">
            <div className="line line-ver casedtl-slide-line-ver"></div>
            <div className="casedtl-slide-stick">
                <div className="line casedtl-slide-stick-line"></div>
                <div className="casedtl-slide-main">
                    <div className="keen-slider casedtl-slide-main-inner" ref={sliderRef}>
                        {props.data.images.map((item, idx) => (
                            <div className="keen-slider__slide casedtl-slide-main-inner-item" key={idx}>
                                <img src={item.image_item?.url} alt="" className="img img-fill" />
                            </div>
                        ))}
                    </div>
                    <div className="casedtl-slide-main-control">
                        <div className="line"></div>
                        <div className="casedtl-slide-main-pagi">
                            {loaded && instanceRef && (
                                props.data.images.map((item, idx) => (
                                    <button className={"casedtl-slide-main-pagi-item" + (currentSlide === idx ? " active" : "")} key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}>
                                    </button>
                                ))
                            )}
                        </div>
                        <div className="casedtl-slide-main-nav">
                            {loaded && instanceRef && (
                                <>
                                    <button className="casedtl-slide-main-nav-item casedtl-slide-main-nav-item-prev"
                                        onClick={() => { instanceRef.current.prev() }}
                                        disabled={instanceRef.current.track.details.rel === 0}>
                                        <div className="line line-ver"></div>
                                        <div className="ic ic-40">
                                            {props.arrIcon}
                                        </div>
                                    </button>
                                    <button className="casedtl-slide-main-nav-item casedtl-slide-main-nav-item-next"
                                        onClick={() => { instanceRef.current.next() }}
                                        disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                                        <div className="line line-ver"></div>
                                        <div className="ic ic-40">
                                            {props.arrIcon}
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CasedtlSlide