import { forwardRef } from "react"
import cn from 'clsx';
import s from './style.module.scss'

const Input = forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            ref={ref}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
            className={cn("heading h5 txt-black txt-up", s.input, className)}
            {...props}
        />
        )
    }
)
export default Input;