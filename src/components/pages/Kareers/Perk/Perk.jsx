import './Perk.scss';
import { stagger, inView, animate, timeline } from "motion";
import SplitType from 'split-type';
import { useEffect } from 'react';

function KareersPerk(props) {
    useEffect(() => {
        const title = new SplitType('.kareer-perk-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.kareer-perk-sub', { types: 'lines, words', lineClass: "split-line" });

        animate(title.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate(subTitle.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        const sequence = [
            [subTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02)}],
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.02), at: '<'}]
        ]

        inView('.kareer-perk', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
            })
        }, { margin: "-30% 0px -30% 0px" });

        const perks = document.querySelectorAll('.kareer-perk-main-item');
        perks.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.kareer-perk-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kareer-perk-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-right'), {scaleY: 0 }, {duration: 0})
            animate(el.querySelector('.line-bot'), {scaleX: 0 }, {duration: 0})
            animate(itemTitle.chars, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            animate(itemSub.words, {opacity: 0, transform: 'translateY(12px)'}, {duration: 0})
            animate(el.querySelector('[name="itemIc"] img'), { scale: 0.6, opacity: 0 }, { duration: 0 })


            const sequenceItem = [
                [el.querySelector('.line-right'), {scaleY: 1 }, {duration: 1, delay: (idx % 3) * .08, easing: [0.87, 0, 0.13, 1]}],
                [el.querySelector('.line-bot'), {scaleX: 1 }, {duration: 1, easing: [0.87, 0, 0.13, 1], at: '<'}],
                [el.querySelector('[name="itemIc"] img'), {scale: 1, opacity: 1}, {duration: 1, at: '<' }],
                [itemTitle.chars, {opacity: 1, transform: 'translateY(0%)'}, {duration: .8, delay: stagger(.01), at: '<'}],
                [itemSub.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02), at: '<'}],
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    el.querySelector('[name="itemIc"] img').removeAttribute('style');
                    el.querySelector('.line-right').removeAttribute('style')
                    el.querySelector('.line-bot').removeAttribute('style')

                    itemTitle.revert()
                    itemSub.revert()
                })
            }, { margin: "-25% 0px -25% 0px" });
        })
    }, []);
    return (
        <section className="kareer-perk bg-dark">
            <div className="container">
                <div className="kareer-perk-title-wrap">
                    <h3 className="heading h3 txt-up txt-black kareer-perk-sub">
                        Elevating Employee Well-Being
                    </h3>
                    <h2 className="heading h0 txt-up txt-black kareer-perk-title">
                        A Dive into Our Employee <span className="txt-green">Perks Paradise</span>
                    </h2>
                </div>
                <div className="kareer-perk-main">
                    {[...Array(6)].map((item, idx) => (
                        <div className="kareer-perk-main-item" key={idx}>
                            <div className="kareer-perk-main-item-inner">
                                <div className="ic ic-60">
                                    {props.itemIc}
                                </div>
                                <h3 className="heading h5 txt-up txt-black kareer-perk-main-item-title">
                                    Health Insurance
                                </h3>
                                <p className="txt txt-20 txt-med kareer-perk-main-item-sub">
                                    A healthy work-life balance is imperative. That's why we offer flexible working arrangements and 30 days of vacation per year, ensuring ample time to rest.
                                </p>
                            </div>
                            <div className="line line-right"></div>
                            <div className="line line-bot"></div>
                        </div>
                    ))}
                    <div className="line line-top"></div>
                    <div className="line line-bot"></div>
                </div>
            </div>
        </section>
    )
}
export default KareersPerk