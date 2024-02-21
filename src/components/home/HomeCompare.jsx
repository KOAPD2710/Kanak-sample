import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react'

import comparePlates from '../../assets/compare.png';
import compareDotDash from '../../assets/compare-dot-dash.svg';
import '../../styles/reactStyle/HomeCompare.scss';

function HomeCompareReact({ ...props }) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-comp',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                snap: [0, .25, .5, .75],
                onUpdate: (self) => {
                    let prog = self.progress;
                    let idx;
                    if (prog >= .75) {idx = 3
                    } else if (prog >= .5) {idx = 2
                    } else if (prog >= .25) {idx = 1
                    } else {idx = 0}
                }
            },
            defaults: {
                ease: 'linear'
            }
        })
        console.log('first')
        tl
        .to('.home-comp-main-prog-line', {'--prog': 100, duration: 1})
    })
    return (
        <>
            <section className="home-comp" >
                <div className="home-comp-stick">
                    <div className="container">
                        <div className="home-comp-title-wrap">
                            <h2 className="heading txt-up txt-black home-comp-title">
                                <span className="h3">{props.label}</span><br/>
                                <span className="h0">{props.title}</span>
                            </h2>
                        </div>
                        <div className="home-comp-main grid">
                            <div className="home-comp-main-item">
                                Item
                            </div>
                            <div className="home-comp-main-prog">
                                <div className="home-comp-main-prog-inner">
                                    <div className="home-comp-main-prog-plates">
                                        <img src={comparePlates.src} alt="Compare plates" className="img" />
                                    </div>
                                    <div className="home-comp-main-prog-dot">
                                        <img src={compareDotDash.src} alt="" className="img" />
                                    </div>
                                    <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
                                        <svg width="100%" viewBox="0 0 672 672" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="336" cy="336" r="315" stroke="var(--cl-green)" strokeWidth="12" strokeDasharray="var(--arcL)" strokeDashoffset="var(--arcOffset)" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="home-comp-main-item">
                                Item
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeCompareReact;


