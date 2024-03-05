import useDevice from '@/components/hooks/useDevice';
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react';
import "keen-slider/keen-slider.min.css"
import HomeBrandThree from './BrandThree';
import { brandIndex } from '@contexts/StoreGlobal';

import './Brand.scss';

function HomeBrand({ ...props }) {
    const { isDesktop, isMobile } = useDevice();
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
    return (
        <section className="home-brand">
            <div className="container grid">
                { isMobile && <h2 className="heading h0 txt-up txt-black home-brand-title" dangerouslySetInnerHTML={{ __html: props.title }}/> }
                <div className="home-brand-canvas">
                    <div className="home-brand-canvas-inner">
                        <HomeBrandThree list={props.list}/>
                    </div>
                </div>
                <div className="line line-ver"></div>
                <div className="home-brand-main">
                    { !isMobile && <h2 className="heading h0 txt-up txt-black home-brand-title" dangerouslySetInnerHTML={{ __html: props.title }}/> }
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