import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';
import { useEffect, useState, useCallback } from 'react';
import useSelector from '@/components/hooks/useSelector';
import './Compare.scss';


const MainItem = ({ data, type, image, title, content, currentIndex }) => {
    return (
        <div className={`home-comp-main-item ${type}`}>
            { image }
            <h3 className={`heading h5 txt-up txt-black home-comp-main-item-title ${type}`}>
                {title}
            </h3>
            <div className="home-comp-main-item-list">
                {data.map(({ data }, idx) => (
                    <p className={`txt txt-20 home-comp-main-item-list-item${idx == currentIndex ? ' active' : ''}`} key={idx}>
                        {data[content]}
                    </p>
                ))}
            </div>
        </div>
    )
}

function HomeCompare(props) {
    const [q, ref] = useSelector(null);
    const [index, setIndex] = useState(0);
    const [itemCompareHeight, setItemCompareHeight] = useState(0);

    const onUpdateProgress = useCallback((progress) => {
        const numberOfBreakPoints = props.list.length;
        const step = 1 / numberOfBreakPoints;
        const breakPoints = Array.from({ length: numberOfBreakPoints + 1 }, (_, index) => parseFloat((index * step).toPrecision(2)));
        let idx;

        for (let i = 0; i < breakPoints.length - 1; i++) {
            const startPoint = breakPoints[i];
            const endPoint = breakPoints[i + 1];

            if (progress >= startPoint && progress < endPoint) {
                let idx = Math.floor(progress * 5)
                setIndex(idx);
                break;
            }
        }
    }, [index])

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                snap: [0, .2, .4, .6, .8, 1],
                onUpdate: (self) => {
                    let progress = self.progress;
                    onUpdateProgress(progress);
                }
            }
        })
        tl
            .to('.home-comp-main-prog-line', { '--prog': 100, duration: 1, ease: 'linear' })
    }, { scope: ref });

    useEffect(() => {
        setItemCompareHeight((document.querySelector('.header').offsetHeight + q('.home-comp-main-item').offsetHeight) / 10);
    }, [ref])
    return (
        <section className="home-comp" ref={ref}>
            <div className="home-comp-stick bg-light">
                <div className="container">
                    <div className="home-comp-title-wrap">
                        <h2 className="h0 heading txt-up txt-black home-comp-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="home-comp-main grid">
                        <MainItem
                            data={props.list}
                            image={props.imgCompareGood}
                            title={"Kanak Naturals Dinnerware"}
                            currentIndex={index}
                            content={"kanak"}
                        />
                        <div className="home-comp-main-prog">
                            <div className="home-comp-main-prog-inner" style={{ '--content-height': `${itemCompareHeight}rem` }}>
                                <div className="home-comp-main-prog-plates">
                                    {props.imgComparePlates}
                                </div>
                                <div className="home-comp-main-prog-dot">
                                    {props.imgCompareDotDash}
                                </div>
                                <div className="home-comp-main-prog-line" style={{'--PI': Math.PI}}>
                                    {props.plateLine}
                                </div>
                                <div className="home-comp-main-prog-list">
                                    {props.list.map(({ data }, idx) => (
                                        <h4 className={`heading h3 txt-up txt-black home-comp-main-prog-list-item${idx == index ? " active" : ""}`} key={idx}>
                                            {data.title}
                                        </h4>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="home-comp-main-item bad">
                            {props.imgCompareBad}
                            <h3 className="heading h5 txt-up txt-black home-comp-main-item-title bad">
                                Traditional Dinnerware
                            </h3>
                            <div className="home-comp-main-item-list">
                                {props.list.map(({ data }, idx) => (
                                    <p className={`txt txt-20 home-comp-main-item-list-item${idx == index ? " active" : ""}`} key={idx}>
                                        {data.other}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default HomeCompare;


