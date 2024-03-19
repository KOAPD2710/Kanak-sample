import * as ut from '@/js/utils.js';
import './HeroAbout.scss'
import { forwardRef, useEffect, useRef } from 'react';
import { stagger, inView, animate } from "motion"
import useWindowSize from '@hooks/useWindowSize';
import SplitType from 'split-type';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (
        <div ref={ref} className={`home-hero-abt-title-grp title-bot ${props.abs ? 'clone-el' : ''}`} style={props.abs && { position: 'absolute'}}>
            {props.children}
        </div>
    )
})

function HomeHeroAbout({...props}) {
    const el = useRef()
    const cloneEl = useRef();
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
    useEffect(() => {
        const titleTop = new SplitType('.home-hero-abt-title-grp:not(.title-bot)', { types: 'lines, words', lineClass: "split-line" });
        const titleBot = new SplitType('.home-hero-abt-title-grp.title-bot.clone-el', { types: 'lines, words', lineClass: "split-line" });
        animate([...titleTop.words, ...titleBot.words], {opacity: 0}, {duration: 0})
        inView(".home-hero-abt-title", () => {
            animate([...titleTop.words, ...titleBot.words], {opacity: 1, transform: ['translateY(100%)', 'none']}, {duration: .6, delay: stagger(.06)}).finished.then(() => {
                titleTop.revert()
                titleBot.revert()
            })
        }, { margin: "-40% 0px -40% 0px" });
    }, [])
    return (
        <>
            <section className="home-hero-abt">
                <div className="container">
                    <h2 className="home-hero-abt-title">
                        <div className='home-hero-abt-title-grp'>
                            <span className='heading h0 txt-up txt-black'>Your</span>
                            <br/>
                            <span className='heading txt-180 txt-up txt-black'>Reputation</span>
                        </div>
                        <TextEl ref={el}>
                            <span className='heading h0 txt-up txt-black'>Is our</span>
                            <br/>
                            <span className='heading txt-180 txt-up txt-black'>Pride</span>
                        </TextEl>
                    </h2>
                </div>
            </section>
            <TextEl ref={cloneEl} abs={true}>
                <span className='heading h0 txt-up txt-black'>Is our</span>
                <br/>
                <span className='heading txt txt-180 txt-up txt-black'>Pride</span>
            </TextEl >
        </>
    )
}
export default HomeHeroAbout