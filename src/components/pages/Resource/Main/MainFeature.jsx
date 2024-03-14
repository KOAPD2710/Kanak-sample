import { useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";

function ResourceMainFeature({ ...props }) {

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

    return (
        <div className="resource-main-fea">
            <div className="resource-main-fea-main">
                <div className="keen-slider resource-main-fea-main-inner" ref={sliderRef}>
                    {props.feaList.map((item, idx) => (
                        <a href="#" className="keen-slider__slide resource-main-fea-main-inner-item" key={idx}>
                            <div className="resource-main-fea-main-inner-item-img">
                                {props.featureImg}
                                {/* <img src={item.image.src} alt={item.image.alt} /> */}
                            </div>
                            <div className="resource-main-fea-main-inner-item-cate">
                                <div className='ic ic-20'>
                                    {props.folderIcon}
                                </div>
                                <div className="txt txt-20 txt-black resource-main-fea-main-inner-item-cate-txt">
                                    {item.category}
                                </div>
                            </div>
                            <h2 className='heading h4 txt-black txt-up resource-main-fea-main-inner-item-title'>
                                {item.title}
                            </h2>
                            <span className='txt txt-18 txt-med resource-main-fea-main-inner-item-date'>{item.date}</span>
                        </a>
                    ))}
                </div>
                <div className="resource-main-fea-main-control">
                    <div className="line"></div>
                    <div className="resource-main-fea-main-pagi">
                        {loaded && instanceRef && (
                            props.feaList.map((item, idx) => (
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
            </div>
        </div>
    )
}
export default ResourceMainFeature