import './Header.scss'
import cn from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import { parseRem } from '@/js/utils';
import { getLenis } from '@/components/core/lenis';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
function HeaderGlobal(props) {
    const dropdownRef = useRef();
    const [navOpen, setNavOpen] = useState(false);
    const [dropdownIdx, setDropdownIdx] = useState(-1);
    const [isHide, setIsHide] = useState(false);

    useOutsideAlerter(dropdownRef, () => setDropdownIdx(-1));
    useEffect(() => {
        getLenis().on('scroll', function(inst) {
            if (inst.direction == 1) {
                if (inst.scroll >= document.querySelector('.header').clientHeight) {
                    setIsHide(true);
                    setDropdownIdx(-1);
                } else {
                    setIsHide(false);
                }
            } else if (inst.direction == -1) {
                setIsHide(false);
            }
        })
    }, [])
    function menuOnClick(e, idx) {
        e.preventDefault()
        let dropdownEl = document.querySelector(`.header-dropdown[data-dropdown-idx="${idx}"]`)
        setDropdownIdx(idx);
        setIsHide(false);
        dropdownEl.style.top = `${document.querySelector('.header-main').getBoundingClientRect().height}px`
        dropdownEl.style.left = `${e.target.getBoundingClientRect().left - parseRem(20)}px`
    }
    console.log(props);
    return (
        <>
            <header className={cn("header header-div-main", { "on-open": dropdownIdx >= 0, "on-hide": isHide })}>
                <div className="container grid">
                    <div className="header-main">
                        <div className="header-main-inner">
                            <a href="/" className="header-logo">
                                {props.logo}
                            </a>
                            <div className="header-menu">
                                {props.pages.map((page, idx) => (
                                    <Fragment key={idx}>
                                        <div className="header-menu-item">
                                            <a
                                                href={page.type == 'dropdown' ? '#' : page.link}
                                                data-dropdown-idx={idx}
                                                className="header-menu-item-link txt-link"
                                                onClick={(e) => {
                                                    if (page.type != 'dropdown') return;
                                                    menuOnClick(e, idx);
                                                }}>
                                                <span className="txt txt-14 txt-up txt-semi">{page.name}</span>
                                            </a>
                                        </div>
                                        {idx !== props.pages.length - 1 && (
                                            <span className="txt txt-14 txt-semi txt-div">/</span>
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="header-sub">
                        <div className="ic ic-32">
                            {props.recycleIc}
                        </div>
                        <div className="txt txt-10 txt-med header-sub-txt">
                            <span className="txt-semi header-sub-label">
                                Sustainable Lifecycle:
                            </span>
                            From plant to product to compost and back again, Kanak is all about coming full circle.
                        </div>
                    </div>
                    <div className={`header-toggle ${navOpen ? 'active' : ''}`}>
                        <button className="txt txt-16 txt-semi txt-up header-toggle-link" onClick={() => (setNavOpen(!navOpen))}>
                            <span className="header-toggle-link-txt header-toggle-link-txt-open active">
                                Menu
                            </span>
                            <span className="header-toggle-link-txt header-toggle-link-txt-close">
                                Close
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="header-dropdowns" ref={dropdownRef}>
                {props.pages.map((page, idx) => {
                    if (page.type == 'dropdown') {
                        return (
                            <div className={cn("header-dropdown", { "active": idx === dropdownIdx })} key={idx} data-dropdown-idx={idx}>
                                <div className="header-dropdown-inner bg-light">
                                    {page.sub_menu.map((el, idx) => (
                                        <a href={el.url} className="header-dropdown-item" key={idx}>
                                            <span className="txt txt-14 txt-up txt-semi">{el.name}</span>
                                            <div className="header-dropdown-item-ic">
                                                <div className="ic ic-16">
                                                    {props.extIcon}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={cn("header header-div-sub", { "on-hide": isHide })}>
                <div className="container grid">
                    <a href="/contact" className="header-cta" data-cursor="hide">
                        <div className="header-cta-head">
                            {props.headFlag}
                        </div>
                        <div className='txt txt-16 txt-up txt-black header-cta-body' style={{ backgroundImage: `url('${props.bodyFlag}')` }}>
                            Request a quote
                        </div>
                        <div className="header-cta-tail">
                            {props.tailFlag}
                        </div>
                    </a>
                </div>
            </div>
            <div className="nav ">
                <div className={`nav-inner bg-light ${navOpen ? 'active' : ''}`}>
                    <div className="container grid">
                        <div className="nav-info">
                            <div className="line line-ver"></div>
                            <div className="nav-info-wrap">
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Get in touch</div>
                                    <a href="mailto:info@kanaknaturals.com" target='_blank' className="heading h6 txt-black txt-up nav-info-item-content">info@kanaknaturals.com</a>
                                </div>
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Contact</div>
                                    <a href="tel:+1 (260) 490 4790" className="heading h6 txt-black txt-up nav-info-item-content">+1 (260) 490 4790</a>
                                </div>
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Headquarters</div>
                                    <a href="https://maps.app.goo.gl/YxM91MZmzBCW5F1C6" target='_blank' className="heading h6 txt-black txt-up nav-info-item-content">321 Hovan Drive, Fort Wayne, IN 46825, US</a>
                                </div>
                                <a href="/contact" className="btn btn-lg btn-wide nav-info-btn">
                                    <div className="heading txt-16 txt-black txt-up">Request a quote</div>
                                </a>
                            </div>
                            <div className="txt txt-16 txt-semi nav-info-footer">⁠©⁠ {props.currYear} KANAK NATURALS </div>
                        </div>
                        <div className="nav-main" data-lenis-prevent="#">
                            <div className="nav-main-wrap">
                                {props.pages.map((page, idx) => (
                                    <div className="nav-main-item" key={idx}>
                                        <div className="nav-main-item-head">
                                            <h2 className="heading h3 txt-black txt-up nav-main-item-head-txt">{page.name}</h2>

                                        </div>
                                        <div className="line"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderGlobal;