import './PolicyHero.scss'

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";
import { useEffect } from 'react';

function Hero({ ...props }) {

    useEffect(() => {
        const title = new SplitType('.policy-hero-title', { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { transform: "none" }, { duration: .8, delay: stagger(.08), at: 0 }],
        ]

        inView('.policy-hero', () => {
            timeline(sequence).finished.then(() => [
                title.revert()
            ])
        })
    }, [])

    return (
        <section className="policy-hero">
            <div className="container grid">
                <h1 className='heading h0 txt-black txt-up policy-hero-title'>{props.title}</h1>
            </div>
        </section>
    )
}

export default Hero