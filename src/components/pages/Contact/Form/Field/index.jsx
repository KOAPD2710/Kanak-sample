import { createContext, useContext, forwardRef, useId, cloneElement, Children  } from "react"
import cn from 'clsx';
import s from './style.module.scss'

const FormFieldContext = createContext();
const FormField = ({ name, ...props }) => {
    return (
        <FormFieldContext.Provider value={{ name }}>
            {props.children}
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const { id } = useContext(FormItemContext)

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`
    }
}

const FormItemContext = createContext();

const FormItem = forwardRef(({ className, children, ...props }, ref) => {
    const id = useId();
    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                className={cn("heading h5 txt-black txt-up", className, s.field )}
                ref={ref}
                {...props}
            >
                {Children.map(children, child => {
                    return cloneElement(child, { id: `${id}-form-item` });
                })}
                <span className={cn('line line-bot', s.fieldLine)}>
                    <span className={s.fieldLineInner}></span>
                </span>
                <span className={cn('line line-ver')}>
                </span>
            </div>
        </FormItemContext.Provider>
    );
});

FormItem.displayName = "FormItem";

const FormLabel = forwardRef(({ className, ...props }, ref) => {
    const { formItemId } = useFormField()
    return (
        <label
            ref={ref}
            htmlFor={formItemId}
            className={cn(s.label, className)}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"


export {
    useFormField,
    FormItem,
    FormLabel,
    FormField
}