import * as ut from '@/js/utils.js';
import './HeroAbout.scss'
import { Children, forwardRef, useEffect, useRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (
        <span ref={ref} className="heading txt-up txt-black home-hero-abt-title-top" style={props.abs && { position: 'absolute'}}>
            {props.children}
        </span>
    )
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
            z-index: 999
        `;
    }, [width, height])
    return (
        <>
            <section className="home-hero-abt">
                <div className="container">
                    <h2 className="heading h0 txt-up txt-black home-hero-abt-title">
                        <span className='heading h0 txt-up txt-black'>Your</span>
                        <br />
                        <span className='txt txt-180 txt-up txt-black'>Reputation</span>
                        <br />
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