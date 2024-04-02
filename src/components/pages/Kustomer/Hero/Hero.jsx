import "./Hero.scss"
import KustomerHeroThree from "./HeroThree"
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

function KustomerHero(props) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [currentPos, setCurrentPos] = useState(0);
    const [onDrag, setOnDrag] = useState(false);
    const trackRef = useRef();

    const productArr = [
        { url: '/glb/bowls-65-transformed.glb' },
        { url: '/glb/kup-5-transformed.glb' },
        { url: '/glb/soup-6-transformed.glb' },
        { url: '/glb/plates-80-transformed.glb' },
        { url: '/glb/kutlery-spoon-transformed.glb' }
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
        const maxDelta = window.innerWidth;
        const percentage = (mouseDelta / maxDelta) * -1;
        const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        track.dataset.percentage = nextPercentage;

        setCurrentPos(nextPercentage * .8 * 10 || currentIdx);
    }

    useEffect(() => {
        trackRef.current.onmousedown = (e) => handleOnDown(e);
        trackRef.current.ontouchstart = (e) => handleOnDown(e.touches[0]);

        trackRef.current.onmouseup = (e) => handleOnUp(e);
        trackRef.current.ontouchend = (e) => handleOnUp(e.touches[0]);

        trackRef.current.onmousemove = (e) => handleOnMove(e);
        trackRef.current.ontouchmove = (e) => handleOnMove(e.touches[0]);
    }, [trackRef, currentIdx]);

    return (
        <section className="kustomer-hero bg-white">
            <div className="container grid">
                <div className="heading h6 txt-black txt-up txt-green kustomer-hero-subtitle">Affordable Eco-Dinnerware For Modern Retailers</div>
                <h1 className="heading h0 txt-black txt-up kustomer-hero-title">Sustainably Crafted, Retail Ready</h1>
            </div>
            <div className="kustomer-hero-slide" ref={trackRef} data-percentage={0} data-prev-percentage={0}>
                <KustomerHeroThree list={productArr} onDrag={onDrag} currentPos={currentPos} currentIdx={currentIdx} />
                {/* <div className="kustomer-hero-img-middle">
                    {props.MiddleImg}
                </div>
                <div className="kustomer-hero-img-left">
                    {props.LeftImg}
                </div>
                <div className="kustomer-hero-img-right">
                    {props.RightImg}
                </div> */}
            </div>
        </section>
    )
}

export default KustomerHero