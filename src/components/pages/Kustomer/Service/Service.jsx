import "./Service.scss"
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

import ServiceMain from "./ServiceMain";
function KustomerService({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".kustomer-service-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.kustomer-service-line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const titleSequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            ['.kustomer-service-line', { scaleX: 1 }, { duration: .8, at: .2 }],
        ]

        inView('.kustomer-service', () => {
            timeline(titleSequence).finished.then(() => {
                title.revert()
                document.querySelector('.kustomer-service-line').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="kustomer-service">
            <div className="container grid">
                <div className="kustomer-service-title-wrapper">
                    <h1 className="heading h0 txt-black txt-up kustomer-service-title">{props.title}</h1>
                </div>
                <ServiceMain list={props.list}></ServiceMain>
                <div className="line kustomer-service-line"></div>
            </div>
        </section>
    )
}



export default KustomerService