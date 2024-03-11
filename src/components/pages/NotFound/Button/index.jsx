import cn from 'clsx';

function Button({ className, ...props }) {
    return (
        <>
            <div className={cn("item", className)}>
                <a href="./" className='btn'>
                    <div className="txt txt-18 txt-med txt-up">Back to home</div>
                </a>
            </div>
        </>
    )
}

export default Button