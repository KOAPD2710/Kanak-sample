import { useEffect, useState } from "react"
import { useStore } from '@nanostores/react';
import { productIndex } from '@contexts/StoreGlobal';

function ListItem({ ...props }) {
    return (
        <a href="#" className={`kustomer-cata-main-content-list-item`} onMouseEnter={(e) => { setCurrName(props.title) }}>
            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                {props.title}
            </div>
            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                {props.idx.toString().padStart(2, '0')}
            </div>
            <div className="line">
                <div className="line-inner"></div>
            </div>
            {props.isLast && (
                <div className="line line-bot"></div>
            )}
        </a>
    )
}

function CatalogueMain({ ...props }) {
    const [index, setIndex] = useState(0)
    let list = []
    props.list.forEach((item, idx) => {
        list.push(...item.list)
    })

    function navOnClick(dir) {
        // document.querySelectorAll('.kustomer-cata-main-content-list-item').forEach(el => el.classList.remove('active'))
        setIndex(dir == 'next' ? index + 1 : index - 1)
    }
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
                                <a href="#" className={`kustomer-cata-main-content-list-item ${index == (list.findIndex(listItem => listItem.uid == el.uid)) ? "active" : ''}`}
                                    onMouseEnter={(e) => { setIndex(list.findIndex(listItem => listItem.uid == el.uid)) }}
                                    key={idx}>
                                    <h3 className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                        {el.name}
                                    </h3>
                                    <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div className="line">
                                        <div className="line-inner"></div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
                {/* <div className="kustomer-cata-main-content">
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">Versatile Dinnerware</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">Made from sturdy, compostable bagasse, suitable for any retail setting.</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        <a href="#" className={`kustomer-cata-main-content-list-item ${index == 0 ? 'active' : ''}`} onMouseEnter={(e) => { setCurrName('Bowls'), setIndex(0) }}>
                            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                Bowls
                            </div>
                            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                01
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                        </a>
                        <a href="#" className={`kustomer-cata-main-content-list-item ${index == 1 ? 'active' : ''}`} onMouseEnter={(e) => { setCurrName('PLATES & Platters'), setIndex(1) }}>
                            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                PLATES & Platters
                            </div>
                            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                02
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                        </a>
                        <a href="#" className={`kustomer-cata-main-content-list-item ${index == 2 ? 'active' : ''}`} onMouseEnter={(e) => { setCurrName('CUPS'), setIndex(2) }}>
                            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                CUPS
                            </div>
                            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                03
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                            <div className="line line-bot"></div>
                        </a>
                    </div>
                </div>
                <div className="kustomer-cata-main-content">
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">ComplemeNtary Items</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">Catering to all your dining needs with a sustainable touch</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        <a href="#" className={`kustomer-cata-main-content-list-item ${index == 3 ? 'active' : ''}`} onMouseEnter={(e) => { setCurrName('Kutlery'), setIndex(3) }}>
                            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                Kutlery
                            </div>
                            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                01
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                        </a>
                        <a href="#" className={`kustomer-cata-main-content-list-item ${index == 4 ? 'active' : ''}`} onMouseEnter={(e) => { setCurrName('Straws'), setIndex(4) }}>
                            <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                                Straws
                            </div>
                            <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                                02
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                            <div className="line line-bot"></div>
                        </a>
                    </div>
                </div> */}
            </div>
            <div className="kustomer-cata-card">
                <div className="kustomer-cata-card-stick">
                    <div className="line line-top"></div>
                    <div className="line line-ver line-right"></div>
                    <div className="line line-ver line-left"></div>
                    <div className="kustomer-cata-card-inner">
                        <div className="kustomer-cata-card-top">
                            <div className="heading h6 txt-up txt-black kustomer-cata-card-top-txt">
                                Product Kategories
                            </div>
                            <div className="kustomer-cata-card-nav">
                                <button className={`kustomer-cata-card-nav-item prev${index == 0 ? ' disable' : ''}`} onClick={(e) => navOnClick('prev')}>
                                    <div className="line line-ver"></div>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                                <button className={`kustomer-cata-card-nav-item next${index == list.length - 1 ? ' disable' : ''}`} onClick={(e) => navOnClick('next')}>
                                    <div className="line line-ver"></div>
                                    <div className="ic ic-40">
                                        {props.arrIcon}
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="line line-top-mid"></div>
                        <div className="kustomer-cata-card-middle">
                            <div className="kustomer-cata-card-middle-inner">
                                {props.img}
                            </div>
                        </div>
                        <div className="line line-bot-mid"></div>
                        <div className="kustomer-cata-card-bottom">
                            <div className="kustomer-cata-card-bottom-txt-wrap">
                                {list.map((el, idx) => (
                                    <div className={`heading h5 txt-up txt-black kustomer-cata-card-bottom-txt${idx == index ? ' active' : ''}`} key={idx}>
                                        {el.name}
                                    </div>
                                ))}
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
        </div>
    )
}

export default CatalogueMain
