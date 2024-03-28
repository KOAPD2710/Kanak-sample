import "./Explore.scss"
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

import ExploreItem from "./ExploreItem"

function KustomerExplore({ ...props }) {
    const allItem = props.list

    useEffect(() => {
        const title = new SplitType(".kustomer-explore-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const titleSequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: "-.4" }],
        ]

        inView('.kustomer-explore-title', () => {
            timeline(titleSequence).finished.then(() => {
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="kustomer-explore">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up kustomer-explore-title">Explore our <span className="txt-green">customizable</span><span className="txt-green">offers</span></h1>
                <div className="kustomer-explore-main">
                    {allItem.map((item, idx) =>
                        <ExploreItem
                            title={item.title}
                            label={item.label}
                            list={item.list}
                            img={props.img}
                            key={idx}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default KustomerExplore