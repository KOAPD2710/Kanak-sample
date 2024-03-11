import './Header.scss'
import { Fragment } from 'react';

function HeaderGlobal(props) {
    return (
        <header className="header">
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
                <div className="header-flag">
                    <div className="header-flag-head">
                        {props.headFlag}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderGlobal;