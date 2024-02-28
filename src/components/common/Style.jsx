function Style({ children, global = "false" }) {
    return (
        <style {...{ jsx : "true", global : global}}>
            {children}
        </style>
    )
}

export default Style;