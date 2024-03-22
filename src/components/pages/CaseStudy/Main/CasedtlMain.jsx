import { useEffect } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CasedtlMain(props) {

    useEffect(() => {
        animate('.casedtl-bread .line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.casedtl-bread .line', { scaleX: 1 }, { duration: 1, at: 0 }],
        ]
        let abc = 0
        document.querySelectorAll('.casedtl-bread .casedtl-bread-link-wrap').forEach((item, idx) => {
            const txt = new SplitType(item.querySelector('.casedtl-bread-link'), { types: 'lines, words', lineClass: 'split-line' })
            const slash = item.querySelector('.casedtl-bread-div') && item.querySelector('.casedtl-bread-div')

            abc = abc + idx + ((txt.words.length < 2) && txt.words.length)

            animate(txt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            sequence.push(
                [txt.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.1), at: .1 + .1 * abc }],
            )
            if (slash) {
                animate(slash, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
                sequence.push(
                    [slash, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.1), at: .1 + .1 * (abc + txt.words.length) }],
                )
            }
        })
        inView('.casedtl-bread', () => {
            timeline(sequence).finished.then(() => {
            })
        }, { margin: "0px 0px 0px 0px" })
    }, [])
    return (
        <div className="casedtl-main">
            <div className="casedtl-bread">
                <div className="casedtl-bread-link-wrap">
                    <a href="/" className="txt txt-20 txt-bold casedtl-bread-link">
                        Home
                    </a>
                    <div className="txt txt-14 txt-semi casedtl-bread-div">/</div>
                </div>
                <div className="casedtl-bread-link-wrap">
                    <a href="/kase-studies" className="txt txt-20 txt-bold casedtl-bread-link">
                        Kase studies
                    </a>
                    <div className="txt txt-14 txt-semi casedtl-bread-div">/</div>
                </div>
                <div className="casedtl-bread-link-wrap">
                    <a href={`/kase-studies/${props.data.category.toLowerCase().replaceAll(' ', '-')}`} className="txt txt-20 txt-bold casedtl-bread-link casedtl-bread-link-cate">
                        {props.data.category}
                    </a>
                </div>
                <div className="line"></div>
            </div>
            <div className="casedtl-content">
                <div className="casedtl-content-head">
                    <div className="casedtl-content-title-wrap">
                        <h1 className="heading h3 txt-up txt-black casedtl-content-title">
                            {props.data.title[0].text}
                        </h1>
                        {props.data.sub_title && (
                            <h2 className="heading h6 txt-up txt-black casedtl-content-sub txt-green">
                                {props.data.sub_title}
                            </h2>
                        )}
                    </div>
                    <div className="casedtl-content-client-img">
                        {props.clientLogo}
                    </div>
                    <div className="line"></div>
                </div>
                <div className="casedtl-content-richtext richtext">
                    {props.content}
                    <div className="holder"></div>
                </div>
            </div>
        </div>
    )
}

export default CasedtlMain