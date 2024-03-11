import * as ut from '@/js/utils.js';
import './HeroAbout.scss'
import { Children, forwardRef, useEffect, useRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (
        <span ref={ref} className="heading txt-up txt-black home-hero-abt-title-top" style={props.abs && { position: 'absolute'}}>
            {props.children}
        </span>
    )
})

function HomeHeroAbout({...props}) {
    const el = useRef()
    const cloneEl = useRef();
    const sectionRef = useRef();

    const { width, height } = useWindowSize();
    useEffect(() => {
        const elRect = ut.offset(el.current);
        cloneEl.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            z-index: 999
        `;
    }, [width, height])

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        const titleTop = new SplitType('.home-hero-abt-title-top', { types: 'lines, words', lineClass: "split-line" });
        const titleBot = new SplitType(cloneEl.current, { types: 'lines, words', lineClass: "split-line" });
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top+=38%'
            }
        })
        gsap.set(el.current, { autoAlpha: 0, pointerEvents: 'none' });
        tl.from(titleTop.words, { ease: "power4.out", yPercent: 100, duration: 2, stagger: .1 })
            .from(titleBot.words, { ease: "power4.out", yPercent: 100, duration: 2, stagger: .1 }, 0)

    }, { scope: sectionRef })
    return (
        <>
            <section className="home-hero-abt" ref={sectionRef}>
                <div className="container">
                    <h2 className="heading h0 txt-up txt-black home-hero-abt-title">
                        <div className='home-hero-abt-title-top'>
                            <span className='heading h0 txt-up txt-black'>Your</span>
                            <br />
                            <span className='txt txt-180 txt-up txt-black'>Reputation</span>
                            <br />
                        </div>
                        <TextEl ref={el}>
                            <span className='heading h0'>Is our</span>
                            <br/>
                            <span className='txt txt-180'>Pride</span>
                        </TextEl>
                    </h2>
                </div>
            </section>
            <TextEl ref={cloneEl} abs={true}>
                <span className='heading h0'>Is our</span>
                <br/>
                <span className='txt txt-180'>Pride</span>
            </TextEl >
        </>
    )
}
export default HomeHeroAbout