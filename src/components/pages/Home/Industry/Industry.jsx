import './Industry.scss'
import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function HomeIndustry(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const label = new SplitType(q('.home-indus-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.home-indus-title'), { types: 'lines, words', lineClass: 'split-line' })
        gsap
            .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top+=40%' } })
            .from(label.words, { yPercent: 100, duration: 1, stagger: .05, ease: 'power4.out', onComplete: () => label.revert }, 0)
            .from(title.words, { yPercent: 100, duration: 1, stagger: .05, ease: 'power4.out', onComplete: () => title.revert }, 0.15)
            .from('.home-indus-cta-wrap', { autoAlpha: 0, scale: .9, duration: 1.5, ease: 'expo.out', clearProps: 'all' }, '>=-0.8')

        sectionRef.current.querySelectorAll('.home-indus-main-item').forEach((item) => {
            gsap.set(item, { autoAlpha: 0 });
            ScrollTrigger.create({
                trigger: item,
                start: `top top+=82%`,
                once: true,
                onEnter: () => {
                    let itemTitle = new SplitType(item.querySelector('.home-indus-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
                    let itemSub = new SplitType(item.querySelector('.home-indus-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
                    let itemLink = new SplitType(item.querySelector('.home-indus-main-item-link'), { types: 'lines, chars', lineClass: 'split-line' })

                    gsap
                        .timeline()
                        .to(item, { autoAlpha: 1, duration: .5, ease: 'power2.out' })
                        .from(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.inOut', clearProps: 'all' }, '>=-0.1')
                        .from(item.querySelector('.home-indus-main-item-ic'), { scale: .8, x: -15, autoAlpha: 0, duration: 1.5, ease: 'expo.out', clearProps: 'all'  }, '>=-1')
                        .from(itemTitle.chars, { yPercent: 100, stagger: .01, duration: .8, ease: 'power2.out', onComplete: () => itemTitle.revert() }, '>=-1.2')
                        .from(itemSub.words, { yPercent: 100, stagger: .01, duration: .8, ease: 'power2.out', onComplete: () => itemSub.revert() }, '>=-0.6')
                        .from(itemLink.chars, { yPercent: 100, duration: 1.2, stagger: .005, ease: 'power2.out', onComplete: () => itemLink.revert() }, '>=-1')
                }
            })
        })
    }, { scope: sectionRef })
    return (
        <section className="home-indus bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="home-indus-title-wrap">
                    <div className="home-indus-title-stick">
                        <p className="heading h4 txt-up txt-black home-indus-label">{props.label}</p>
                        <h2 className="heading h0 txt-up txt-black home-indus-title">{props.title}</h2>
                        <div className="home-indus-cta-wrap">
                            <a href="#" className="home-indus-cta">
                                <div className="home-indus-cta-inner">{props.arrIcon}</div>
                                <div className="home-indus-cta-outer">{props.ctaTxt}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-indus-main">
                    <div className="home-indus-main-list">
                        {props.listServices}
                    </div>
                </div>
            </div>
        </section>
    );
}

HomeIndustry.propTypes = {};

export default (HomeIndustry);