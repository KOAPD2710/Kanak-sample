import './Compare.scss';
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState, Fragment } from 'react';

function HomeCompareMobile(props) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: false,
        mode: "snap",
        rtl: false,
        breakpoints: {
            "(min-width: 477px)": {
                slides: { perView: 1.5 },
            }
        },
        slides: {
            perView: "auto"
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <section className="home-comp mb-ver">
            <div className="home-comp-stick bg-light">
                <div className="container">
                    <div className="home-comp-title-wrap">
                        <h2 className="h0 heading txt-up txt-black home-comp-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className='home-comp-main'>
                        <div className='keen-slider home-comp-main-slide' ref={sliderRef}>
                            {props.list.map(({ data }, idx) => (
                                <Fragment key={idx}>
                                    <div className='keen-slider__slide home-comp-main-slide-item'>
                                        <div className='home-comp-main-slide-title'>
                                            <h3 className='heading h5 txt-up txt-black'>{data.title}</h3>
                                        </div>
                                        <div className='home-comp-main-slide-list'>
                                            <div className='home-comp-main-slide-detail'>
                                                <div className='home-comp-main-slide-detail-ic'>
                                                    {props.imgCompareGood}
                                                </div>
                                                <h4 className='heading h6 txt-up txt-black home-comp-main-slide-detail-title'>Kanak<br />Naturals Dinnerware</h4>
                                                <div className='txt txt-16 home-comp-main-slide-detail-content'>{data.kanak}</div>
                                            </div>
                                            <div className='home-comp-main-slide-detail'>
                                                <div className='home-comp-main-slide-detail-ic'>
                                                    {props.imgCompareBad}
                                                </div>
                                                <h4 className='heading h6 txt-up txt-black home-comp-main-slide-detail-title'>Traditional<br />Styrofoam Plate</h4>
                                                <div className='txt txt-16 home-comp-main-slide-detail-content'>{data.other}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <div className='home-comp-main-slide-pagination'>
                            {loaded && instanceRef.current && (
                                <div className="dots">
                                {[
                                    ...Array(instanceRef.current.track.details.slides.length).keys(),
                                ].map((idx) => {
                                    return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                        ><span></span>
                                    </button>
                                    )
                                })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCompareMobile;