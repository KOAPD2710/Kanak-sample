import "./Main.scss";
import * as prismicH from "@prismicio/client";
import { useEffect } from 'react';
import { convertDate } from "@utils/text.js"
import ResDtlRel from "./ResourceDtlRel";

function ResourceMain({ ...props }) {
    useEffect(() => {
        document.querySelectorAll(".resource-dtl-richtxt-main.richtext .block-img").forEach((el, idx) => {
            if (el.querySelector('img').getAttribute('alt') !== "") {
                let caption = document.createElement("p")
                caption.innerHTML = el.querySelector('img').getAttribute('alt')
                caption.classList.add("block-img-caption")
                el.appendChild(caption)
            }
        })
    }, [])
    return (
        <section className="resource-dtl">
            <div className="container grid">
                <div className="txt txt-20 txt-bold resource-dtl-bread">
                    <a href="/">Home</a>
                    <div className="txt txt-14 txt-semi resource-dtl-bread-div">/</div>
                    <a href="/resources">Resource</a>
                    <div className="txt txt-14 txt-semi resource-dtl-bread-div">/</div>
                    <a href={`/resources/${props.data.category.toLowerCase().replaceAll(" ", "-")}`}>
                        {props.data.category}
                    </a>
                </div>
                <h1 className="heading h0 txt-black txt-up resource-dtl-title">{props.data.title}</h1>
                <div className="line resource-dtl-line"></div>
                <div className="resource-dtl-info">
                    <div className="line"></div>
                    <div className="resource-dtl-info-stick">
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Category
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {props.data.category}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Updated date
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {convertDate(props.last_publication_date)}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Read time
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {props.data.read_time}
                                {props.data.read_time <= 1 ? " Minute" : " Minutes"}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item link">
                            <a href="" className="resource-dtl-info-item-link">{props.icShare}</a>
                            <a href="" className="resource-dtl-info-item-link">{props.icFacebook}</a>
                            <a href="" className="resource-dtl-info-item-link">{props.icLinked}</a>
                        </div>
                    </div>
                </div>
                <div className="resource-dtl-richtxt">
                    <div className="line line-ver"></div>
                    <div className="resource-dtl-richtxt-wrapper">
                        <div className="resource-dtl-richtxt-premble-img">
                            <img
                                src={props.data.feature_image.url}
                                alt={props.data.feature_image.alt}
                                width={props.data.feature_image.dimensions.width}
                                className="img img-fill" />
                        </div>
                        <h2 className="heading h5 txt-black txt-up resource-dtl-richtxt-premble-sapo">{props.data.sapo}</h2>
                        <div className="txt txt-20 txt-med resource-dtl-richtxt-main richtext" dangerouslySetInnerHTML={{ __html: prismicH.asHTML(props.data.content) }}></div>
                    </div>
                </div>
                <div className="line resource-dtl-line"></div>
                <ResDtlRel
                    list={props.relList}
                    icArrow={props.arrIcon}
                    client:visible>
                </ResDtlRel>
            </div>
        </section>
    )
}


export default ResourceMain