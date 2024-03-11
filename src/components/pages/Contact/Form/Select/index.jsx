import { forwardRef, useRef, useState, useEffect } from "react"
import cn from 'clsx';
import s from './style.module.scss'
import Input from "../Input";
import useOutsideAlerter from "@hooks/useOutsideAlerter";

const Select = forwardRef(({ className, options, onChange, ...props }, ref) => {
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputDemo, setInputDemo] = useState('');
    const [inputVal, setInputVal] = useState(props.value);

    const handleOptionClick = (value) => {
        setIsOpen(false);
        setInputVal(value);
        if (onChange) {
            onChange(value);
        }
    };

    useOutsideAlerter(selectRef, () => setIsOpen(false));
    return (
        <>
            <div className={cn({
                [s.open]: isOpen,
                [s.filled]: inputVal.length !== 0
            })} ref={selectRef} onClick={() => setIsOpen(!isOpen)}>
                <div className={cn('bg-light', s.selectToggle)}>
                    <Input
                        ref={ref}
                        placeholder={inputDemo}
                        value={inputVal || ''}
                        readOnly
                        {...props}
                    />
                    <div
                        className={cn('ic ic-40', s.selectToggleIc)}
                        style={{ transform: `rotate(${isOpen ? '180' : '0'}deg` }}
                    >
                        <svg width="100%" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.35 0.316681L10 7.95001L17.65 0.316681L20 2.66668L10 12.6667L0 2.66668L2.35 0.316681Z" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                <div className={cn('bg-light',
                    s.selectOption,
                    { [s.active]: isOpen }
                )}>
                    <div className={s.options}>
                        {options.map((opt, idx) => (
                            <span
                                key={idx}
                                onMouseEnter={() => inputVal.length === 0 && setInputDemo(opt)}
                                onMouseLeave={() => inputVal.length === 0 && setInputDemo('')}
                                onClick={() => handleOptionClick(opt)}
                                className={cn('heading h5 txt-black txt-up ', s.option, { [s.current]: inputVal === opt })}>{opt}</span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
    }
)
export default Select;