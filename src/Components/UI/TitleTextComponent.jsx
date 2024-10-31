import {memo} from "react";

export const TitleTextComponent = memo(function TitleTextComponent({title}) {
    return (
        <h1 className="text-2xl font-semibold font-serif text-center mb-4">{title}</h1>
    )
})