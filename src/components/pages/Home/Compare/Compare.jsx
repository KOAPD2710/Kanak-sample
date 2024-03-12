import './Compare.scss';
import "keen-slider/keen-slider.min.css"
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect, useState, useCallback, Fragment, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react'
import useDevice from '@hooks/useDevice';
import useSelector from '@/components/hooks/useSelector';
import SplitType from 'split-type';

const MainItem = ({ data, type, image, title, content, currentIndex }) => {
    return (
        <div className={`home-comp-main-item ${type}`}>
            {image}
            <h3 className={`heading h5 txt-up txt-black home-comp-main-item-title ${type}`}>
                {title}
            </h3>
            <div className="home-comp-main-item-list">
                {data.map(({ data }, idx) => (
                    <p className={`txt txt-20 home-comp-main-item-list-item${idx == currentIndex ? ' active' : ''}`} key={idx}>
                        {data[content]}
                    </p>
                ))}
            </div>
        </div>
    )
}

function HomeCompare(props) {
    const ref = useRef();
    const q = useSelector(ref);
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0)
    const [progressLine, setProgressLine] = useState(0);
    const [itemCompareHeight, setItemCompareHeight] = useState({
        height: 0,
        hasHeader: 0
    });
    const { isDesktop, isTablet, isMobile } = useDevice();
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: false,
        mode: "snap",
        rtl: false,
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

    const onUpdateProgress = useCallback((progress) => {
        const numberOfBreakPoints = props.list.length;
        const step = 1 / numberOfBreakPoints;
        const breakPoints = Array.from({ length: numberOfBreakPoints + 1 }, (_, index) => parseFloat((index * step).toPrecision(2)));
        let idx;

        for (let i = 0; i < breakPoints.length - 1; i++) {
            const startPoint = breakPoints[i];
            const endPoint = breakPoints[i + 1];

            if (progress >= startPoint && progress < endPoint) {
                let idx = Math.floor(progress * 5)
                setIndex(idx);
                break;
            }
        }
    }, [index])

    useGSAP(() => {
        if (isMobile) return;
        gsap.registerPlugin(ScrollTrigger)
        ScrollTrigger.create({
            trigger: ref.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            duration: 1,
            snap: [0, .2, .4, .6, .8, 1],
            onUpdate: (self) => {
                let progress = self.progress;
                onUpdateProgress(progress);
                setProgressLine(progress * 100);
            }
        })

    }, { scope: ref, dependencies: [isMobile] });

    useGSAP(() => {
        const title = new SplitType(q('.home-comp-title'), { types: 'lines, words', lineClass: 'split-line' });
        const titleItem = new SplitType('.home-comp-main-item-title', { types: 'lines, words', lineClass: 'split-line' });
        const subItemGood = new SplitType(q('.home-comp-main-item.good')?.querySelector('.home-comp-main-item-list-item'), { types: 'lines, words', lineClass: 'split-line' });
        const subItemBad = new SplitType(q('.home-comp-main-item.bad')?.querySelector('.home-comp-main-item-list-item'), { types: 'lines, words', lineClass: 'split-line' });
        let tl = gsap.timeline({
            scrollTrigger: { trigger: ref.current, start: 'top top+=20%' }
        })
        tl
            .from(title.words, { yPercent: 100, duration: 1, stagger: .05, ease: 'expo.out', onComplete: () => title.revert() })
            .from('.home-comp-main-item img', { y: 5, autoAlpha: 0, duration: 1, ease: 'power4.out', clearProps: 'all' }, '>=-.5')
            .from(titleItem.words, { yPercent: 100, duration: 1.2, stagger: .05, ease: 'expo.out', onComplete: () => titleItem.revert() }, '<=0')
            .from(subItemGood.words, { yPercent: 100, duration: .8, stagger: .01, ease: 'power2.out', onComplete: () => subItemGood.revert() }, '<=0.1')
            .from(subItemBad.words, { yPercent: 100, duration: .8, stagger: .01, ease: 'power2.out', onComplete: () => subItemBad.revert() }, '<=0')



            .to('.home-comp-main-prog-dot img', { rotate: (idx) => (360/(props.list.length * 14)) * idx, duration: 2, ease: 'expo.inOut' }, 0)
            .to('.home-comp-main-prog-dash img', { rotate: (idx) => (360/props.list.length) * idx,  stagger: .02, duration: 2, ease: 'expo.inOut' }, '<=0')
    }, { scope: ref })

    useEffect(() => {
        const updateHeights = () => {
            if (isTablet) {
                const header = document.querySelector('.header');
                const compItem = document.querySelector('.home-comp-main-item')

                if (header && compItem) {
                    const heightHeader = header.offsetHeight;
                    const heightCompItem = compItem.offsetHeight;
                    setItemCompareHeight({ height: heightCompItem / 10, hasHeader: (heightHeader + heightCompItem) / 10 });
                }
            }
        };

        if (document.readyState === 'complete') {
            requestAnimationFrame(() => {
                updateHeights();
            })
        } else {
            window.addEventListener('load', updateHeights);
        }

        return () => {
            window.removeEventListener('load', updateHeights);
        };
    }, [isTablet, itemCompareHeight]);

    return (
        <section className="home-comp" ref={ref} style={{ '--content-compare-height': `${itemCompareHeight.height}rem` }}>
            <div className="home-comp-stick bg-light">
                <div className="container">
                    <div className="home-comp-title-wrap">
                        <h2 className="h0 heading txt-up txt-black home-comp-title">
                            {props.title}
                        </h2>
                    </div>
                    {(isDesktop || isTablet) ? (
                        <div className="home-comp-main grid">
                            <MainItem
                                data={props.list}
                                image={props.imgCompareGood}
                                title={"Kanak Naturals Dinnerware"}
                                currentIndex={index}
                                content={"kanak"}
                                type={"good"}
                            />
                            <div className="home-comp-main-prog">
                                <div className="home-comp-main-prog-inner" style={{ '--content-height': `${itemCompareHeight.hasHeader}rem` }}>
                                    <div className="home-comp-main-prog-plates">
                                        {props.imgComparePlates}
                                    </div>
                                    <div className="home-comp-main-prog-dot">
                                        {props.imgCompareDot}
                                    </div>
                                    <div className="home-comp-main-prog-dash">
                                        {props.imgCompareDash}
                                    </div>
                                    <div className="home-comp-main-prog-line" style={{'--PI': Math.PI, '--prog': progressLine }}>
                                        {props.plateLine}
                                    </div>
                                    <div className="home-comp-main-prog-list">
                                        {props.list.map(({ data }, idx) => (
                                            <h4 className={`heading h3 txt-up txt-black home-comp-main-prog-list-item${idx == index ? " active" : ""}`} key={idx}>
                                                {data.title}
                                            </h4>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <MainItem
                                data={props.list}
                                image={props.imgCompareBad}
                                title={"Traditional Dinnerware"}
                                currentIndex={index}
                                content={"other"}
                                type={"bad"}
                            />
                        </div>
                    ) : (
                        <div className='home-comp-main' >
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
                    )}
                </div>
            </div>
        </section>
    )
}
export default HomeCompare;


