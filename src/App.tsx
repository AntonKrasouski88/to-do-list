import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";


//CRUD - create read update delete
//GUI - graphic user interface
//CLI - древний Common line interface


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
        {id: 4, title: "React", isDone: true},
    ])

    const[filter, setFilter] = React.useState<FilterValuesType>("all")

    const onChangeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

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
                title={"What to learn"}
                removeTask={removeTask}
                onChangeFilter={onChangeFilter}
            />
        </div>
    );
}

export default App;
