import './Hero.scss'
import { useEffect } from 'react'
import SplitType from 'split-type'
import { animate, inView, stagger, timeline } from 'motion';

function ContactHero(props) {
    useEffect(() => {
        const title = new SplitType('.contact-hero-title', {types: 'lines,words', lineClass: 'split-line'});
        animate(title.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        inView('.contact-hero-title', () => {
            animate(title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}).finished.then(() => {
                title.revert()
            })
        }, {margin: '-20% 0px -20% 0px'})

        const allItems = document.querySelectorAll('.contact-info-item')
        allItems.forEach((el, idx) => {
            const label = new SplitType(el.querySelector('.contact-info-item-label'), {types: 'lines,words', lineClass: 'split-line'});
            const title = new SplitType(el.querySelector('.contact-info-item-link'), {types: 'lines,words', lineClass: 'split-line'});
            animate([...label.words, ...title.words], {transform: 'translateY(1.2rem)', opacity: 0}, {duration: 0})
            const sequence = [
                [label.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.04), at: .2 + idx * .1}],
                [title.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.04), at: .4 + idx * .1}]
            ]
            inView('.contact-info-list', () => {
                timeline(sequence).finished.then(() => {
                    label.revert()
                    title.revert()
                })
            }, {margin: '-30% 0px -30% 0px'})
        })
        animate('.contact-info-list .line-top', {scaleX: 0, transformOrigin: 'left'}, {duration: 0})
        inView('.contact-info-list', () => {
            animate('.contact-info-list .line-top', {scaleX: 1}, {duration: 1, delay: .2}).finished.then(() => {
                document.querySelector('.contact-info-list .line-top').removeAttribute('style')
            })
        }, {margin: '-30% 0px -30% 0px'})
    }, [])
    return (
        <>
            <section className="contact-hero">
                <div className="container grid">
                    <h1 className='heading h0 txt-black txt-up contact-hero-title'>{props.title}</h1>
                </div>
            </section>
            <section className="contact-info">
                <div className="container">
                    <div className='contact-info-list grid'>
                        <div className="line line-top"></div>
                        {props.info_list.map((item,idx) => (
                            <div className="contact-info-item" key={idx}>
                                <div className="txt txt-18 txt-med contact-info-item-label">{item.label}</div>
                                {item.link.url ? (
                                    <a href={item.link.url} target={item.link.target} className="txt txt-20 txt-black txt-up txt-link contact-info-item-link">{item.content}</a>
                                ) : (
                                    <div className="txt txt-20 txt-black txt-up contact-info-item-link">{item.content}</div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactHero