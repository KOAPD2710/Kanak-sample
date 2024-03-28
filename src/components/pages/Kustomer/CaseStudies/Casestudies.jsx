import "./Casestudies.scss";
import CaseStudiesMain from "./CasestudiesMain";

import { useEffect } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function KustomerCaseStudies({ ...props }) {

    useEffect(() => {
        const label = new SplitType(".kustomer-kasestu-label", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".kustomer-kasestu-title", { types: 'lines, words', lineClass: 'split-line' })
        const paragraph = new SplitType(".kustomer-kasestu-des-content", { types: 'lines, words', lineClass: 'split-line' })
        const link = new SplitType(".kustomer-kasestu-des-link", { types: 'lines, words', lineClass: 'split-line' })


        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(paragraph.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(link.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: "-.4" }],
            [paragraph.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.03), at: "-.3" }],
            [link.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: "-.3" }],
        ]
        inView('.kustomer-kasestu', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                paragraph.revert()
                link.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])

    return (
        <section className="kustomer-kasestu">
            <div className="container grid">
                <div className="heading h4 txt-black txt-up kustomer-kasestu-label">KASE STUDIES</div>
                <h1 className="heading h0 txt-black txt-up kustomer-kasestu-title">REAL STORIES, REAL IMPACT</h1>
                <div className="kustomer-kasestu-des">
                    <p className="txt txt-18 txt-med kustomer-kasestu-des-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <a href="/kase-studies" className="txt txt-18 txt-med kustomer-kasestu-des-link" data-cursor="txtLink">View all kase studies</a>
                </div>
                <CaseStudiesMain list={props.list} />
            </div>
        </section>
    )
}


export default KustomerCaseStudies