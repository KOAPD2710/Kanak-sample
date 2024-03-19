import "./Service.scss"
import ServiceMain from "./ServiceMain";

function KustomerService({ ...props }) {
    return (
        <section className="kustomer-service">
            <div className="container grid">
                <div className="kustomer-service-title-stick">
                    <h1 className="heading h0 txt-black txt-up kustomer-service-title">Serving Every Shelf with Excellence</h1>
                </div>
                <ServiceMain listItem={props.list}></ServiceMain>
            </div>
        </section>
    )
}



export default KustomerService