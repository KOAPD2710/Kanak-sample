import "./Hero.scss";
import { useEffect } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function ResourceHero({ ...props }) {

    useEffect(() => {
        const title = new SplitType('.resource-hero-title', { types: 'lines, words, chars', lineClass: 'split-line' })
        const subtitle = new SplitType('.resource-hero-subtitle', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.chars, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.chars, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: .2 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.01), at: "-.4" }],
        ]

        inView('.resource-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })

    }, [])

    return (
        <section className="resource-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up resource-hero-title">
                    Insights    
                </h1>
                <p className="txt txt-20 txt-black txt-up resource-hero-subtitle">
                    a one-stop destination for eco-friendly living. Explore practical tips, guides, and inspiration to help you make a positive impact on the planet.
                </p>
            </div>
        </section>
    )
}

export default ResourceHero