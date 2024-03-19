import './Culture.scss'
import { useEffect } from 'react';
import SplitType from 'split-type';
import { stagger, inView, animate, timeline } from "motion";
function KareerCulture(props) {
    useEffect(() => {
        const title = new SplitType('.kareer-cult-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.kareer-cult-sub', { types: 'lines, words', lineClass: "split-line" });
        animate(title.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate(subTitle.words, {opacity: 0, transform: 'translateY(12px)'}, {duration: 0})

        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}],
            [subTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02), at: '<'}]
        ]
        inView('.kareer-cult', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
            })
        }, { margin: "-30% 0px -30% 0px" });

        animate('.kareer-cult-btn-wrap', { opacity: 0, transform: "translateY(10px)" }, { duration: 0 });
        inView('.kareer-cult-btn-wrap', () => {
            animate('.kareer-cult-btn-wrap', { opacity: [0, 1], transform: ["translateY(10px)", "none"]}, { duration: .6 }).finished.then(() => {
                document.querySelector('.kareer-cult-btn-wrap').removeAttribute('style');
            })
        }, { margin: "-10% 0px -10% 0px" });

        const cultures = document.querySelectorAll('.kareer-cult-main-item');
        cultures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.kareer-cult-main-item-title-txt'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kareer-cult-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), {scaleX: 0}, {duration: 0})
            animate(el.querySelector('.kareer-cult-main-item-title-dot'), {scale: 0}, {duration: 0})
            animate(itemTitle.chars, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            animate(itemSub.words, {opacity: 0, transform: 'translateY(12px)'}, {duration: 0})
            animate(el.querySelector('.kareer-cult-main-item-img'), { opacity: 0, clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }, { duration: 0 })
            animate(el.querySelector('.kareer-cult-main-item-img img'), { scale: 1.2 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), {scaleX: 0}, {duration: 0})

            const sequenceItem = [
                [el.querySelector('.line-top'), {scaleX: 1}, {duration: 1, easing: [0.87, 0, 0.13, 1]}],
                [el.querySelector('.kareer-cult-main-item-title-dot'), {scale: 1}, {duration: .8, easing: [0.87, 0, 0.13, 1], at: .2}],
                [itemTitle.chars, {opacity: 1, transform: 'translateY(0%)'}, {duration: .8, delay: stagger(.01), at: .37}],
                [itemSub.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02), at: .37}],
                [el.querySelector('.kareer-cult-main-item-img'), { opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, { duration: 1, easing: [0.16, 1, 0.3, 1], at: .35 }],
                [el.querySelector('.kareer-cult-main-item-img img'), { scale: 1 }, { duration: 1.2, easing: 'ease-out', at: .35 }],
                [el.querySelector('.line-bot') && el.querySelector('.line-bot'), {scaleX: 1}, {duration: .9, easing: [0.87, 0, 0.13, 1], at: .45}]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    el.querySelector('.line-top').removeAttribute('style')
                    el.querySelector('.kareer-cult-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.kareer-cult-main-item-img').removeAttribute('style');
                    el.querySelector('.kareer-cult-main-item-img img').removeAttribute('style');
                    el.querySelector('.line-bot')?.removeAttribute('style');
                    itemTitle.revert()
                    itemSub.revert()
                })
            }, { margin: "-25% 0px -25% 0px" });
        })
    }, []);
    return (
        <section className="kareer-cult bg-light">
            <div className="line line-top"></div>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black kareer-cult-title">
                    Unveiling Our <span className="txt-green">Dynamic</span> Company Vibe
                </h2>
                <div className="kareer-cult-sub-wrap">
                    <p className="txt txt-20 txt-med kareer-cult-sub">
                        Within our intimate team, we cherish the diverse backgrounds, cultures and perspectives that each individual brings. By nurturing an environment where different ideas are encouraged and celebrated, we cultivate an atmosphere of inclusivity, where everyone can thrive and contribute their unique strengths.
                    </p>
                    <div className="kareer-cult-btn-wrap">
                        <a href="#" className="btn btn-lg">
                            <div className="txt txt-18 txt-up txt-med">
                                Views open positions
                            </div>
                        </a>
                    </div>
                </div>
                <div className="kareer-cult-main">
                    {[...Array(4)].map((item, idx) => (
                        <div className="kareer-cult-main-item bg-light" key={idx} style={
                            {'--idx': idx + 1,
                            '--idx-bot': 4 - idx - 1,
                            '--idx-top': idx == 0 ? 0 : 4 - idx}
                            }>
                            <div className="kareer-cult-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="kareer-cult-main-item-content">
                                    <div className="kareer-cult-main-item-title">
                                        <div className="kareer-cult-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black kareer-cult-main-item-title-txt">
                                            Collaborative Ecosystem
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med kareer-cult-main-item-sub">
                                        Teamwork is at the core of this culture, fostering an environment where collaboration is not just encouraged but essential. Open communication, shared goals, and mutual support are the building blocks of success.
                                    </p>
                                </div>
                                <div className="kareer-cult-main-item-img">
                                    {props.itemImg}
                                </div>
                                {idx == 3 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default KareerCulture