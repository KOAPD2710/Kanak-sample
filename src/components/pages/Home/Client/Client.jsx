import { useEffect } from "react";
import './Client.scss'
function HomeClient({ ...props }) {
    return (
        <section className="home-client">
            <div className="container">
                <div className="grid">
                    <div className="home-client-title-wrap">
                        <h2 className="heading h0 txt-up txt-black home-client-title">
                            {props.title}
                        </h2>
                        {props.imgQuality}
                    </div>
                    <div className="home-client-sub-wrap">
                        <p className="heading h6 txt-up txt-black home-client-sub">
                            {props.subTitle}
                        </p>
                    </div>
                    <div className="grid-holder"></div>
                    <div className="home-client-map">
                        {props.imgMap}
                    </div>
                    {props.newList}
                </div>
            </div>
        </section>
    )
}
export default HomeClient;