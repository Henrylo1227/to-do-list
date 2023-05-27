import Task from './Task.js';
import TaskTable from './TaskTable.js';
import { addTaskInit } from './addNewTask/addNewTaskManager.js';
import { selectorInit } from './selectTask/SelectorManager.js';

export function TableInit(){
    const taskTable = new TaskTable();
    taskTable.createTaskTableUI();

    loadSampleData(taskTable);
    addButtonListeners(taskTable);

}

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

//add all button listeners
function addButtonListeners(table){

    //Add new task to the table
    addTaskInit(table);

    selectorInit();
    
    //remove selected tasks
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    removeSelectedBtn.addEventListener('click', ()=>{
        alert('Are you sure to remove all selected items?');
    });
    
}