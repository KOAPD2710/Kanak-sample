import './Value.scss';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import useDevice from "@hooks/useDevice";
import * as ut from '@/js/utils.js';
import SplitType from 'split-type';

function HomeValue(props) {
    const { isDesktop, isMobile } = useDevice();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        if (isMobile) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-val-stick',
                start: 'bottom bottom',
                endTrigger: '.home-val',
                end: `bottom-=${isDesktop ? window.innerHeight : '0'} bottom`,
                scrub: true,
            },
            defaults: {
                ease: 'linear',
            }
        })
        let allItems = ut.dom('.home-val-main-item');
        let totalDis = 0;
        allItems.forEach(el => totalDis += el.clientWidth)
        let disWrap = ut.dom('.home-val-main-inner').clientWidth
        let offset = disWrap - allItems[allItems.length - 1].clientWidth
        let dis1 = allItems[0].clientWidth - (offset / 2);
        let dis2 = totalDis - disWrap
        tl
        .to([allItems[1], allItems[2]], {x: -dis1})
        .to([...allItems[1].childNodes].filter(child => !child.classList.contains('line')), {x: -ut.parseRem(25)}, '<=0')
        .to(allItems[2], {x: -dis2})
        .to([...allItems[2].childNodes].filter(child => !child.classList.contains('line')), {x: -ut.parseRem(25)}, '<=0')

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-val-arr',
                start: `top-=${isDesktop ? '200' : '100vh' } bottom`,
                end: 'bottom bottom+=5%',
                scrub: true
            },
            defaults: {
                ease: 'linear'
            }
        })

        tl2
        .from('.home-val-arr-inner', {scale: .2, transformOrigin: 'center top' })

        const tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-val-title-wrap',
                start: `top-=${window.innerHeight * (isDesktop ? .5 : 1)} bottom`,
                end: 'bottom bottom',
                scrub: true,
            },
            defaults: {
                ease: 'linear'
            }
        })
        requestAnimationFrame(() => {
            tl3
            .from('.home-val-title-wrap', {scale: .5, y: -1 * (window.innerHeight * .5), transformOrigin: 'center top' })
        })

        let mainTitle = new SplitType('.home-val-title', { types: 'lines, words', lineClass: 'split-line' })
        let itemNumber = new SplitType('.home-val-main-item-num', { types: 'lines, words', lineClass: 'split-line' })
        let itemTitle = new SplitType('.home-val-main-item-title', { types: 'lines, words', lineClass: 'split-line' })
        let itemSub = new SplitType('.home-val-main-item-sub', { types: 'lines, words', lineClass: 'split-line' })
        let itemLink = new SplitType('.home-val-main-item-link', { types: 'lines, chars', lineClass: 'split-line' })

        gsap
            .from(mainTitle.words, {
                scrollTrigger: { trigger: '.home-val-stick', start: `top-=${window.innerHeight * (isDesktop ? .6 : 1)} top`, once: true },
                yPercent: 100, stagger: .05, duration: 1, ease: 'power4.out', onComplete: () => mainTitle.revert() })

        gsap
            .timeline({ scrollTrigger: { trigger: '.home-val-main', start: 'top top+=50%', once: true } })
            .from('.line.line-top', { scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'expo.inOut', clearProps: 'all' })
            .from(itemNumber.words, { yPercent: 100, stagger: .01, duration: .8, delay: (idx) => idx * 0.01, ease: 'power2.out', onComplete: () => itemNumber.revert() }, '>=-1.2')
            .from('.home-val-main-item-ic', { autoAlpha: 0, scale: .9, duration: 3, delay: (idx) => idx * 0.01, ease: 'expo.inOut', clearProps: 'all' }, '>=-0.5')
            .from(itemTitle.words, { yPercent: 100, stagger: .01, duration: .8, delay: (idx) => idx * 0.01, ease: 'power2.out', onComplete: () => itemTitle.revert() }, '<=0.2')
            .from(itemSub.words, { yPercent: 100, stagger: .01, duration: .8, delay: (idx) => idx * 0.01, ease: 'power2.out', onComplete: () => itemSub.revert() }, '>=-0.6')
            .from(itemLink.chars, { yPercent: 100, duration: 1.2, stagger: .005, delay: (idx) => idx * 0.01, ease: 'power2.out', onComplete: () => itemLink.revert() }, '>=-1')
            .from('.line.line-left', { scaleY: 0, transformOrigin: 'top', duration: 2, ease: 'expo.inOut', clearProps: 'all' }, .4)

    }, { dependencies: [isDesktop, isMobile] })

    return (
        <>
            <div className="home-val-wrap">
                <div className="home-val-arr">
                    <div className="home-val-arr-inner">
                        <svg width="1728" height="1325" viewBox="0 0 1728 1325" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="svgmask1">
                                <path fillRule="evenodd" mask="url(#svgmask1)" clipRule="evenodd" d="M1033 210.787L864.558 0L696.114 210.787H797.029C789.32 480.211 619.781 1012 0 1012V1325H862.635H865.365H1728V1012C1108.22 1012 938.68 480.211 930.971 210.787H1033Z" fill="white"/>
                            </mask>
                            <g clipPath="url(#clip0_1002_23544)" mask="url(#svgmask1)">
                                <rect width="100%" height="100%" fill="var(--cl-bg-dark)" className="bg-dark"/>
                                <rect width="1728" height="1325" fill="url(#pattern0)" fillOpacity="1"/>
                            </g>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="0.16956" height="0.22717">
                                    <use xlinkHref="#image01" transform="scale(0.000289352 0.000377358)"/>
                                </pattern>
                                <clipPath id="clip0_1002_23544">
                                    <rect width="1728" height="1325" fill="white"/>
                                </clipPath>
                                <image id="image01" width="586" height="602" xlinkHref={props.bgText.src}/>
                            </defs>
                        </svg>
                    </div>
                </div>
                <section className="home-val bg-dark" style={{'--offsetMargin': isDesktop ? '100vh' : '0px'}}>
                    <div className="home-val-stick">
                        <div className="container">
                            <div className="home-val-title-wrap">
                                {/* <p className="heading h3 txt-up txt-black home-val-label">
                                    Elevating your brand
                                </p> */}
                                <h2 className="heading h0 txt-up txt-black home-val-title">
                                    Raise<br />Your Brand to <br /><span className="txt txt-180">Eco-Excellence</span>
                                </h2>
                            </div>
                        </div>
                        <div className="home-val-main">
                            <div className="container">
                                <div className="home-val-main-wrap">
                                    <div className="line line-top"></div>
                                    <div className="home-val-main-inner">
                                        <div className="home-val-main-item bg-dark">
                                            <div className="home-val-main-item-head">
                                                <div className="heading txt-up txt-black home-val-main-item-num">
                                                    1.
                                                </div>
                                                <div className="home-val-main-item-ic">
                                                    {props.icNetwork}
                                                </div>
                                            </div>
                                            <div className="home-val-main-item-body">
                                                <h3 className="heading h1 txt-up txt-black home-val-main-item-title">
                                                    Seamless, Responsive Distribution Network
                                                </h3>
                                                <p className="txt txt-18 txt-med home-val-main-item-sub">
                                                    Our strategically located warehouses ensure swift response to fluctuating demands, keeping your supply chain robust and reliable.
                                                </p>
                                                <a href="#" className="txt txt-18 txt-med txt-orange home-val-main-item-link">
                                                    Learn more
                                                </a>
                                            </div>
                                        </div>
                                        <div className="home-val-main-item bg-dark">
                                            <div className="home-val-main-item-head">
                                                <div className="heading txt-up txt-black home-val-main-item-num">
                                                    2.
                                                </div>
                                                <div className="home-val-main-item-ic">
                                                    {props.icTree}
                                                </div>
                                            </div>
                                            <div className="home-val-main-item-body">
                                                <h3 className="heading h1 txt-up txt-black home-val-main-item-title">
                                                    Leading the Way in Carbon-Conscious Practices
                                                </h3>
                                                <p className="txt txt-18 txt-med home-val-main-item-sub">
                                                    Leveraging the largest sugarcane network and recycled ocean plastics, we make all packaging from sustainable materials resulting in reduced marine waste, which contributes to a healthier planet by reducing marine waste, perfect for brands looking to make a positive environmental impact.
                                                </p>
                                                <a href="#" className="txt txt-18 txt-med txt-orange home-val-main-item-link">
                                                    Learn more
                                                </a>
                                            </div>
                                            <div className="line line-left"></div>
                                        </div>
                                        <div className="home-val-main-item bg-dark">
                                            <div className="home-val-main-item-head">
                                                <div className="heading txt-up txt-black home-val-main-item-num">
                                                    3.
                                                </div>
                                                <div className="home-val-main-item-ic">
                                                    {props.icAward}
                                                </div>
                                            </div>
                                            <div className="home-val-main-item-body">
                                                <h3 className="heading h1 txt-up txt-black home-val-main-item-title">
                                                    Award-Winning Excellence
                                                </h3>
                                                <p className="txt txt-18 txt-med home-val-main-item-sub">
                                                    Our Sustainables® 9” Octi-Square Plate has clinched the PLMA 2022 Best Plate Award in the Home & Household category, standing out among thousands with its innovative, eco-friendly design.
                                                </p>
                                                <a href="#" className="txt txt-18 txt-med txt-orange home-val-main-item-link">
                                                    Learn more
                                                </a>
                                            </div>
                                            <div className="line line-left"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    )
}
export default HomeValue;