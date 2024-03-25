import "./Main.scss";
import ResourceMainFeature from "./MainFeature";
import ResourceMainPopular from "./MainPopular";
import ResourceMainList from "./MainList";

import { useEffect } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function ResourceMain({ allList, featureList, popularList, ...props }) {

    useEffect(() => {
        animate('.resource-main-line.line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.resource-main-line.line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.resource-main-line.line-top', { scaleX: 1 }, { duration: 1, at: .3 }],
            ['.resource-main-line.line-bot', { scaleX: 1 }, { duration: .9, at: "-.8" }],
        ]

        inView('.resource-main', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.resource-main-line.line-top').removeAttribute('style')
                document.querySelector('.resource-main-line.line-bot').removeAttribute('style')
            })
        })
    }, [])
    return (
        <section className="resource-main">
            <div className="container grid">
                <div className="line resource-main-line line-top"></div>
                <ResourceMainFeature data={featureList} arrIcon={props.arrIcon} />
                <ResourceMainPopular data={popularList} />
                <div className="line resource-main-line line-bot"></div>
                <ResourceMainList data={allList} icArrowDown={props.icArrowDown} icDropDown={props.icDropDown} />
            </div>
        </section>
    )
}

export default ResourceMain
