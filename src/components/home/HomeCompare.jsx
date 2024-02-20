import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGsap } from '@gsap/react'
import { Image, Fragment } from 'astro:assets';
import comparePlates from '../../assets/compare.png';
import compareDotDash from '../../assets/compare-dot-dash.svg';
import compareLine from '../../assets/compare-line.svg?raw';

function HomeCompareReact() {
    const container = useRef(container)

    return (
        <section class="home-comp" ref={container}>
            <div class="home-comp-stick">
                <div class="container">
                    <div class="home-comp-title-wrap">
                        <h2 class="heading txt-up txt-black home-comp-title">
                            <span class="h3">Label</span><br/>
                            <span class="h0">Title</span>
                        </h2>
                    </div>
                    <div class="home-comp-main grid">
                        <div class="home-comp-main-item">
                            Item
                        </div>
                        <div class="home-comp-main-prog">
                            <div class="home-comp-main-prog-inner">
                                <div class="home-comp-main-prog-plates">
                                    <img src={comparePlates.src} alt="Compare plates" class="img" />
                                </div>
                                <div class="home-comp-main-prog-dot">
                                    <img src={compareDotDash.src} alt="" class="img" />
                                </div>
                                <div class="home-comp-main-prog-line">
                                    {/* <Fragment set:html={compareLine.src} alt="" class="img" /> */}
                                </div>
                            </div>
                        </div>
                        <div class="home-comp-main-item">
                            Item
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default HomeCompareReact;


