import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistid: string, taskId: string) => void
    changeFilter: (todolistid: string, value: FilterValuesType) => void
    addTask: (todolistid: string, title: string) => void
    changeTaskStatus: (todolistid: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    changeTitleTask: (todoListed: string, taskId: string, newTitle: string) => void
    changeListName: (todoListed: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const renameTodoList = (newTitle: string) => {
        props.changeListName(props.id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={renameTodoList}/></h3>
                <AddItemForm addItem={addTask}/>
                <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                    }
                    const changeTitle = (newTitle: string) => {
                        props.changeTitleTask(props.id, t.id, newTitle)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>)
}

