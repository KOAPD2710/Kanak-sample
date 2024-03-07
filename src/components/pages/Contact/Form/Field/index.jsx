import { createContext, useContext, forwardRef, useId  } from "react"
import cn from 'clsx';
import s from './style.module.scss'

const FormFieldContext = createContext();
const FormField = ({ name, render, ...props }) => {
    return (
        <FormFieldContext.Provider value={{ name }}>
            {props.children}
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        // ...fieldState,
    }
}

const FormItemContext = createContext();

const FormItem = forwardRef(({ className, ...props }, ref) => {
    const id = useId();
    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                className={cn("heading h5 txt-black txt-up", className, s.field )}
                ref={ref}
                {...props}
            >
                {props.children}
                <span className={s.fieldLine}>
                    <span className={s.fieldLineInner}></span>
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