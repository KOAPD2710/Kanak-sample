import { forwardRef, useRef, useEffect } from 'react';
import './Hero.scss'
import * as ut from '@/js/utils.js';
import useDevice from '@hooks/useDevice';
import useWindowSize from '@hooks/useWindowSize';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';

const Badge = forwardRef(function Badge(props, ref) {
    return (
        <div className='home-hero-badge' ref={ref}>
            <div className='home-hero-badge-inside'>
                {props.icBadgeInside}
            </div>
            <div className='home-hero-badge-outside'>
                {props.icBadgeOutside}
            </div>
        </div>
    )
})

function HomeHero(props) {
    const sectionRef = useRef();
    const badgeRef = useRef();
    const badgeCloneRef = useRef();

    const { isMobile } = useDevice();
    const { width, height } = useWindowSize();

    useEffect(() => {
        const elRect = ut.offset(badgeRef.current);
        badgeCloneRef.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            opacity: 0;
            z-index: 999
        `;
    }, [width, height])

    useGSAP(() => {
        const title = new SplitType('.home-hero-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.home-hero-sub-top p', { types: 'lines, words', lineClass: "split-line" });;
        let revert
        let tl = gsap.timeline({
            trigger: sectionRef.current,
            start: 'top top'
        })
        tl
            .from(title.words, { ease: "power4.out", yPercent: 100, duration: 1, stagger: .05,  })
            .from('.home-hero-sub', { ease: "power4.out", autoAlpha: 0, y: 12, duration: 1, clearProps: 'all' }, '>-.5')
            .from(subTitle.words, { ease: "power4.out", yPercent: 100, duration: 1, stagger: .01 }, '>-1')
            .from('.home-hero-sub-btn-wrap .btn', { ease: 'swing', y: 10, autoAlpha: 0, duration: .8, clearProps: 'all' }, '>-0.8')
            .from('.home-hero-sub-cta-wrap .txt', { ease: 'swing', y: 10, autoAlpha: 0, duration: .8, clearProps: 'all' }, '>-0.5')
            .from(badgeCloneRef.current, { ease: "power2.out", autoAlpha: 0, scale: 0.8, rotate: -15, duration: 1.5 }, '>-1.2')
            .from(badgeRef.current, { autoAlpha: 0, clearProps: 'all' });
    }, { scope: sectionRef })

    return (
        <>
            <section className="home-hero" ref={sectionRef}>
                <div className="container grid">
                    <h1 className="heading h0 txt-black txt-up home-hero-title">
                        {props.title}
                    </h1>
                    <div className="grid home-hero-sub">
                        <div className="home-hero-sub-top">
                            <p className="txt txt-16 txt-med">
                                {props.sub_title}
                            </p>
                        </div>
                        <div className="home-hero-sub-btn-wrap">
                            <a href="./" className="btn btn-main">
                                <div className="txt txt-18 txt-med">Kontact us</div>
                            </a>
                        </div>
                        <div className="home-hero-sub-cta-wrap">
                            <div className="txt txt-18 txt-med">Scroll {isMobile ? 'Down' : 'to Explore'}</div>
                        </div>
                    </div>
                    <div className='home-hero-badge-wrap'>
                        <Badge ref={badgeRef} {...props} />
                    </div>
                </div>
            </section>
            <Badge ref={badgeCloneRef} {...props} />
        </>
    )
}
export default HomeHero;