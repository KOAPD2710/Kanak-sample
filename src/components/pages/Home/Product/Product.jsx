import { useRef } from 'react';
import './Product.scss';
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import HomeProductThree from './ProductThree.jsx';
import useDevice from '@hooks/useDevice.js';
import useDebounceCallback from '@hooks/useDebounce';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

function HomeProduct(props) {
    const sectionRef = useRef();
    const index = useStore(productIndex);
    const { isDesktop, isTablet, isMobile } = useDevice();
    const debounceHover = useDebounceCallback(productIndex.set, 200);
    function onClickNavPrev(e) {
        e.preventDefault();
        productIndex.set(index - 1);
    }
    function onClickNavNext(e) {
        e.preventDefault();
        productIndex.set(index + 1);
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top+=55%',
            }
        })

        sectionRef.current.querySelectorAll('.home-prod-main-item').forEach((item, idx) => {
            tl
                .from(item.querySelector('.home-prod-main-item-title'), { autoAlpha: 0, x: -10, duration: 1.2, ease: "power4", delay: idx * .15 }, 0)
                .from(item.querySelector('.home-prod-main-item-label'), { autoAlpha: 0, x: -10, duration: 1.2, ease: "power4", delay: idx * .2 }, 0)
                .from(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left', autoAlpha: 0, duration: .6, ease: 'power4.out', delay: idx * .15 }, 0);
        })
        tl.from(sectionRef.current.querySelector('.line.line-bottom'), { scaleX: 0, transformOrigin: 'left', autoAlpha: 0, duration: .6, ease: 'power4.out', delay: props.list.length * .15 }, 0);


        gsap.set('.home-prod-cards-middle', { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" })
        tl
            .to('.home-prod-cards-middle', { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: 'expo.out', overwrite: true }, .2)
            .from('.home-prod-cards-top', { autoAlpha: 0, yPercent: 100, duration: 1.2, ease: 'expo.out', overwrite: true }, '>-0.2')
            .from('.home-prod-cards-bottom', { autoAlpha: 0, yPercent: -100, duration: 1.2, ease: 'expo.out', overwrite: true }, '<= 0')
    }, { scope: sectionRef })
    return (
        <section className="home-prod" ref={sectionRef}>
            <div className="container grid">
                {(isDesktop || isTablet) && (
                    <div className="home-prod-main">
                        <div className="home-prod-main-list">
                            {props.list.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`home-prod-main-item${idx == index ? ' active' : ''}`}
                                    onPointerEnter={() => debounceHover(idx)}
                                >
                                    <h3 className="heading h6 txt-up txt-black home-prod-main-item-title">
                                        {item.data.title}
                                    </h3>
                                    <div className="txt txt-20 txt-bold home-prod-main-item-label">
                                        {(idx + 1) < 10 ? '0' + (idx + 1) : idx + 1}
                                    </div>
                                    <div className="line">
                                        <div className="line-inner"></div>
                                    </div>
                                    {idx == props.list.length - 1 && (
                                        <div className="line line-bottom"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="home-prod-cards">
                    <div className="home-prod-cards-inner">
                        <div className="home-prod-cards-top">
                            <div className="heading h6 txt-up txt-black home-prod-cards-top-txt">
                                Product Kategories
                            </div>
                            <div className="home-prod-cards-nav">
                                <button className={`home-prod-cards-nav-item prev${index == 0 ? ' disable':''}`} onClick={onClickNavPrev}>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                                <button className={`home-prod-cards-nav-item next${index == props.list.length - 1 ? ' disable':''}`} onClick={onClickNavNext}>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="home-prod-cards-middle">
                            <div className="home-prod-cards-middle-inner">
                                <HomeProductThree list={props.list} />
                            </div>
                        </div>
                        <div className="home-prod-cards-bottom">
                            <div className="home-prod-cards-bottom-txt-wrap">
                                {props.list.map((item, idx) => (
                                    <div className={`heading h5 txt-up txt-black home-prod-cards-bottom-txt${idx == index ? ' active' : ''}`} key={idx}>
                                        {item.data.title}
                                    </div>
                                ))}
                            </div>
                            <div className="home-prod-cards-qr-wrap">
                                {props.list.map((_, idx) => (
                                    <div className={`home-prod-cards-qr${idx == index ? ' active' : ''}`} key={idx}>
                                        {props.sampleQR}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isMobile && (
                        <div className='home-prod-cards-pagination'>
                            {props.list.map((_, idx) => (
                                <button className={`home-prod-cards-pagination-dot${idx == index ? ' active' : ''}`}key={idx}>
                                    <span></span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="home-prod-pdf">
                    <a href="#" className="home-prod-pdf-link">
                        <div className="home-prod-pdf-link-ic">
                            {props.PDFIcon}
                        </div>
                        <div className="txt txt-20 txt-med home-prod-pdf-link-txt">
                            Download Catalog
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
export default HomeProduct;