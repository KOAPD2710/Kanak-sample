import './Header.scss'
import { Fragment, useEffect, useRef } from 'react';
import { getLenis } from '@/components/core/lenis';
function HeaderGlobal(props) {
    useEffect(() => {
        getLenis().on('scroll', function(inst) {
            if (inst.direction == 1) {
                if (inst.scroll >= document.querySelector('.header').clientHeight) {
                    document.querySelector('.header-div-main').classList.add('on-hide')
                    document.querySelector('.header-div-sub').classList.add('on-hide')
                } else {
                    document.querySelector('.header-div-main').classList.remove('on-hide')
                    document.querySelector('.header-div-sub').classList.remove('on-hide')
                }
            } else if (inst.direction == -1) {
                document.querySelector('.header-div-main').classList.remove('on-hide')
                document.querySelector('.header-div-sub').classList.remove('on-hide')
            }
        })
    }, [])
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
                                        <a href={page.link} className="txt txt-14 txt-up txt-semi txt-link">{page.name}</a>
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
                    <div className="header-toggle">
                        <button className="txt txt-16 txt-semi txt-up header-toggle-link">
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
            <div className="header header-div-sub">
                <div className="container grid">
                    <a href="/contact" className="header-cta">
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
        </>
    )
}

export default HeaderGlobal;