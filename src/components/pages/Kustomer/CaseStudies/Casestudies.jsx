import "./Casestudies.scss";

import CaseStudiesMain from "./CasestudiesMain";

function KustomerCaseStudies({ ...props }) {

    return (
        <section className="kustomer-kasestu">
            <div className="container grid">
                <div className="heading h4 txt-black txt-up kustomer-kasestu-label">KASE STUDIES</div>
                <h1 className="heading h0 txt-black txt-up kustomer-kasestu-title">REAL STORIES, REAL IMPACT</h1>
                <div className="kustomer-kasestu-des">
                    <p className="txt txt-18 txt-med kustomer-kasestu-des-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <a href="/kase-studies" className="txt txt-18 txt-med kustomer-kasestu-des-link">View all kase studies</a>
                </div>
                <CaseStudiesMain list={props.list} />
            </div>
        </section>
    )
}


export default KustomerCaseStudies