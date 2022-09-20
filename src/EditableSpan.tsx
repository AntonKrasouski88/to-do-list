import React, {ChangeEvent, useState} from "react";



type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [statusSpan, setStatus] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState('')
    const onDoubleClickHandler = () => {
        setStatus(true);
        setNewTitle(props.title)
    }
    const onBlurHandler = () => {
        setStatus(false);
        props.changeTitle(newTitle)
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return statusSpan
        ? <input value={newTitle} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
}