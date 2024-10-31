export function TextFieldComponent({type, checked, onChange, className}) {
    return (
        <input
            type={type}
            checked={checked}
            onChange={onChange}
            className={className}
        />
    )
}