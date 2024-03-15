import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

function ResDtlRel({ ...props }) {
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
    return (
        <div className="resource-dtl-rel">
            <div className="resource-dtl-rel-head">
                <h3 className="heading h4 txt-black txt-up resource-dtl-rel-head-title">related articles</h3>
                {loaded && instanceRef && props.list.length > perView && (
                    <div className="resource-dtl-rel-head-nav">
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}
                            disabled={instanceRef.current.track.details.rel === 0}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}
                            disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                )}
            </div>
            <div className="resource-dtl-rel-main">
                <div className="line"></div>
                <div className="keen-slider  resource-dtl-rel-main-inner" ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) => (
                        <div className="keen-slider__slide resource-dtl-rel-main-inner-group" key={idx}>
                            {chunk.map((item, itemIdx) => (
                                <a href={`/resources/${item.uid}`} className="resource-dtl-rel-main-inner-group-item" key={itemIdx} >
                                    <div className="resource-dtl-rel-main-inner-group-item-img">
                                        <img src={item.imageUrl} alt="" className='img img-fill' />
                                    </div>
                                    <div className="resource-dtl-rel-main-inner-group-item-content">
                                        <div className="txt txt-20 txt-bold resource-dtl-rel-main-inner-group-item-content-cate">
                                            {item.category}
                                        </div>
                                        <h3 className='heading h4 txt-black txt-up resource-dtl-rel-main-inner-group-item-content-title'>
                                            {item.title}
                                        </h3>
                                        <p className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-des'>
                                            {item.content}
                                        </p>
                                        <span className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-date'>
                                            {item.date}
                                        </span>
                                        {itemIdx % 2 !== 0 && (
                                            <>
                                                <div className="line line-ver"></div>
                                                <div className="line"></div>
                                            </>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ResDtlRel