import { Fragment, useEffect, useRef, useMemo, useState } from "react";

function HomeClient({ ...props }) {
    console.log(props);
    return (
        <section className="home-client">
            <div className="container">
                <div className="grid">
                    <div className="home-client-title-wrap">
                        <h2 className="heading h0 txt-up txt-black home-client-title" dangerouslySetInnerHTML={{ __html: props.title }}>
                            {/* <Fragment set:html={props.newTitle} /> */}
                            {/* <Image src={quality} alt="quality" className="home-client-title-quality" width={quality.width / 2}/> */}
                            {}
                            {/* <Fragment class="home-client-title-quality" dangerouslySetInnerHTML={{ __html: props.img_quality }}/> */}
                        </h2>
                    </div>
                    <div className="home-client-sub-wrap">
                        <p className="heading h6 txt-up txt-black home-client-sub">
                            {props.subTitle}
                        </p>
                    </div>
                    <div className="grid-holder"></div>
                    <div className="home-client-map">
                        {props.img_map}
                    </div>
                    {/* {props.children} */}
                </div>
            </div>
        </section>
    )
}
export default HomeClient;