import useDevice from '@/components/hooks/useDevice';
import './Hero.scss'
import * as ut from '@/js/utils.js';
import useWindowSize from '@/components/hooks/useWindowSize';
import { forwardRef, useRef, useEffect } from 'react';

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
    const { isMobile } = useDevice();

    const badgeRef = useRef();
    const badgeCloneRef = useRef();
    const { width, height } = useWindowSize();
    useEffect(() => {
        const elRect = ut.offset(badgeRef.current);
        badgeCloneRef.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            z-index: 999
        `;
    }, [width, height])
    return (
        <>
            <section className="home-hero">
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