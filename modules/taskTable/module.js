import Task from './Task.js'
import TaskTable from './TaskTable.js'
import { selectorInit } from './selectTask/SelectorCheckBoxManager.js';

export function TableInit(){
    const taskTable = new TaskTable();
    taskTable.createTaskTableUI();

    loadSampleData(taskTable);
    addButtonListeners();

}

function loadSampleData(table){
    /*sample data*/
    const task1 = new Task(false, 'test1');
    const task2 = new Task(false, 'test2');
    const task3 = new Task(false, 'test3');
    const task4 = new Task(false, 'test4');
    const task5 = new Task(false, 'test5');
    
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

//add all button listeners
function addButtonListeners(){
    const addNewTaskBtn = document.getElementById('add-new-task-btn');

    //Add new task to the table
    addNewTaskBtn.addEventListener('click', ()=>{
        console.log('Add new task');
        const newTask = new Task(false, 'Temp');
        taskTable.appendTaskToTable(newTask, taskTable.taskList.length);
    });
    const selectAllCheckBox = document.getElementById('select-all-checkbox');
    
    selectorInit();
    
    //remove selected tasks
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    removeSelectedBtn.addEventListener('click', ()=>{
        alert('Are you sure to remove all selected items?');
    });
    
}