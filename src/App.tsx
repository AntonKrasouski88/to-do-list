import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";
import {v1} from "uuid";


//CRUD - create read update delete
//GUI - graphic user interface
//CLI - древний Common line interface


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const toDoListTitle = "What to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "React", isDone: true},
    ])
    const[filter, setFilter] = React.useState<FilterValuesType>("all")

    const onChangeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    // Lesson 3 (import v1, addTask) устанавливаем "uuid": "^8.3.2"
    // "@types/uuid": "^8.3.4",
    const addTask =(title:string) => {
        /*const newTask: TaskType ={
            id: v1(),
            title, // тоже самое title: title (когда ключ значение совпадает)
            isDone: false,
        }*/
        /*const copyTask = [...tasks];
        copyTask.push(newTask)*/
        setTasks([{id: v1(), title, isDone: false},...tasks]) // краткая форма записи без newTask
    }

    //UI
    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(task => !task.isDone)
            break
        default:
            tasksForRender = tasks
    }


    return (
        <div className="App">
            <TodoList
                tasks={tasksForRender}
                title={toDoListTitle}
                removeTask={removeTask}
                onChangeFilter={onChangeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
