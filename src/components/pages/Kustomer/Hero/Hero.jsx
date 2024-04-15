import "./Hero.scss"
import KustomerHeroThree from "./HeroThree"
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function KustomerHero(props) {
    const [currentIdx, setCurrentIdx] = useState(1);
    const [currentPos, setCurrentPos] = useState(0);
    const [onDrag, setOnDrag] = useState(false);
    const trackRef = useRef();

    const productArr = [
        {
            url: '/glb/58-bowl-clean-transformed.glb',
            scale: [.38, .38, .38],
            rotation: [0, Math.PI * .3, Math.PI * -.035]
        },
        {
            url: '/glb/42-ramen-grip-clean-transformed.glb',
            scale: [.8, .8, .8],
            rotation: [0, Math.PI * .25, 0]
        },
        {
            url: '/glb/13-burger-box-clean-transformed.glb',
            scale: [1.1, 1.1, 1.1],
            rotation: [0, Math.PI * -.065, Math.PI * .02]
        },
    ]

    const handleOnDown = (e) => {
        setOnDrag(true);
        trackRef.current.dataset.mouseDownAt = e.clientX
    }
    const handleOnUp = (e) => {
        let track = trackRef.current;
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
        setOnDrag(false);
    }

    const handleOnMove = (e) => {
        let track = trackRef.current;
        if (track.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        track.dataset.percentage = nextPercentage;

        // setCurrentPos(nextPercentage / 100 * 2 || currentIdx);
        setCurrentIdx(-nextPercentage / 100 * 2 || currentIdx);
    }

    useEffect(() => {
        // trackRef.current.onmousedown = (e) => handleOnDown(e);
        // trackRef.current.ontouchstart = (e) => handleOnDown(e.touches[0]);

        // trackRef.current.onmouseup = (e) => handleOnUp(e);
        // trackRef.current.ontouchend = (e) => handleOnUp(e.touches[0]);

        // trackRef.current.onmousemove = (e) => handleOnMove(e);
        // trackRef.current.ontouchmove = (e) => handleOnMove(e.touches[0]);
    }, [trackRef, currentIdx]);

    useEffect(() => {
        const title = new SplitType('.kustomer-hero-title', { types: "lines,words", lineClass: 'split-line' })
        const subtitle = new SplitType('.kustomer-hero-subtitle', { types: "lines,words", lineClass: 'split-line' })


        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })


        const sequence = [
            [subtitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.01), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: .2 }],
        ]

        inView('.kustomer-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        })
    }, [])

    return (
        <section className="kustomer-hero bg-white">
            <div className="container grid">
                <div className="heading h6 txt-black txt-up kustomer-hero-subtitle">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up kustomer-hero-title">{props.title}</h1>
            </div>
            <div className="kustomer-hero-slide" ref={trackRef} data-percentage={0} data-prev-percentage={0}>
                <KustomerHeroThree list={productArr} onDrag={onDrag} currentPos={currentPos} currentIdx={currentIdx} />
            </div>
        </section>
    )
}

export default KustomerHero