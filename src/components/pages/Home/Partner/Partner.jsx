import { useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import * as ut from '../../../../js/utils.js';
import './Partner.scss';

function HomePartner({...props}) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const sectionBotOffset = window.innerHeight * 1.9
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-part',
                start: 'top top',
                end: `bottom-=${(sectionBotOffset)} bottom`,
                scrub: true,
            },
            defaults: {
                ease: 'linear',
            }
        })
        let offsetMargin = Math.abs(parseFloat(window.getComputedStyle(document.querySelector('.home-part-line-main')).marginLeft))
        let dis = ut.dom('.home-part-line-wrap').clientWidth - (offsetMargin * 2) - parseFloat(window.getComputedStyle(document.querySelector('.home-part-line-wrap')).paddingLeft)
        tl.to('.home-part-line-wrap', {x: -dis})

        const totalPathL = parseFloat(ut.dom('.home-part-line-main path').getTotalLength());
        console.log(totalPathL)
        gsap.set('.home-part-line-main', {'--totalL': totalPathL, '--prog': 0})
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.home-comp',
                start: 'bottom+=100 bottom',
                endTrigger: '.home-part',
                end: `bottom-=${(sectionBotOffset)} bottom`,
                scrub: true,
            }
        })
        tl2
        .to('.home-part-line-main', {'--prog': 100, ease: 'linear'})
    }, [])
    return (
        <section className="home-part">
            <div className="home-part-stick">
                <div className="container bg-light">
                    <div className="home-part-inner">
                        <div className="home-part-line-wrap">
                            <div className="img img-h home-part-line-main">
                                <svg height="100%" viewBox="0 0 6199 1375" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeDasharray="var(--totalL)" strokeDashoffset="var(--totalOffset)" d="M804.137 0V1025.5C804.137 1516.5 426.137 960.5 1011.14 1208.5C1172.7 1276.99 1157.75 937.898 1302.14 926.5C1454.14 914.5 1538.14 1054.5 1613.14 981.5C1688.14 908.5 1520.14 599.5 1681.14 534.5C1820.74 478.142 1869.14 664.5 2063.14 709.5C2257.14 754.5 2481.14 743.5 2623.14 786.5C2765.14 829.5 2777.34 686.352 2834.14 567.846C2905.14 419.715 3094.14 485.448 3083.14 620.618C3072.14 755.788 2998.64 1067.24 3150.14 1129.82C3324.14 1201.7 3300.14 966.876 3553.14 966.876L3862.14 967.412C4117.14 967.412 4110.14 749.5 4246.14 801.5C4443.96 877.136 4359.14 1107.5 4439.32 1151.49C4564.8 1220.33 4503.65 869.294 4684.14 822.5C4765.14 801.5 4851.14 881.5 4941.14 801.5C5031.14 721.5 5008.14 585.5 5240.14 585.5" stroke="#3D3D3D" strokeWidth=".4rem"/>

                                </svg>
                            </div>
                            <div className="home-part-line-content">
                                {/* All follow svg's hieght = 100vh */}
                                <div className="home-part-line-content-item item-1">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc1}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title">
                                        We're <br/>more than just <br/>a packaging supplier. We are <span className="txt-green">your strategic partner</span>
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-2">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc2}
                                    </div>
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc3}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        We're Combining sustainability with innovation...
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-4">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc4}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        ...to deliver eco-friendly packaging solutions...
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-5">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc5}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        That exceed <br/>your expectations <br/>and contribute to your brand's growth
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePartner;