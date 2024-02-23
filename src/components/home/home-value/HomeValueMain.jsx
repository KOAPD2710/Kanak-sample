import { useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import * as ut from '../../../js/utils.js';
import './HomeValueMain.scss';

function HomeValueMain({...props}) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-val-stick',
                start: 'bottom bottom',
                endTrigger: '.home-val',
                end: `bottom-=${window.innerHeight} bottom`,
                scrub: .3,
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
                start: 'top-=200 bottom',
                end: 'bottom bottom',
                scrub: true,
            },
            defaults: {
                ease: 'linear'
            }
        })
        requestAnimationFrame(() => {
            tl2
            .from('.home-val-arr-inner', {scale: .2, transformOrigin: 'center top' })
            // .from('.home-val-title-wrap', {yPercent: -20, scale: .5, transformOrigin: 'center top'}, 0)
        })
    }, [])
    return (
        <>
            <div className="home-val-wrap">
                <div className="home-val-arr">
                    <div className="home-val-arr-inner">
                        <svg width="1728" height="1325" viewBox="0 0 1728 1325" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="svgmask1">
                                <path fill-rule="evenodd" mask="url(#svgmask1)" clip-rule="evenodd" d="M1033 210.787L864.558 0L696.114 210.787H797.029C789.32 480.211 619.781 1012 0 1012V1325H862.635H865.365H1728V1012C1108.22 1012 938.68 480.211 930.971 210.787H1033Z" fill="white"/>
                            </mask>
                            <g clip-path="url(#clip0_1002_23544)">
                                <rect width="100%" height="100%" fill="var(--cl-bg-dark)" mask="url(#svgmask1)" className="bg-dark"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1002_23544">
                            <rect width="1728" height="1325" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
                <section className="home-val bg-dark" style={{'--offsetMargin': '100vh'}}>
                    <div className="home-val-stick">
                        <div className="container">
                            <div className="home-val-title-wrap">
                                <p className="heading h3 txt-up txt-black home-val-label">
                                    Elevating your brand
                                </p>
                                <h2 className="heading h0 txt-up txt-black home-val-title">
                                    Sustainable Packaging Tailored for Your Success
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
                                                    Leading the Way in Eco-Friendly Practices
                                                </h3>
                                                <p className="txt txt-18 txt-med home-val-main-item-sub">
                                                    Leveraging the world's largest bamboo and sugarcane grower network, we ensure a continuous supply of sustainable materials. Our commitment extends to using recycled marine-grade plastics for a healthier planet.
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
export default HomeValueMain;