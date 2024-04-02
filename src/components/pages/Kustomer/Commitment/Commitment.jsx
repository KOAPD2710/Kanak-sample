import "./Commitment.scss"
import KustomerCommitMain from "./CommitmentMain"
import { useEffect } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function KustomerCommitment({ ...props }) {
    useEffect(() => {
        const subtitle = new SplitType(".kustomer-commit-subtitle", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".kustomer-commit-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.lines, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.04), at: 0 }],
            [title.lines, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.08), at: "-.5" }],
        ]
        inView('.kustomer-commit', () => {
            timeline(sequence).finished.then(() => {
                subtitle.revert()
                title.revert()
            })
        }, { margin: "-40% 0px -40% 0px" })
    }, [])
    return (
        <section className="kustomer-commit">
            <div className="container grid">
                <div className="heading h3 txt-black txt-up kustomer-commit-subtitle">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up kustomer-commit-title">{props.title}</h1>
                <KustomerCommitMain listItem={props.listItem} />
            </div>
        </section>
    )
}

export default KustomerCommitment