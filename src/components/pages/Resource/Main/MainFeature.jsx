import { useState } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";

function ResourceMainFeature(props) {

    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [opacities, setOpacities] = useState([])

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
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

    return (
        <div className="resource-main-fea">
            <div className="resource-main-fea-main">
                <div className="keen-slider resource-main-fea-main-inner" ref={sliderRef}>
                    {props.data.map((item, idx) => (
                        <a href="#" className="keen-slider__slide resource-main-fea-main-inner-item" key={item.uid} style={{ opacity: opacities[idx] }}>
                            <div className="resource-main-fea-main-inner-item-img">
                                <img
                                    className='img img-fill'
                                    src={item.data.feature_image.url}
                                    alt={item.data.feature_image.alt}
                                    width={item.data.feature_image.dimensions.width}
                                    height={item.data.feature_image.dimensions.height}/>
                            </div>
                            <div className="resource-main-fea-main-inner-item-content">
                                <div className="resource-main-fea-main-inner-item-cate">
                                    <div className='ic ic-20'>
                                        {props.folderIcon}
                                    </div>
                                    <div className="txt txt-20 txt-black resource-main-fea-main-inner-item-cate-txt">
                                        {item.data.category}
                                    </div>
                                </div>
                                <h2 className='heading h4 txt-black txt-up resource-main-fea-main-inner-item-title'>
                                    {item.data.title}
                                </h2>
                                <span className='txt txt-18 txt-med resource-main-fea-main-inner-item-date'>{item.last_publication_date}</span>
                            </div>
                        </a>
                    ))}
                </div>
                {/* <div className="resource-main-fea-main-control">
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
                </div> */}
                <div className="line line-ver"></div>
                <div className="line resource-main-fea-main-line-bot"></div>
            </div>
        </div>
    )
}
export default ResourceMainFeature