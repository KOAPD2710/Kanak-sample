import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect, useState, useCallback, Fragment, useRef } from 'react';
import useSelector from '@/components/hooks/useSelector';
import useDevice from '@/components/hooks/useDevice';
import { register } from 'swiper/element/bundle';
import './Compare.scss';

register();

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
    const [q, ref] = useSelector(null);
    const swiperElRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [itemCompareHeight, setItemCompareHeight] = useState(0);
    const { isDesktop, isTablet, isMobile } = useDevice();

    const swiperOpts = {
        slidesPerView: 1,
        pagination: true
    };

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
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                snap: [0, .2, .4, .6, .8, 1],
                onUpdate: (self) => {
                    let progress = self.progress;
                    onUpdateProgress(progress);
                }
            }
        })
        tl
            .to('.home-comp-main-prog-line', { '--prog': 100, duration: 1, ease: 'linear' })
    }, { scope: ref });

    useEffect(() => {
        if (isTablet) {
            let heightHeader = document.querySelector('.header') && document.querySelector('.header').offsetHeight;
            let heightCompItem = q('.home-comp-main-item') && q('.home-comp-main-item').offsetHeight;
            setItemCompareHeight((heightHeader + heightCompItem) / 10);
        }
    }, [ref, isTablet])

    useEffect(() => {
        // swiperElRef.current.addEventListener('swiperprogress', (e) => {
        //     const [swiper, progress] = e.detail;
        //     console.log(progress);
        // });

        // swiperElRef.current.addEventListener('swiperslidechange', (e) => {
        //     console.log('slide changed');
        // });
    }, []);
    return (
        <section className="home-comp" ref={ref}>
            <div className="home-comp-stick bg-light">
                <div className="container">
                    <div className="home-comp-title-wrap">
                        <h2 className="h0 heading txt-up txt-black home-comp-title">
                            {props.title}
                        </h2>
                    </div>
                    {isMobile ? (
                        <div className='home-comp-main'>
                            <swiper-container
                                ref={swiperElRef}
                                {...swiperOpts}
                            >
                                {props.list.map(({ data }, idx) => (
                                    <swiper-slide key={idx}>
                                        <div className='home-comp-main-slide'>
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
                                    </swiper-slide>
                                ))}
                            </swiper-container>
                        </div>
                    ) : (
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
                                <div className="home-comp-main-prog-inner" style={{ '--content-height': `${itemCompareHeight}rem` }}>
                                    <div className="home-comp-main-prog-plates">
                                        {props.imgComparePlates}
                                    </div>
                                    <div className="home-comp-main-prog-dot">
                                        {props.imgCompareDotDash}
                                    </div>
                                    <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
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
                    )}
                </div>
            </div>
        </section>
    )
}
export default HomeCompare;


