import './Footer.scss';

const ContactItem = ({ label, content, link="#" }) => {
    return (
        <div className="ft-left-body-list-item">
            <div className="txt txt-18 txt-med ft-left-body-label">{label}</div>
            <a href={link} className="heading h6 txt-up txt-black ft-left-body-txt">{content}</a>
        </div>
    )
}
const MenuItem = ({ link = "#", children }) => {
    return (
        <a href={link} className="ft-right-body-link">
            <div className="dot"></div>
            <div className="txt txt-18 txt-med ft-right-body-link-txt">{children}</div>
        </a>
    )
}
const MenuColumn = ({ title, children, tail, tail_link="#" }) => {
    return (
        <div className="ft-right-col">
            <div className="line line-left"></div>
            <div className="ft-head">
                <h3 className="heading h6 txt-up txt-black ft-right-head-title">{title}</h3>
                <div className="line line-bottom"></div>
            </div>
            <div className="ft-right-body">{children}</div>
            <div className="ft-tail">
                <div className="line line-top"></div>
                <a href={tail_link} className="txt txt-12 txt-bold txt-up ft-right-tail-link">
                    {tail}
                </a>
            </div>
        </div>
    )
}

const CopyRight = ({ children }) => {
    return (
        <>
            <div className="line line-top"></div>
            <p className="txt txt-12 txt-bold ft-copy">
                ⁠©⁠ {children} Kanak Naturals. All rights reserved.
            </p>
        </>
    )
}

function GlobalFooter(props) {
    return (
        <footer className="ft bg-light">
            <div className="line line-top"></div>
            <div className="container grid">
                <div className="ft-left">
                    <div className="ft-head">
                        <div className="ft-logo">
                            {props.logo}
                        </div>
                        <div className="line line-bottom"></div>
                    </div>
                    <div className="ft-left-body">
                        <div className="ft-left-body-list">
                            <ContactItem label="Get in touch" content="info@kanaknaturals.com" type="email" />
                            <ContactItem label="Contact" content="+1 (260) 490 4790" type="phone"/>
                            <ContactItem label="Headquarters" content="321 Hovan Drive, Fort Wayne, IN 46825, US" />
                        </div>
                        <div className="ft-left-body-social">
                            <a href="#" className="ft-left-body-social-item">
                                {props.imgLinkedIn}
                            </a>
                        </div>
                        <a href="#" className="heading h1 txt-up txt-black ft-left-body-title">
                            Let's talk!
                        </a>
                    </div>
                    <div className="ft-tail">
                        <CopyRight>{props.currYear}</CopyRight>
                    </div>
                </div>
                <div className="ft-right">
                    <MenuColumn title="Products & Services" tail="Terms & Conditions">
                        <MenuItem>Product Katalog</MenuItem>
                        <MenuItem>Private Label</MenuItem>
                        <MenuItem>Kustom Packaging Solutions</MenuItem>
                        <MenuItem>Testing, QC & Compliance</MenuItem>
                    </MenuColumn>
                    <MenuColumn title="Kustomers" tail="Privacy Policy">
                        {props.list?.map((item, idx) => {
                            return (
                                <MenuItem link={`/kustomer/${item.uid}`} key={idx}>{item.data.title}</MenuItem>
                            )
                        })}
                    </MenuColumn>
                    <MenuColumn title="Kustomers" tail="Back to top">
                        <MenuItem>Our story</MenuItem>
                        <MenuItem>Awards and Endorsements</MenuItem>
                        <MenuItem>Sustainability</MenuItem>
                        <MenuItem>Logistics Capabilities</MenuItem>
                        <MenuItem>Distribution Network</MenuItem>
                        <MenuItem>Resources</MenuItem>
                        <MenuItem>Kareers</MenuItem>
                    </MenuColumn>
                </div>
                <div className='ft-copyright-mb'>
                    <CopyRight>{props.currYear}</CopyRight>
                </div>
            </div>
        </footer>
    )
}

export default GlobalFooter;