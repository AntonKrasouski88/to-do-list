import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksObjType = {
    [key: string]: Array<TaskType>
}

function App() {
    /*let[todolists,setTodolists]=useState<Array<todolistsType>>([
        {id:v1(),title:'What to learn',filter:'all'},
        {id:v1(),title:'What to buy',filter:'all'},
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/
    //let [filter, setFilter] = useState<FilterValuesType>("all");
    let todoListID1=v1();
    let todoListID2=v1();

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksObjType>({
        [todoListID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoListid: string, id: string) {
        //let filteredTasks = tasks.filter(t => t.id != id);
        setTasks({...tasks, [todoListid]: tasks[todoListid].filter(el => el.id !== id)});
    }

    function addTask(todoListid: string, title: string) {
        //let task = {id: v1(), title: title, isDone: false};
        //let newTasks = [task, ...tasks];
        setTasks({...tasks, [todoListid]: [{id: v1(), title: title, isDone: false},...tasks[todoListid]]});
    }

    function changeStatus(todoListid: string, taskId: string, newIsDone: boolean) {
        //let task = tasks.find(t => t.id === taskId);
        //if (task) {
        //    task.isDone = isDone;
        //}

        setTasks({...tasks, [todoListid]: tasks[todoListid].map(el => el.id === taskId ? {...el, isDone: newIsDone}: el)});
    }


    function changeFilter(todoListid: string, value: FilterValuesType) {
        console.log(todoListid)
        setTodoLists(todoLists.map(el=> el.id === todoListid ? {...el, filter: value}: el));
    }

    function addTitle (title: string) {
        let newTodoLists: todoListsType = {id: v1(), title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoLists]);
        setTasks({[newTodoLists.id]: [],...tasks})
    }
    function changeTitleTask (todoListed: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todoListed]: tasks[todoListed].map(value => value.id === taskId ? {...value, title: newTitle}: value)})
    }

    function changeListName (todoListedID: string, newTitle: string) {
        setTodoLists([...todoLists.map(value=> value.id===todoListedID ? {...value, title: newTitle}: value)])
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTitle}/>
            {
                todoLists.map (value => {
                    let tasksForTodolist = tasks[value.id];

                    if (value.filter === "active") {
                        tasksForTodolist = tasks[value.id].filter(t => !t.isDone);
                    }
                    if (value.filter === "completed") {
                        tasksForTodolist = tasks[value.id].filter(t => t.isDone);
                    }

                    return (

                        <Todolist
                            key = {value.id}
                            id = {value.id}
                            title={value.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={value.filter}
                            changeTitleTask = {changeTitleTask}
                            changeListName={changeListName}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
