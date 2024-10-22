import { useEffect, useState } from "react"
import { useStore } from '@nanostores/react';
import { getByUID } from "@/prismic";
import CatalogThreeMain from "./CatalogThree";

function CatalogueMain({ ...props }) {
    return (
        <div className="kustomer-cata-main">
            <div className="kustomer-cata-main-content-wrap">
                {props.list.map((item, idx) => (
                    <div className="kustomer-cata-main-content" key={idx}>
                        <div className="kustomer-cata-main-content-des">
                            <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">{item.title}</h3>
                            <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">{item.subtitle}</p>
                        </div>
                        <div className="kustomer-cata-main-content-list">
                            {item.list.map((el, idx) => (
                                <a
                                    key={el.uid}
                                    href="#"
                                    className={`kustomer-cata-main-content-list-item ${index == (list.findIndex(listItem => listItem.uid == el.uid)) ? "active" : ''}`}
                                    onMouseEnter={() => debounceHover(list.findIndex(listItem => listItem.uid == el.uid))}>
                                    <h3 className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                        {el.name}
                                    </h3>
                                    <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div className="line">
                                        <div className="line-inner"></div>
                                    </div>
                                    {idx === item.list.length - 1 && (
                                        <div className="line line-bot"></div>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="kustomer-cata-card">
                <div className="kustomer-cata-card-inner">
                    <div className="kustomer-cata-card-top">
                        <div className="heading h6 txt-up txt-black kustomer-cata-card-top-txt">
                            Product Kategories
                        </div>
                        <div className="kustomer-cata-card-nav">
                            <button className={`kustomer-cata-card-nav-item prev${index == 0 ? ' disable' : ''}`} onClick={() => setIndex(index - 1)}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            <button className={`kustomer-cata-card-nav-item next${index == list.length - 1 ? ' disable' : ''}`} onClick={() => setIndex(index + 1)}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="kustomer-cata-card-middle">
                        <div className="kustomer-cata-card-middle-inner">
                            <div className="kustomer-cata-card-middle-inner-canvas">
                                <CatalogThreeMain list={list} index={index} />
                            </div>
                            {/* {props.img} */}
                        </div>
                    </div>
                    <div className="kustomer-cata-card-bottom">
                        <div className="kustomer-cata-card-bottom-txt-wrap">
                            {list.map((el, idx) => (
                                <div
                                    key={idx}
                                    className={`heading h5 txt-up txt-black kustomer-cata-card-bottom-txt${idx == index ? ' active' : ''}`}>
                                    {el.name}
                                </div>
                            ))}
                        </div>
                        <div className="kustomer-cata-card-qr-wrap">
                            <div className={`kustomer-cata-card-qr`}>
                                {props.qr}
                            </div>
                            {/* {props.itemList.map((item, idx) => (
                                <div className={`kustomer-cata-card-qr${idx == index ? ' active' : ''}`} key={idx}>
                                    <img src={item.data.qr.url} alt="" className="ic ic-80" />
                                </div>
                            ))} */}
                        </div>
                    </div>
                </div>
                <div className='kustomer-cata-card-pagination'>
                    {props.list.map((_, idx) => (
                        <button className={`kustomer-cata-card-pagination-dot${idx == index ? ' active' : ''}`} key={idx}>
                            <span></span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CatalogueMain
