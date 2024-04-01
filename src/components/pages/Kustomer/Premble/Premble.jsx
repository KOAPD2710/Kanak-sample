import "./Premble.scss"

function KustomerPremble({ ...props }) {
    return (
        <section className="kustomer-premble bg-dark">
            <div className="container grid">
                <h3 className="heading h4 txt-black txt-up kustomer-premble-title">{props.title}</h3>
            </div>
        </section>
    )
}

export default KustomerPremble