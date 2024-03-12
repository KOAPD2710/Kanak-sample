import './Client.scss'
import { useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
function HomeClient(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const title = new SplitType(q('.home-client-title [name="title"]'), { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType(q('.home-client-sub'), { types: 'lines, words', lineClass: "split-line" });

        gsap
            .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top+=40%' } })
            .from(title.words, { yPercent: 100, duration: 1, stagger: .05, ease: 'expo.out', onComplete: () => title.revert() }, 0)
            .from('[name="imgQuality"] img', { scale: .8, autoAlpha: 0, duration: 2, ease: 'expo.out', clearProps: 'all' }, ">-0.8")

        gsap.from(subTitle.words, {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top+=40%'
            }, yPercent: 100, duration: 1, stagger: .05, ease: 'expo.out', onComplete: () => subTitle.revert()
        })

        gsap.set('.home-client-box', { yPercent: 10, autoAlpha: 0 });
        ScrollTrigger.batch('.home-client-box', {
            start: `top top+=85%`,
            onEnter: batch => {
                batch.forEach((item, index) => {
                    let delayItem = (initDelay) => index != 0 ? initDelay * (index + 1) : initDelay;
                    gsap.to(item, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', delay: delayItem(.1), clearProps: 'all' })
                    gsap.from(item.querySelector('img'), { scale: 0.8, duration: 1.2, ease: 'expo.out', delay: delayItem(.1), clearProps: 'all' })
                })
            }
        })
    }, { scope: sectionRef })
    return (
        <section className="home-client" ref={sectionRef}>
            <div className="container">
                <div className="grid">
                    <div className="home-client-title-wrap">
                        <h2 className="heading h0 txt-up txt-black home-client-title">
                            {props.title}
                        </h2>
                        {props.imgQuality}
                    </div>
                    <div className="home-client-sub-wrap">
                        <p className="heading h6 txt-up txt-black home-client-sub">
                            {props.subTitle}
                        </p>
                    </div>
                    <div className="grid-holder"></div>
                    <div className="home-client-map home-client-box">
                        {props.imgMap}
                    </div>
                    {props.listLogo}
                </div>
            </div>
        </section>
    )
}
export default HomeClient;