import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

function CasedtlRel({ ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    let perView = 2;
    let newList = props.list.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % perView === 0) {
            accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
    }, [])
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        defaultAnimation: {
            duration: 800
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    console.log(newList);
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
                <div className="keen-slider casedtl-rel-main-inner bg-light" ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) => {
                        return (
                            <div key={idx} className='keen-slider__slide casedtl-rel-main-group'>
                                {chunk.map((item) => (
                                    <a href={`/kase-studies/${item.uid}`} className={`casedtl-rel-main-item${props.list.length < perView ? ' single' : ''}`} key={`${idx}-${item.id}`}>
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
                    })}
                </div>
                <button className="casedtl-rel-load-btn">
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