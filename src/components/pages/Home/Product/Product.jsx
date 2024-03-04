import { useEffect, useState } from 'react';
import './Product.scss';
import { useStore } from '@nanostores/react';
import { productIndex, prevProductIndex } from '@contexts/StoreGlobal';
import HomeProductThree from './ProductThree.jsx';
import useDevice from '@/components/hooks/useDevice.js';

function HomeProduct({...props}) {
    const index = useStore(productIndex);
    const { isDesktop, isTablet, isMobile } = useDevice();

    function onClickNavPrev(e) {
        e.preventDefault();
        prevProductIndex.set(index);
        productIndex.set(index - 1);
    }
    function onClickNavNext(e) {
        e.preventDefault();
        prevProductIndex.set(index);
        productIndex.set(index + 1);
    }
    useEffect(() => {
        console.log(index)
    }, [index])
    return (
        <section className="home-prod">
            <div className="container grid">
                {(isDesktop || isTablet) && (
                    <div className="home-prod-main">
                        <div className="home-prod-main-list">
                            {props.list.map((item, idx) => (
                                <div className={`home-prod-main-item${idx == index ? ' active':''}`} onPointerEnter={() => {
                                    prevProductIndex.set(index);
                                    productIndex.set(idx);
                                }} key={idx}>
                                    <h3 className="heading h6 txt-up txt-black home-prod-main-item-title">
                                        {item.data.title}
                                    </h3>
                                    <div className="txt txt-20 txt-bold home-prod-main-item-label">
                                        {(idx + 1) < 10 ? '0' + (idx + 1) : idx + 1}
                                    </div>
                                    <div className="line">
                                        <div className="line-inner"></div>
                                    </div>
                                    {idx == props.list.length - 1 && (
                                        <div className="line line-bottom"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="home-prod-cards">
                    <div className="home-prod-cards-inner">
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
                            <div className="home-prod-cards-middle-inner">
                                <HomeProductThree list={props.list} />
                            </div>
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
                    {isMobile && (
                        <div className='home-prod-cards-pagination'>
                            {props.list.map((_, idx) => (
                                <button className={`home-prod-cards-pagination-dot${idx == index ? ' active' : ''}`}key={idx}>
                                    <span></span>
                                </button>
                            ))}
                        </div>
                    )}
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
            </div>
        </section>
    )
}
export default HomeProduct;