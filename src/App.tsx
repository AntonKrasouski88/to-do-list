import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {TaskType} from "./TodoList";

//GRUD - create read update delete
//GUI - graphic user interface

function App() {
    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false}
    ]
    const tasks_2: Array<TaskType> = [
        {id: 1, title: "React", isDone: true},
        {id: 2, title: "Angular", isDone: false},
        {id: 3, title: "Vue", isDone: false}
    ]
    const tasks_3: Array<TaskType> = [
        {id: 1, title: "PHP", isDone: false},
        {id: 2, title: "Python", isDone: false},
        {id: 3, title: "Go", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList tasks = {tasks_1} title= "What to learn"/>
            <TodoList tasks = {tasks_2} title= "What to study"/>
            <TodoList tasks = {tasks_3} title= "What to read"/>
        </div>
    );
}

export default App;
