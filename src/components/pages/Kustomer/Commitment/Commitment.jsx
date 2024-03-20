import "./Commitment.scss"
import KustomerCommitMain from "./CommitmentMain"

function KustomerCommitment({ ...props }) {
    return (
        <section className="kustomer-commit">
            <div className="container grid">
                <div className="heading h3 txt-black txt-up kustomer-commit-subtitle">Kanak's Commitment to Excellence </div>
                <h1 className="heading h0 txt-black txt-up kustomer-commit-title">Precision Packaged, Performance Proven</h1>
                <KustomerCommitMain listItem={props.list} />
            </div>
        </section>
    )
}

export default KustomerCommitment