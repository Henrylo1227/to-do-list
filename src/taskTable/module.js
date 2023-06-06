import Task from './Task.js';
import TaskTable from './TaskTable.js';
import { addTaskInit } from './addNewTask/AddNewTaskManager.js';
import { removeTaskInit } from './removeTask/removeTaskManager.js';
import { selectorInit } from './selectTask/SelectorManager.js';
import { checkTaskInit } from './checkTask/checkTaskManager.js';

export function TableInit(){
    const taskTable = new TaskTable();
    taskTable.createTaskTableUI();

    loadSampleData(taskTable);
    loadModules(taskTable);

}

// sample data
function loadSampleData(table){
    /*sample data*/
    const task1 = new Task(false, false, 'test1');
    const task2 = new Task(false, false, 'test2');
    const task3 = new Task(true, true, 'test3');
    const task4 = new Task(false, false, 'test4');
    const task5 = new Task(false, false, 'test5');
    
    const tempTaskList = [];
    tempTaskList.push(task1);
    tempTaskList.push(task2);
    tempTaskList.push(task3);
    tempTaskList.push(task4);
    tempTaskList.push(task5);
    //add sample data to the table
    tempTaskList.forEach( (task, index) => { 
        table.appendTaskToTable(task, index);
    });
    /*handled right after database input*/
}

// read data from db

//add all button listeners
function loadModules(table){

    //addNewTask Module
    addTaskInit(table);

    //selectTask Module
    selectorInit();
    
    //removeTask Module
    removeTaskInit(table);

    //checkTask Module
    checkTaskInit(table);

    
}