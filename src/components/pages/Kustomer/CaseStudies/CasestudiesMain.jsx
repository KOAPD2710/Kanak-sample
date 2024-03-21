import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import ArrowUpRight from "@/components/globals/IcArrow/ArrowUpRight"

function CaseStudiesItem({ ...props }) {
    return (
        <a href={`/kase-studies/${props.data.uid}`} className="keen-slider__slide kustomer-kasestu-main-item">
            <div className="txt txt-20 txt-med kustomer-kasestu-main-item-label">{props.data.data.category}</div>
            <h2 className="heading h3 txt-black txt-up kustomer-kasestu-main-item-title">{props.data.data.title[0].text}</h2>
            <div className="kustomer-kasestu-main-item-bot">
                <div className="kustomer-kasestu-main-item-bot-img">
                    <img src={props.data.data.images[0].image_item.url} alt={props.data.data.images[0].image_item.alt} className="img img-fill" />
                </div>
                <div className="txt txt-18 txt-bold kustomer-kasestu-main-item-bot-readmore">Read more
                    <div className="ic ic-20">
                        <ArrowUpRight />
                    </div>
                </div>
            </div>
            <div className="line line-top"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver"></div>
            {props.lastItem === "lastItem" && (
                <div className="line line-ver"></div>
            )}
        </a>
    )
}


function CaseStudiesMain({ ...props }) {
    const allItem = props.list
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        disabled: false,
        slides: {
            perView: 'auto',
        },
        defaultAnimation: {
            duration: 800
        },
        // breakpoints: {
        //     '(max-width: 991px)': {
        //         disabled: true
        //     },
        // },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <div className="kustomer-kasestu-main">
            <div className="keen-slider kustomer-kasestu-main-wrapper" ref={sliderRef} >
                {allItem.map((item, idx) => (
                    <CaseStudiesItem data={item} lastItem={`${(idx == allItem.length - 1) ? 'lastItem' : ''}`} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default CaseStudiesMain