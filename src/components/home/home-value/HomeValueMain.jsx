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
                end: 'bottom bottom',
                scrub: .3
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
    }, [])
    return (
        <div className="home-val bg-dark">
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
                                            {props.itemIcon}
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
                                            {props.itemIcon}
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
                                            {props.itemIcon}
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
        </div>
    )
}
export default HomeValueMain;