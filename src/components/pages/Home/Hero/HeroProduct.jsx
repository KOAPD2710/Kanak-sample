import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';
import './HeroProduct.scss'
import useSelector from '@/components/hooks/useSelector';
import { useState, useRef } from 'react';

function HomeHeroProduct({ ...props }) {
    const ref = useRef();
    const [lines, setLines] = useState(1)

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const text = new SplitType('.home-hero-prod-title', { types: 'lines, words, chars', lineClass: 'type-line'});
        setLines(text.lines.length);

        requestAnimationFrame(() => {
            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: '.home-hero-prod-title-wrap',
                    start: 'top bottom',
                    end: 'bottom top+=45%',
                    scrub: true,
                },
                opacity: .2, stagger: .06, ease: 'linear'
            })
        })
    }, { scope: ref })
    return (
        <section className="home-hero-prod" ref={ref}>
            <div className="container grid">
                <div className="h1 home-hero-prod-title-wrap" style={{'--lines': lines}}>
                    <h2 className="heading h1 txt-up txt-black home-hero-prod-title">
                        {props.prod_sub_title}
                    </h2>
                </div>
            </div>
        </section>
    )
}
export default HomeHeroProduct