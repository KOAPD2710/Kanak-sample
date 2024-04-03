import "./Catalog.scss"

import CatalogMain from "./CatalogMain"

function KustomerCatalog({ label, title, describe, ...props }) {
    return (
        <section className="kustomer-cata">
            <div className="container grid">
                <div className="kustomer-cata-title-wrap">
                    <div className="heading h3 txt-black txt-up kustomer-cata-label">{label}</div>
                    <h1 className="heading h0 txt-black txt-up kustomer-cata-title">{title}</h1>
                </div>
                <div className="kustomer-cata-des">
                    <p className="txt txt-18 txt-med">{describe}</p>
                </div>
                <CatalogMain arrIcon={props.arrIcon} qr={props.qr} img={props.image} list={props.data} {...props} />
            </div>
        </section>
    )
}



export default KustomerCatalog
