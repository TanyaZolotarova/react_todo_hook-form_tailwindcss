export function BtnComponent({type, title, className}){
    return(
        <button type={type}
                className={className}>
            {title}
        </button>
    )
}