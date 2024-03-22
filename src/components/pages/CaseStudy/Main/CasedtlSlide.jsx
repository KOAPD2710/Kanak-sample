import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

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
        let asdas = document.querySelectorAll('.casedtl-slide .line').length
        console.log(asdas);
    }, [])
    return (
        <div className="casedtl-slide">
            <div className="line line-ver casedtl-slide-line-ver"></div>
            <div className="casedtl-slide-stick">
                <div className="line"></div>
                <div className="casedtl-slide-main">
                    <div className="keen-slider casedtl-slide-main-inner" ref={sliderRef}>
                        {props.data.images.map((item, idx) => (
                            <div className="keen-slider__slide casedtl-slide-main-inner-item" key={idx}>
                                <img src={item.image_item.url} alt="" className="img img-fill" />
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
                                        <div className="ic ic-40">
                                            {props.arrIcon}
                                        </div>
                                    </button>
                                    <button className="casedtl-slide-main-nav-item casedtl-slide-main-nav-item-next"
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
                </div>
            </div>
        </div>
    )
}

export default CasedtlSlide