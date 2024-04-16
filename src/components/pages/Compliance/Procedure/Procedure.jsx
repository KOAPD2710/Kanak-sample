import './Procedure.scss'

function ComplianceProcedure({ ...props }) {
    return (
        <section className='complian-proce'>
            <div className="container grid">
                <div className="heading h4 txt-black txt-up complian-proce-label">Excellence is Non-Negotiable</div>
                <h1 className="heading h0 txt-black txt-up complian-proce-label">Rigorous Testing Procedures </h1>
                <div className="complian-proce-sub-wrap">
                    <p className="txt txt-20 txt-med complian-proce-sub">Kanak’s quality control team champions a thorough testing process that ensures each product we offer stands up to even the most challenging situations.</p>
                </div>
                <a href="/contact"></a>
            </div>
        </section>
    )
}

export default ComplianceProcedure