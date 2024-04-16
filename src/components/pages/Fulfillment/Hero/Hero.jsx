import "./Hero.scss"
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function FulfillHero({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".fulfill-hero-title", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".fulfill-hero-sub", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })


        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .1 }],
        ]
        inView('.fulfill-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])

    return (
        <section className="fulfill-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up fulfill-hero-title">{props.title}</h1>
                <div className="txt txt-20 txt-black txt-up fulfill-hero-sub">{props.sub}</div>
            </div>
        </section>
    )
}

export default FulfillHero
