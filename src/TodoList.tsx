import React from 'react';
import {FilterValuesType} from "./App";


type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskId:number) => void
    onChangeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export const TodoList = (props: TodoListPropsType) => {
    const taskItems = props.tasks.map((item: TaskType) => {
        return (<li key = {item.id}>
            <input type="checkbox" checked={item.isDone}/>
            <span>{item.title}</span>
            <button onClick={() => {props.removeTask(item.id)}}>X</button>
        </li>)
    });
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button onClick={()=>{props.onChangeFilter('all')}}>All</button>
                <button onClick={() => {props.onChangeFilter('active')}}>Active</button>
                <button onClick={() => {props.onChangeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};

