import './CTA.scss';
import { animate, timeline, stagger, inView, scroll } from "motion"
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import SplitType from 'split-type';
import { useEffect } from 'react';
function HomeCTA(props) {
    useEffect(() => {
        const title = new SplitType('.home-cta-title', { types: 'lines, words', lineClass: 'split-line' })
        animate('.home-cta-main', { opacity: 0, transform: 'translateY(10%)' }, { duration: 0 })
        animate(title.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        animate('.home-cta-main-tail-btn', { opacity: 0 }, { duration: 0 })
        animate('.home-cta-main-tail .line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        const sequence = [
            ['.home-cta-main', { transform: 'none', opacity: 1 }, { duration: .8 }],
            [title.words, { transform: 'none', opacity: 1 }, { duration: .8, delay: stagger(0.06), at: .1 }],
            ['.home-cta-main-tail .line', { scaleX: 1 }, { duration: .6, at: .1 }],
            ['.home-cta-main-tail-btn', { opacity: 1 }, { duration: .8, at: .2 }]
        ]
        inView('.home-cta-main', () => {
            timeline(sequence)
        }, { margin: '-30% 0px -30% 0px' })
    }, [])
    return (
        <section className="home-cta">
            <div className="home-cta-bg">
                {props.background}
            </div>
            <div className="container grid">
                <div className="home-cta-main bg-light">
                    <div className="home-cta-main-head">
                        <h2 className="heading h1 txt-up txt-black home-cta-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="home-cta-main-tail">
                        <div className="line"></div>
                        <a href="/contact" className="btn btn-lg btn-wide home-cta-main-tail-btn" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-18 txt-med txt-up" data-cursor-txtlink-child>
                                Request a quote
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="line line-bot"></div>
        </section>
    )
}
export default HomeCTA;