

function ListItem() {
    return (
        <div className="kustomer-cata-main-content-list-item">
            <div className="heading h4 txt-black txt-up kustomer-cata-main-content-list-item-inner">Bowls</div>
        </div>
    )
}

function CatalogueMain({ ...props }) {
    return (
        <div className="kustomer-cata-main">
            {[...Array(2)].map((el, idx) => (
                <div className="kustomer-cata-main-content" key={idx}>
                    <div className="kustomer-cata-main-content-des">
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">Versatile Dinnerware</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">Made from sturdy, compostable bagasse, suitable for any retail setting.</p>
                    </div>
                    <div className="kustomer-cata-main-content-list">
                        <ListItem />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CatalogueMain
