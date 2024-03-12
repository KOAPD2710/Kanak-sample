import './Brand.scss';
import useDevice from '@hooks/useDevice';
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import { useRef, useState } from 'react';
import HomeBrandThree from './BrandThree';
import { brandIndex } from '@contexts/StoreGlobal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function HomeBrand(props) {
    const { isDesktop, isMobile } = useDevice();
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: false,
        mode: "snap",
        rtl: false,
        slides: {
            perView: "auto",
            spacing: 36,
        },
        slideChanged(slider) {
            brandIndex.set(slider.track.details.rel)
        },
    })

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        let title = new SplitType('.home-brand-title [name="title"]', { types: 'lines, words', lineClass: 'split-line' })
        gsap
            .timeline({ trigger: sectionRef.current, start: 'top top' })
            .from(title.words, { yPercent: 100, duration: 1, stagger: .05, ease: 'expo.out', onComplete: () => title.revert() })
            .from('.line.line-ver', { scaleY: 0, transformOrigin: 'top', duration: 1.5, ease: 'expo.inOut', clearProps: 'all' }, '>-.8')
            .from('.line.line-bot', { scaleX: 0, duration: 1.2, ease: 'expo.inOut', clearProps: 'all' }, '>-0.55')

        sectionRef.current.querySelectorAll('.home-brand-main-item').forEach((item) => {
            gsap.set(item, { autoAlpha: 0 });
            ScrollTrigger.create({
                trigger: item,
                start: `top top+=82%`,
                once: true,
                onEnter: () => {
                    let itemTitle = new SplitType(item.querySelector('.home-brand-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
                    let itemSub = new SplitType(item.querySelector('.home-brand-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })

                    gsap
                        .timeline()
                        .to(item, { autoAlpha: 1, duration: .5, ease: 'power2.out' })
                        .from(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.inOut', clearProps: 'all' }, '>-0.1')
                        .from(item.querySelector('.home-brand-main-item-ic [name="arrIconDesk"]'), { x: -15, autoAlpha: 0, duration: 1.5, ease: 'expo.out', clearProps: 'all' }, '>-1')
                        .from(itemTitle.chars, { yPercent: 100, stagger: .01, duration: .8, ease: 'power2.out', onComplete: () => itemTitle.revert() }, '>-1.2')
                        .from(itemSub.words, { yPercent: 100, stagger: .01, duration: .8, ease: 'power2.out', onComplete: () => itemSub.revert() }, '>-0.6')
                }
            })
        })
    }, { scope: sectionRef })
    return (
        <section className="home-brand" ref={sectionRef}>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black home-brand-title">{props.title}</h2>
                <div className="home-brand-canvas">
                    <div className="home-brand-canvas-inner">
                        <HomeBrandThree list={props.list}/>
                    </div>
                </div>
                <div className="line line-ver"></div>
                <div className="home-brand-main">
                    <h2 className="heading h0 txt-up txt-black home-brand-title">{props.title}</h2>
                    <div className={`home-brand-main-list${isMobile ? ' keen-slider' : ''}`} ref={isMobile ? sliderRef : null}>
                        {props.list.map(({ data }, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className={`home-brand-main-item${isMobile ? ' keen-slider__slide' : ''}`}
                                onPointerOver={() => {brandIndex.set(idx)}}
                            >
                                <div className="home-brand-main-item-head">
                                    <h3 className="heading h4 txt-up txt-black home-brand-main-item-title">
                                        {data.title[0].text}
                                    </h3>
                                    <div className={`ic${isDesktop ? ' ic-20' : ' ic-16'} home-brand-main-item-ic`}>
                                        { isDesktop ? props.arrIconDesk : props.arrIconMob }
                                    </div>
                                </div>
                                <div className="home-brand-main-item-body">
                                    <p className="txt txt-18 txt-med home-brand-main-item-sub">
                                        {data.sub_title}
                                    </p>
                                </div>
                                <div className="line"></div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="line line-bot"></div>
            </div>
        </section>
    )
}
export default HomeBrand;