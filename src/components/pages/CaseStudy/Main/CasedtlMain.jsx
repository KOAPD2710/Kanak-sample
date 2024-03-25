import { useEffect } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CasedtlMain(props) {

    useEffect(() => {

        // BreadCrum Animation
        animate('.casedtl-bread .line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const allItems = document.querySelectorAll('.casedtl-bread .casedtl-bread-link-wrap')
        let allText = []
        let splitList = []
        allItems.forEach((item, idx) => {
            const label = new SplitType(item.querySelector('.casedtl-bread-link'), { types: 'lines, words', lineClass: 'split-line' })
            splitList.push(label)
            animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            let slash;
            if (idx != allItems.length - 1) {
                slash = item.querySelector('.casedtl-bread-div')
                animate(slash, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
                allText.push(...label.words, slash)
            } else {
                allText.push(...label.words)
            }

        })
        const sequence = [
            ['.casedtl-bread .line', { scaleX: 1 }, { duration: 1, at: 0 }],
            [allText, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .1 }]
        ]
        inView('.casedtl-bread', () => {
            timeline(sequence).finished.then(() => {
                splitList.forEach(el => el.revert())
                document.querySelectorAll('casedtl-bread-div').forEach(el => el.removeAttribute('style'))
            })
        }, { margin: "0px 0px 0px 0px" })

        // End BreadCrum Animation


        // Main Animation
        let mainSplit = []
        const title = new SplitType('.casedtl-content-title', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.casedtl-content-client-img', { opacity: 0, transform: 'scale(.8)' }, { duration: 0 })
        animate('.casedtl-content-head .line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

        const mainSequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: 1 }],
            ['.casedtl-content-client-img', { opacity: 1, transform: 'none' }, { duration: .5, at: "-.3" }],
        ]

        if (document.querySelector('.casedtl-content-sub')) {
            const subTitle = new SplitType('.casedtl-content-sub', { types: 'lines, words', lineClass: 'split-line' })
            animate(subTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

            mainSequence.push(
                [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.03), at: "-.3" }],
            )
            mainSplit.push(subTitle)

        }
        mainSequence.push(
            ['.casedtl-content-head .line', { scaleX: 1 }, { duration: .8, at: "<.56" }],
        )

        document.querySelectorAll('.casedtl-content-richtext astro-slot *').forEach((item, idx) => {
            const richTxt = new SplitType(item, { types: 'lines', lineClass: 'split-line' })
            animate(richTxt.lines, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            mainSequence.push(
                [richTxt.lines, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.05), at: `<` }]
            )
            mainSplit.push(richTxt)
        })

        inView('.casedtl-main', () => {
            timeline(mainSequence).finished.then(() => {
                title.revert()
                mainSplit.map((split, idx) => {
                    split.revert()
                })
                document.querySelector('.casedtl-content-client-img').removeAttribute('style')
                document.querySelector('.casedtl-content-head .line').removeAttribute('style')
            })
        }, { margin: "0px 0px 0px 0px" })

        // End Main Animation

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