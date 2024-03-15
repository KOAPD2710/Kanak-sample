import { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

function ResDtlRel({ ...props }) {
    // const [loaded, setLoaded] = useState(false);
    // const [currentSlide, setCurrentSlide] = useState(0);
    // let perView = 2;
    // let newList = props.list.reduce((accumulator, currentValue, currentIndex, array) => {
    //     if (currentIndex % perView === 0) {
    //         accumulator.push(array.slice(currentIndex, currentIndex + 2));
    //     }
    //     return accumulator;
    // }, [])
    // const [sliderRef, instanceRef] = useKeenSlider({
    //     initial: 0,
    //     defaultAnimation: {
    //         duration: 800
    //     },
    //     slideChanged(slider) {
    //         setCurrentSlide(slider.track.details.rel)
    //     },
    //     created() {
    //         setLoaded(true)
    //     },
    // })
    props.list.map((item, idx) => {
        console.log(item);
    })
    return (
        <div className="resource-dtl-rel">
            <div className="resource-dtl-rel-head">
                <h3 className="heading h4 txt-black txt-up resource-dtl-rel-head-title">related articles</h3>
                <div className="resource-dtl-rel-head-nav">
                    {/* {loaded && instanceRef && props.list.length > perView && (
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
                    )} */}
                    <div className="casedtl-rel-nav">
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}>
                            {/* disabled={instanceRef.current.track.details.rel === 0} */}
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}>
                            {/* disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx} */}
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="resource-dtl-rel-main">
                <div className="resource-dtl-rel-main-inner">
                    {/* ref={sliderRef} style={{ '--perView': perView }} */}
                    {props.list.map((item, idx) => {
                        <div className="resource-dtl-rel-main-inner-item" key={idx} >
                            <div className="resource-dtl-rel-main-inner-item-img">
                                <img src={item.imageUrl} alt="" />
                            </div>
                            <div className="resource-dtl-rel-main-inner-item-content"></div>
                        </div>
                    })}
                </div>
            </div>
        </div >
    )
}

export default ResDtlRel