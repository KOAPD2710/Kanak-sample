import "./Catalogue.scss"

import CatalogueMain from "./CatalogueMain"

function KustomerCatalogue({ ...props }) {
    return (
        <section className="kustomer-cata">
            <div className="container grid">
                <div className="kustomer-cata-title-wrap">
                    <div className="heading h3 txt-black txt-up kustomer-cata-label">Product Katalog</div>
                    <h1 className="heading h0 txt-black txt-up kustomer-cata-title">Other Curated Products For <span className="txt-green">Retailers</span></h1>
                </div>
                <div className="kustomer-cata-des">
                    <p className="txt txt-18 txt-med">Explore our full range of <span className="txt-green">national brand-equivalent</span> dinnerware, made with up to 100% recycled materials, reflecting our commitment to quality and the environment. All designed with sustainability in mind.</p>
                </div>
                <CatalogueMain />
            </div>
        </section>
    )
}



export default KustomerCatalogue
