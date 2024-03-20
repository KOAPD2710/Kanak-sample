import { useRef, useEffect } from 'react';
import './Product.scss';
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';
import { scroll } from "motion"

function HomeProduct(props) {
    const sectionRef = useRef();
    const index = useStore(productIndex);
    function onClickNavPrev(e) {
        e.preventDefault();
        productIndex.set(index - 1);
    }
    function onClickNavNext(e) {
        e.preventDefault();
        productIndex.set(index + 1);
    }
    useEffect(() => {
        console.log('init')
        scroll(({y}) => {
            if (y.progress >= .9) {
                sectionRef.current.classList.add('active')
            } else {
                productIndex.set(0)
                sectionRef.current.classList.remove('active')
            }
        }, {
            target: document.querySelector('.home-prod-cards-inner'),
            offset: ["start end", "center center"]
        })
    }, [])
    return (
        <>
            <div className="home-prod-cards">
                <div className="home-prod-cards-inner" ref={sectionRef}>
                    <div className="home-prod-cards-top">
                        <div className="heading h6 txt-up txt-black home-prod-cards-top-txt">
                            Product Kategories
                        </div>
                        <div className="home-prod-cards-nav">
                            <button className={`home-prod-cards-nav-item prev${index == 0 ? ' disable':''}`} onClick={onClickNavPrev}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            <button className={`home-prod-cards-nav-item next${index == props.list.length - 1 ? ' disable':''}`} onClick={onClickNavNext}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="home-prod-cards-middle">
                        <div className="home-prod-cards-middle-inner"></div>
                    </div>
                    <div className="home-prod-cards-bottom">
                        <div className="home-prod-cards-bottom-txt-wrap">
                            {props.list.map((item, idx) => (
                                <div className={`heading h5 txt-up txt-black home-prod-cards-bottom-txt${idx == index ? ' active' : ''}`} key={idx}>
                                    {item.data.title}
                                </div>
                            ))}
                        </div>
                        <div className="home-prod-cards-qr-wrap">
                            {props.list.map((_, idx) => (
                                <div className={`home-prod-cards-qr${idx == index ? ' active' : ''}`} key={idx}>
                                    {props.sampleQR}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='home-prod-cards-pagination'>
                    {props.list.map((_, idx) => (
                        <button className={`home-prod-cards-pagination-dot${idx == index ? ' active' : ''}`}key={idx}>
                            <span></span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="home-prod-pdf">
                <a href="#" className="home-prod-pdf-link">
                    <div className="home-prod-pdf-link-ic">
                        {props.PDFIcon}
                    </div>
                    <div className="txt txt-20 txt-med home-prod-pdf-link-txt">
                        Download Catalog
                    </div>
                </a>
            </div>
        </>
                
    )
}
export default HomeProduct;