import { forwardRef } from "react"
import cn from 'clsx';
import s from './style.module.scss'

const TextArea = forwardRef(({ className, type, onChange, ...props }, ref) => {
    function handleOnChange(e) {
        onChange(e);
        let textarea = e.target;

        textarea.style.height = 'inherit';

        // Get the computed styles for the element
        const computed = window.getComputedStyle(textarea);

        // Calculate the height
        const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                        + textarea.scrollHeight
                        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        textarea.style.height = `${height}px`;
    };
    return (
        <textarea
            type={type}
            ref={ref}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-lpignore="true"
            className={cn("heading h5 txt-black txt-up", s.textarea, className )}
            onChange={handleOnChange}
            {...props}
        />
        )
    }
)

export default TextArea