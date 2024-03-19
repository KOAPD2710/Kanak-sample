import './Hero.scss';
import { useEffect } from 'react';
import { timeline, stagger, animate } from "motion"
import SplitType from 'split-type';

function KareersHero({ heroBg }) {
    useEffect(() => {
        console.log("run")
        const title = new SplitType('.kareer-hero-title', { types: 'lines, words', lineClass: "split-line" });
        animate('.kareer-hero-bg-inner', { clipPath: 'inset(20%)', scaleX: 2, transform: "translateY(50%)" }, { duration: 0 });
        animate('.kareer-hero-bg-inner img', { scale: 1.4, opacity: 0 }, { duration: 0 });
        animate('.kareer-hero-bg .line.line-top', { scale: 0, opacity: 0 }, { duration: 0 });

        const sequence = [
            [title.words, { opacity: [0, 1], transform: ["translateY(100%)", "none"] }, { duration: .8, delay: stagger(.05) }],
            ['.kareer-hero-bg-inner', { clipPath: ['inset(20%)', 'inset(0%)'], scaleX: [2, 1], transform: ["translateY(50%)", "none"]  }, { duration: 2.2, easing: [0.16, 1, 0.3, 1], at: 0.1 }],
            ['.kareer-hero-bg-inner img', { transform: ["scaleX(1.4)", "scaleX(1)"], opacity: [0, 1] }, { duration: 2.2, easing: [0.16, 1, 0.3, 1], at: 0.1 }],
            ['.kareer-hero-bg .line.line-top', { opacity: [0, 1], transform: ["scale(0)", "scale(1)"] }, { duration: 1.2, easing: [0.87, 0, 0.13, 1], at: 1.2 }]
        ]
        timeline(sequence).finished.then(() => {
            title.revert();
            document.querySelector('.kareer-hero-bg-inner').removeAttribute('style')
            document.querySelector('.kareer-hero-bg-inner img').removeAttribute('style')
            document.querySelector('.kareer-hero-bg .line.line-top').removeAttribute('style')
        })
    }, []);
    return (
        <section className="kareer-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-up txt-black kareer-hero-title">
                    We are seeking some explosive factors
                </h1>
            </div>
            <div className="kareer-hero-bg bg-light">
                <div className="line line-top"></div>
                <div className="kareer-hero-bg-inner">
                    {heroBg}
                </div>
            </div>
        </section>
    )
}
export default KareersHero