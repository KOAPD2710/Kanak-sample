import cn from 'clsx';


function Title({className, ...props}) {
    return (
        <>
            <div className={cn("item", className)}>
                <div className='item-inner'>
                    <h1 className="heading h1 txt-black txt-up">oops...!</h1>
                    <p className='txt txt-20 txt-med'>Maybe you got a broken link, or maybe you made a misprint in the address bar.</p>
                </div>
            </div>
        </>
    )
}

export default Title