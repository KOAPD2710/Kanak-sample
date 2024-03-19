import './Compare.scss';
import "keen-slider/keen-slider.min.css"
import SplitType from 'split-type';
import { animate, timeline, stagger, inView, scroll } from "motion"
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
    useEffect(() => {
        const title = new SplitType('.home-comp.mb-ver .home-comp-title', { types: 'lines, words', lineClass: 'split-line' });
        animate(title.words, {transform: 'translateY(100%)', opacity: 0}, {duration: 0})
        animate('.home-comp-main-slide-pagination .dot', {opacity: 0}, {duration: 0})
        inView('.home-comp.mb-ver .home-comp-title', () => {
            animate(title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)})
        }, { margin: "-20% 0px -20% 0px" })
        inView('.home-comp-main-slide-pagination', () => {
            animate('.home-comp-main-slide-pagination .dot', {opacity: 1}, {duration: .8, delay: stagger(.05)})
        }, { margin: "-10% 0px -10% 0px" })
        
        let allItems = document.querySelectorAll('.home-comp-main-slide-item')
        allItems.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.home-comp-main-slide-title .heading'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSubTitle = new SplitType(el.querySelectorAll('.home-comp-main-slide-detail-title'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelectorAll('.home-comp-main-slide-detail-content'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelectorAll('.home-comp-main-slide-detail-ic'), {opacity: 0, scale: 0.8}, {duration: 0})
            animate([...itemTitle.words,...itemSubTitle.words, ...itemSub.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            const sequence = [
                [itemTitle.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.01)}],
                [itemSubTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.008), at: .1}],
                [itemSub.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.008), at: .2}],
                [el.querySelectorAll('.home-comp-main-slide-detail-ic'), {opacity: 1, scale: 1}, {duration: 1, at: .2}],
            ]
            inView(el, () => {
                timeline(sequence, {delay: idx % 2 == 0 ? 0 : idx * .2}).finished.then(() => {
                    el.querySelectorAll('.home-comp-main-slide-detail-ic').forEach(el => el.removeAttribute('style'))
                    itemTitle.revert()
                    itemSubTitle.revert()
                })
            }, {margin: "-20% -15% -20% -15%"})
        })
    }, [])

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
                                    <div className={`keen-slider__slide home-comp-main-slide-item ${currentSlide == idx ? 'active': ''}`}>
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
                                {[...Array(instanceRef.current.track.details.slides.length).keys(),].map((idx) => {
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