import './Value.scss';
import { animate, timeline, stagger, inView, scroll } from "motion"
import * as ut from '@/js/utils.js';
import SplitType from 'split-type';
import { useEffect, useRef } from 'react';
import { cleanText } from '@/components/utils/text';

function KustomerValue(props) {
    const ref = useRef()
    useEffect(() => {

        // cleanText()

        let allItems = ut.dom('.kustomer-val-main-item');
        if (window.innerWidth > 767) {
            let totalDis = 0;
            allItems.forEach(el => totalDis += el.clientWidth)
            let disWrap = ut.dom('.kustomer-val-main-inner').clientWidth
            let offset = disWrap - allItems[allItems.length - 1].clientWidth
            let dis1 = allItems[0].clientWidth - (offset / 2);
            let dis2 = totalDis - disWrap
            const itemSequence = [
                [[allItems[1], allItems[2]], { x: [0, -dis1] }, { easing: 'linear' }],
                [[...allItems[1].childNodes].filter(child => !child.classList.contains('line')), { x: [0, -ut.parseRem(25)] }, { easing: 'linear', at: '<' }],
                [allItems[2], { x: [0, -dis2] }, { easing: 'linear' }],
                [[...allItems[2].childNodes].filter(child => !child.classList.contains('line')), { x: [0, -ut.parseRem(25)] }, { easing: 'linear', at: '<' }],
            ]
            scroll(timeline(itemSequence), {
                target: document.querySelector('.kustomer-val'),
                offset: [`${document.querySelector('.kustomer-val-main').offsetTop}px start`, `${1 - window.innerHeight / ref.current.clientHeight} end`]
            })
        }

        let mainTitle = new SplitType('.kustomer-val-title', { types: 'lines, words', lineClass: 'split-line' })
        let subTitle = new SplitType('.kustomer-val-subtitle', { types: 'lines, words', lineClass: 'split-line' })

        animate(mainTitle.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        animate(subTitle.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })

        const titleSequence = [
            [mainTitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.03) }],
            [subTitle.words, { transform: 'none', opacity: 1 }, { duration: .8, delay: stagger(.006), at: .1 }],
        ]
        inView('.kustomer-val-title-wrap', () => {
            timeline(titleSequence).finished.then(() => {
                mainTitle.revert()
                subTitle.revert()

            })
        }, { margin: "-30% 0px -30% 0px" })

        allItems.forEach((el, idx) => {
            let itemNumber = new SplitType(el.querySelector('.kustomer-val-main-item-num'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemTitle = new SplitType(el.querySelector('.kustomer-val-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kustomer-val-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            let itemLink = new SplitType(el.querySelector('.kustomer-val-main-item-link'), { types: 'lines, chars', lineClass: 'split-line' })
            animate(el.querySelector('.kustomer-val-main-item-ic'), { opacity: 0, scale: 0.8 }, { duration: 0 })
            if (idx != 0) {
                animate(el.querySelector('.line.line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
            }
            animate([...itemNumber.chars, ...itemTitle.words, ...itemSub.words, ...itemLink.chars], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            const sequence = [
                [itemNumber.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01) }],
                [itemTitle.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .1 }],
                [itemSub.lines, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .3 }],
                [itemLink.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.008), at: .2 }],
                [el.querySelector('.kustomer-val-main-item-ic'), { opacity: 1, scale: 1 }, { duration: 1, at: .5 }],
                [idx != 0 && el.querySelector('.line.line-left'), { scaleY: 1 }, { duration: 1, at: 0 }]
            ]
            inView(el, () => {
                timeline(sequence, { delay: idx % 2 == 0 ? 0 : idx * .2 }).finished.then(() => {
                    el.querySelector('.kustomer-val-main-item-ic').removeAttribute('style')
                    idx != 0 && el.querySelector('.line.line-left').removeAttribute('style')
                    itemNumber.revert()
                    itemTitle.revert()
                    itemSub.revert()
                    itemLink.revert()
                })
            }, { margin: "-30% -10% -30% -10%" })
        })
    }, [])
    return (
        <div className="kustomer-val-wrap" ref={ref}>
            <section className="kustomer-val bg-dark" style={{ '--offsetMargin': '100vh' }}>
                <div className="kustomer-val-stick">
                    <div className="container">
                        <div className="kustomer-val-title-wrap">
                            <h2 className="heading h0 txt-up txt-black kustomer-val-title">
                                Raise Your Brand to <span className='txt-green'>Eco-</span><span className='txt-green'>Excellence</span>
                            </h2>
                            <p className='heading h6 txt-black txt-up kustomer-val-subtitle'>Roll out the green carpet! Kanak Naturals is redefining the packaging playbook, one eco-friendly solution at a time. Here, sustainability marries innovation, creating packaging solutions that don't just meet your expectations; they dare to exceed them. We're committed to fueling your brand's growth with packaging that speaks volumes of your dedication to the environment.</p>
                        </div>
                    </div>
                    <div className="kustomer-val-main">
                        <div className="container">
                            <div className="kustomer-val-main-wrap">
                                <div className="line line-top"></div>
                                <div className="kustomer-val-main-inner">
                                    {props.list}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default KustomerValue;