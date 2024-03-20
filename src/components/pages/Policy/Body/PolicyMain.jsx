import './PolicyMain.scss'
import { useEffect, useState } from 'react';
import * as ut from "@/js/utils"
import { getLenis } from '@/components/core/lenis';


function PolicyMain({ ...props }) {
    const [activeToc, setActiveToc] = useState(0)

    function activeScrollTo(e) {
        let header = ut.dom('.header-div-main')
        let el = ut.dom(`.policy-body-main-richtxt h2[data-scrollto="${e.target.getAttribute('data-scrollto')}"]`)
        getLenis().scrollTo(el, {
            offset: -header.clientHeight
        })
    }

    function ActiveTocFunc() {
        let allHeading = ut.dom('.policy-body-main-richtxt h2');
        getLenis().on('scroll', function(inst) {
            for (let i = 0; i < allHeading.length; i++) {
                let top = allHeading[i].getBoundingClientRect().top;
                if (top > 0 && top < (window.innerHeight / 4)) {
                    setActiveToc(i)
                }
            }
        })
    }
    useEffect(() => {
        ActiveTocFunc();
    }, [])

    return (
        <section className="policy-main">
            <div className="container grid">
                <div className="policy-update">
                    <div className="txt txt-20 txt-med policy-update-txt">Last updated {props.last_update}</div>
                    <div className="line"></div>
                </div>
                <div className="policy-navtitle">
                    <div className="txt txt-20 txt-black txt-up policy-navtitle-txt">Navigation</div>
                    <div className="line"></div>
                    <div className="line line-ver"></div>
                </div>
                <div className="policy-nav">
                    <ul className="policy-nav-list">
                        {props.title_list.map((el, idx) => (
                            <li key={idx} className={`policy-nav-item ${idx == activeToc ? 'active' : ''}`}>
                                <button className='txt txt-18 txt-med policy-nav-item-link' onClick={(e) => { activeScrollTo(e) }} data-scrollto={encodeURI(el.content)}>{el.content.charAt(0).toUpperCase() + el.content.substring(1).toLowerCase()}</button>
                            </li>
                        ))}
                    </ul>
                    <div className="line"></div>
                    <div className="line line-ver"></div>
                </div>
                <div className="policy-body">
                    <div className="line"></div>
                    <div className="policy-body-main">
                        <div className="txt txt-20 txt-med policy-body-main-richtxt">
                            {props.content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PolicyMain