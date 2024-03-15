import { useGSAP } from '@gsap/react';
import './CTA.scss';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import SplitType from 'split-type';
function HomeCTA(props) {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const title = new SplitType('.home-cta-title', { types: 'lines, words', lineClass: 'split-line' })
        gsap
            .timeline({ scrollTrigger: { trigger: '.home-cta', start: 'top top+=20%', once: true } })
            .from('.home-cta-main ', { y: 20, autoAlpha: 0, duration: 2, ease: 'expo.inOut', clearProps: 'all' })
            .from(title.words, { yPercent: 100, stagger: .05, duration: 1, ease: 'power4.out', onComplete: () => title.revert }, '<=1')
            .from('.home-cta-main-tail-btn', { y: 12, autoAlpha: 0, duration: 1.5, ease: 'power4.out', clearProps: 'all' }, '>=-1')
    }, {})
    return (
        <section className="home-cta">
            <div className="home-cta-bg">
                {props.background}
            </div>
            <div className="container grid">
                <div className="home-cta-main bg-light">
                    <div className="home-cta-main-head">
                        <h2 className="heading h1 txt-up txt-black home-cta-title">
                            Ready to elevate your brand?
                        </h2>
                    </div>
                    <div className="home-cta-main-tail">
                        <div className="line"></div>
                        <a href="" className="btn btn-lg btn-wide home-cta-main-tail-btn">
                            <div className="txt txt-18 txt-med">
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