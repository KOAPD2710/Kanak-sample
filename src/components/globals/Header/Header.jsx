import './Header.scss'
import { Fragment, useEffect, useRef, useState } from 'react';
import {offset, parseRem} from '@/js/utils';
import { getLenis } from '@/components/core/lenis';
function HeaderGlobal(props) {
    const [navOpen, setNavOpen] = useState(false)
    useEffect(() => {
        getLenis().on('scroll', function(inst) {
            if (inst.direction == 1) {
                if (inst.scroll >= document.querySelector('.header').clientHeight) {
                    document.querySelector('.header-div-main').classList.add('on-hide')
                    document.querySelector('.header-div-sub').classList.add('on-hide')
                    document.querySelectorAll('.header-dropdown').forEach(el => el.classList.remove('active'))
                    document.querySelector('.header').classList.remove('on-open')
                } else {
                    document.querySelector('.header-div-main').classList.remove('on-hide')
                    document.querySelector('.header-div-sub').classList.remove('on-hide')
                }
            } else if (inst.direction == -1) {
                document.querySelector('.header-div-main').classList.remove('on-hide')
                document.querySelector('.header-div-sub').classList.remove('on-hide')
            }
        })
        window.addEventListener('click', function(e){   
            if (document.querySelector('.header-dropdowns').contains(e.target) || document.querySelector('.header-main').contains(e.target)){
                
            } else {
                if (document.querySelectorAll('.header-dropdown.active').length == 1 ) {
                    document.querySelectorAll('.header-dropdown').forEach(el => el.classList.remove('active'))
                    document.querySelector('.header').classList.remove('on-open')
                }
            }
          });
    }, [])
    function menuOnClick(e) {
        e.preventDefault()
        let dropdownEl = document.querySelector(`.header-dropdown[data-dropdown="${e.target.getAttribute('data-dropdown')}"]`)
        if (!dropdownEl.classList.contains('active')) {
            document.querySelectorAll('.header-dropdown').forEach(el => el.classList.remove('active'))
            document.querySelector('.header').classList.add('on-open')
            dropdownEl.classList.add('active')
        } else {
            document.querySelectorAll('.header-dropdown').forEach(el => el.classList.remove('active'))
            document.querySelector('.header').classList.remove('on-open')
        }
        dropdownEl.style.top = `${document.querySelector('.header-main').getBoundingClientRect().height}px`
        dropdownEl.style.left = `${e.target.getBoundingClientRect().left - parseRem(20)}px`
    }

    return (
        <>
            <header className="header header-div-main">
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
                                            <a href={page.type == 'dropdown' ? '#' : page.link} data-dropdown={page.name} className="header-menu-item-link txt-link" onClick={page.type == 'dropdown' ? (e) => {menuOnClick(e)} : null}>
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
            <div className="header-dropdowns">
                {props.pages.map((page, idx) => {
                    if (page.type == 'dropdown') {
                        return (
                            <div className="header-dropdown" key={idx} data-dropdown={page.name}>
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
            <div className="header header-div-sub">
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
                    <div className="container grid"></div>
                </div>
            </div>
        </>
    )
}

export default HeaderGlobal;