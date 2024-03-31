import { useState } from "react"
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';


function ListItem({...props}) {
    return (
        <a href="#" className="kustomer-cata-main-content-list-item">
            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                Bowls
            </div>
            <div className="txt txt-20 txt-med kustomer-cata-main-content-list-item-count">
                {props.idx.toString().padStart(2, '0')}
            </div>
            <div className="line"></div>
        </a>
    )
}

function CatalogueMain({ ...props }) {
    const index = useStore(productIndex);
    function onClickNavPrev(e) {
        e.preventDefault();
        productIndex.set(index - 1);
    }
    function onClickNavNext(e) {
        e.preventDefault();
        productIndex.set(index + 1);
    }
    return (
        <div className="kustomer-cata-main">
            <div className="kustomer-cata-main-content-wrap">
                {[...Array(2)].map((el, idx) => (
                    <div className="kustomer-cata-main-content" key={idx}>
                        <div className="kustomer-cata-main-content-des">
                            <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">Versatile Dinnerware</h3>
                            <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">Made from sturdy, compostable bagasse, suitable for any retail setting.</p>
                        </div>
                        <div className="kustomer-cata-main-content-list">
                            <div className="line kustomer-cata-main-content-list-line"></div>

                            {[...Array(3)].map((el, idx) => (
                                <ListItem idx={idx + 1} key={idx} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="kustomer-cata-card">
                <div className="line line-top"></div>
                <div className="line line-ver line-right"></div>
                <div className="line line-ver line-left"></div>
                <div className="kustomer-cata-card-inner">
                    <div className="kustomer-cata-card-top">
                        <div className="heading h6 txt-up txt-black kustomer-cata-card-top-txt">
                            Product Kategories
                        </div>
                        <div className="kustomer-cata-card-nav">
                            <button className={`kustomer-cata-card-nav-item prev${index == 0 ? ' disable':''}`} onClick={onClickNavPrev}>
                                <div className="line line-ver"></div>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            <button className={`kustomer-cata-card-nav-item next`} onClick={onClickNavPrev}>
                                <div className="line line-ver"></div>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            {/* <button className={`kustomer-cata-card-nav-item next${index == props.list.length - 1 ? ' disable':''}`} onClick={onClickNavNext}>
                                <div className="line line-ver"></div>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button> */}
                        </div>
                    </div>
                    <div className="line line-top-mid"></div>
                    <div className="kustomer-cata-card-middle">
                        <div className="kustomer-cata-card-middle-inner"></div>
                    </div>
                    <div className="line line-bot-mid"></div>
                    <div className="kustomer-cata-card-bottom">
                        <div className="kustomer-cata-card-bottom-txt-wrap">
                            <div className={`heading h5 txt-up txt-black kustomer-cata-card-bottom-txt`}>
                                Bowls
                            </div>
                            {/* {props.list.map((item, idx) => (
                                <div className={`heading h5 txt-up txt-black kustomer-cata-card-bottom-txt${idx == index ? ' active' : ''}`} key={idx}>
                                    {item.data.name}
                                </div>
                            ))} */}
                        </div>
                        <div className="kustomer-cata-card-qr-wrap">
                            <div className="line line-ver"></div>
                            <div className={`kustomer-cata-card-qr`}>
                                {props.qr}
                            </div>
                            {/* {props.itemList.map((item, idx) => (
                                <div className={`kustomer-cata-card-qr${idx == index ? ' active' : ''}`} key={idx}>
                                    <img src={item.data.qr_code.url} alt="" className="ic ic-80" />
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
                <div className="line line-bot"></div>
            </div>
        </div>
    )
}

export default CatalogueMain
