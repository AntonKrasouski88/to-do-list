import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskId:string) => void
    onChangeFilter: (filter: FilterValuesType) => void
    addTask: (title:string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] =useState<string>("")
    const taskItems = props.tasks.map((item: TaskType) => {
        return (<li key = {item.id}>
            <input type="checkbox" checked={item.isDone}/>
            <span>{item.title}</span>
            <button onClick={() => {props.removeTask(item.id)}}>X</button>
        </li>)
    });
    const onClickAddTask = ()=>{
        props.addTask(title)
        setTitle("")
    };
    const onDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && onClickAddTask()
    const onChangeAddTask = (event: ChangeEvent<HTMLInputElement>) => setTitle((event.currentTarget.value))

    //const onClickSetFilterAll =() => {props.onChangeFilter('all')
    //const onClickSetFilterActive =() => {props.onChangeFilter('active')
    //const onClickSetFilterAll =() => {props.onChangeFilter('completed')

    const onClickSetFilterCreate =(filter:FilterValuesType) => () => props.onChangeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeAddTask}
                       onKeyDown={onDownAddTask}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>{taskItems}</ul>
            <div>
                <button onClick={onClickSetFilterCreate('all')}>All</button>
                <button onClick={onClickSetFilterCreate('active')}>Active</button>
                <button onClick={onClickSetFilterCreate('completed')}>Completed</button>
            </div>
        </div>
    );
};

