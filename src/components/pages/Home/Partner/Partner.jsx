import { useEffect, useRef } from "react";
import { animate, stagger, inView, scroll } from "motion";
import './Partner.scss';
import useSelector from "@hooks/useSelector";
import SplitType from 'split-type';

function HomePartner(props) {
    const ref = useRef();
    const q = useSelector(ref);
    function activeIcon(idx, listIcon) {
        if (!listIcon[idx].classList.contains('done')) {
            listIcon[idx].classList.add('done')
            animate(listIcon[idx], { opacity: 1, scale: 1 }, {duration: .3}).finished.then(() => {
                listIcon[idx].removeAttribute('style')
            })
        }
    }
    function activeTitle(idx, listTitle, listTitleSplit) {
        if (!listTitle[idx].classList.contains('done')) {
            listTitle[idx].classList.add('done')
            animate(listTitleSplit[idx].words, { transform: 'none', opacity: 1}, {duration: .6, delay: stagger(.03)}).finished.then(() => {
                listTitleSplit[idx].revert()
            })
        }
    }
    useEffect(() => {
        let sectionBotOffset;
        if (window.innerWidth > 767) {
            sectionBotOffset = window.innerHeight * 1.9
            let offsetMargin = Math.abs(parseFloat(window.getComputedStyle(q('.home-part-line-main')).marginLeft));
            let dis = q('.home-part-line-wrap').clientWidth - (offsetMargin * (window.innerWidth > 991 ? 2 : 2.055))
            scroll(({y}) => {
                animate(q('.home-part-line-wrap'), {x: -dis * y.progress}, {duration: 0})
            }, {
                target: ref.current,
                offset: ["100px start", `${1 - sectionBotOffset / ref.current.clientHeight} end`]
            })
        }

        let listTitle = document.querySelectorAll('.home-part-line-content-title');

        let listIcon = document.querySelectorAll('.home-part-line-content-ic');
        [...listIcon, ...listTitle].forEach((el) => {
            el.classList.remove('done')
        })
        let listTitleSplit = [...listTitle].map((item) => {
            let title = new SplitType(item, { types: 'lines, words', lineClass: 'split-line' });
            animate(title.words, { transform: 'translateY(100%)', opacity: 0 }, {duration: 0});
            return title;
        })

        animate('.home-part-line-content-ic', { opacity: 0, scale: .8 }, {duration: 0});
        if (window.innerWidth > 767 ) {
            scroll(({y}) => {
                animate('.home-part-line-main path', {strokeDasharray: `${y.progress}, 1` }, {duration: 0})
            }, {
                target: ref.current,
                offset: [`-70vh start`, `${1 - sectionBotOffset / ref.current.clientHeight} end`]
            })
        }
        listIcon.forEach((el,idx) => {
            inView(el, () => {
                activeIcon(idx,listIcon)
            }, { margin: "-20% -40% -20% -5%" })
        })
        listTitle.forEach((el,idx) => {
            inView(el, () => {
                activeTitle(idx, listTitle, listTitleSplit)
            }, { margin: "-20% -40% -20% -5%" })
        })
    },[])
    return (
        <section className="home-part" ref={ref}>
            <div className="home-part-stick">
                <div className="container bg-light">
                    <div className="home-part-inner">
                        <div className="home-part-line-wrap">
                            <div className="img img-h home-part-line-main">
                                <svg height="100%" viewBox="0 0 6199 1375" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeDasharray="0, 1" strokeDashoffset="0" pathLength="1" strokeLinecap="round" d="M804.137 0V1025.5C804.137 1516.5 426.137 960.5 1011.14 1208.5C1172.7 1276.99 1157.75 937.898 1302.14 926.5C1454.14 914.5 1538.14 1054.5 1613.14 981.5C1688.14 908.5 1520.14 599.5 1681.14 534.5C1820.74 478.142 1869.14 664.5 2063.14 709.5C2257.14 754.5 2481.14 743.5 2623.14 786.5C2765.14 829.5 2777.34 686.352 2834.14 567.846C2905.14 419.715 3094.14 485.448 3083.14 620.618C3072.14 755.788 2998.64 1067.24 3150.14 1129.82C3324.14 1201.7 3300.14 966.876 3553.14 966.876L3862.14 967.412C4117.14 967.412 4110.14 749.5 4246.14 801.5C4443.96 877.136 4359.14 1107.5 4439.32 1151.49C4564.8 1220.33 4503.65 869.294 4684.14 822.5C4765.14 801.5 4851.14 881.5 4941.14 801.5C5031.14 721.5 5008.14 585.5 5240.14 585.5" stroke="#3D3D3D" strokeWidth=".4rem"/>
                                </svg>
                            </div>
                            <div className="home-part-line-content">
                                {/* All follow svg's hieght = 100vh */}
                                <div className="home-part-line-content-item item-1">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc1}
                                    </div>
                                    <h3 className="heading h2 txt-up txt-black home-part-line-content-title">
                                        Since the time of hunters and gatherers 12,000 years ago<span className="hide-mb">...</span>
                                    </h3>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title">
                                        <span className="hide-dk">Since the time of hunters and gatherers 12,000 years ago</span><span className="hide-mb">....</span>humanity has evolved to become the <span className="txt-green">caretakers </span><span className="txt-green">of the Earth...</span>
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-2">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc2}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        It's essential that we embrace this role with a sense of adventure and strong <span className="txt-green">commitment to safeguard our </span><span className="txt-green">precious planet...</span>
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-3">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc3}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        As guardians of the earth, it falls upon us to <span className="txt-green">advocate for </span><span className="txt-green">conservation...</span>
                                    </h3>
                                </div>
                                <div className="home-part-line-content-item item-4">
                                    <div className="home-part-line-content-ic bg-light">
                                        {props.partIc4}
                                    </div>
                                    <h3 className="heading h3 txt-up txt-black home-part-line-content-title home-part-line-content-title-center">
                                        with the goal of passing on a world that is harmonious and flourishing with life to <span className="txt-green">future generations.</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePartner;