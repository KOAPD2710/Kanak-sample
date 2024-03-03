import * as ut from '@/js/utils.js';
import './HeroAbout.scss'
import { forwardRef, useEffect, useRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (<span ref={ref} className="heading h0 txt-up txt-black home-hero-abt-title-top">{props.text}</span>)
})

function HomeHeroAbout({...props}) {
    const el = useRef()
    const cloneEl = useRef()
    const { width, height } = useWindowSize();
    useEffect(() => {
        const elRect = ut.offset(el.current);
        cloneEl.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            width: ${el.width}px;
            z-index: 99
        `;
    }, [width, height])
    return (
        <>
            <section className="home-hero-abt">
                <div className="container">
                    <h2 className="heading h0 txt-up txt-black home-hero-abt-title">
                        Your Reputation<br/> <TextEl ref={el} text="Is Our Pride"/>
                    </h2>
                </div>
            </section>
            <TextEl ref={cloneEl} text="Is Our Pride"/>
        </>
    )
}
export default HomeHeroAbout