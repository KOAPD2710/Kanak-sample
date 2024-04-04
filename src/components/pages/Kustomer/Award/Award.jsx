import "./Award.scss"
import { useEffect } from "react"
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function KustomerAward({ ...props }) {

    useEffect(() => {

        const title = new SplitType('.kustomer-award-content-title', { types: 'lines, words', lineClass: 'split-line' })
        const label = new SplitType('.kustomer-award-content-label', { types: 'lines, words', lineClass: 'split-line' })
        const describe = new SplitType('.kustomer-award-content-des p', { types: 'lines, words', lineClass: 'split-line' })

        animate('.kustomer-award-content-img img', { opacity: 0, transform: "scale(.8) translateY(40%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(describe.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.kustomer-award-content-btn', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate('.kustomer-award-product-qr-wrap', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate('.kustomer-award-product', { opacity: 0, transform: "translateY(10%)" }, { duration: 0 })


        const sequence = [
            ['.kustomer-award-product', { opacity: 1, transform: "none" }, { duration: 1, at: 0 }],
            ['.kustomer-award-content-img img', { opacity: 1, transform: "scale(1) translateY(0)" }, { duration: .6, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: .1 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: .2 }],
            [describe.words, { opacity: 1, transform: 'none' }, { duration: .3, delay: stagger(.004), at: .3 }],
            ['.kustomer-award-product-qr-wrap', { opacity: 1, transform: "none" }, { duration: .6, at: .5 }],
            ['.kustomer-award-content-btn', { opacity: 1, transform: "none" }, { duration: .6, at: .6 }],
        ]

        inView(".kustomer-award", () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                describe.revert()
                document.querySelector('.kustomer-award-content-btn').removeAttribute('style')
                document.querySelector('.kustomer-award-content-img img').removeAttribute('style')
                document.querySelector('.kustomer-award-product-qr-wrap').removeAttribute('style')
                document.querySelector('.kustomer-award-content-btn').removeAttribute('style')
            })
        }, { margin: "-40% 0px -40% 0px" })
    }, [])
    return (
        <section className="kustomer-award">
            <div className="container grid">
                <div className="kustomer-award-product">
                    <div className="kustomer-award-product-inner"></div>
                    <div className="kustomer-award-product-img">
                        <div className="kustomer-award-product-img-three"></div>
                        {props.imgPlate}
                    </div>
                    <div className="kustomer-award-product-qr">
                        <div className="kustomer-award-product-qr-wrap">
                            <img src={props.qr.url} alt={props.qr.alt} />
                        </div>
                    </div>
                </div>
                <div className="kustomer-award-content">
                    <div className="kustomer-award-content-img">
                        <img src={props.medal.url} alt={props.medal.alt} />
                    </div>
                    <div className="heading h4 txt-black txt-up kustomer-award-content-label">
                        {props.label}
                    </div>
                    <h1 className="heading h0 txt-black txt-up kustomer-award-content-title">
                        {props.title}
                    </h1>
                    <div className="txt txt-18 txt-med kustomer-award-content-des">
                        {props.describe}
                    </div>
                    <div className="kustomer-award-content-btn">
                        <a href="#" className="btn kustomer-award-content-btn-inner" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-20 txt-med txt-up" data-cursor-txtlink-child>{props.btn}</div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerAward