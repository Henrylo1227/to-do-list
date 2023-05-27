import Task from './Task.js'
import TaskTable from './TaskTable.js'
import { checkAllSelectors, uncheckAllSelectors } from './SelectorCheckBoxManager.js';

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
    const selectAllCheckBox = document.getElementById('select-all-checkbox');
    const removeAllBtn = document.getElementById('remove-all-btn');

    addNewTaskBtn.addEventListener('click', ()=>{
        console.log('Add new task');
        const newTask = new Task(false, 'Temp');
        taskTable.appendTaskToTable(newTask, taskTable.taskList.length);
    });
    
    selectAllCheckBox.addEventListener('click', (event)=>{
        if(event.target.checked){
            //toggle all selector as checked
            checkAllSelectors();
        }else{
            //toggle all selector as unchecked
            uncheckAllSelectors();
        }
    
    })
    //uncheck when one of all selector is unchecked
    
    removeAllBtn.addEventListener('click', ()=>{
        alert('Are you sure to remove all selected items?');
    });
    
}