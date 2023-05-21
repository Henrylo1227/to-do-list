import Task from './modules/Task.js'
import TaskTable from './modules/TaskTable.js'

const taskTable = new TaskTable();
taskTable.createTaskTableUI();

const addNewTaskBtn = document.getElementById('add-new-task-btn');
const removeAllBtn = document.getElementById('remove-all-btn');


/*sample data*/
const task1 = new Task(false, 'test1');
const task2 = new Task(false, 'test2');
const task3 = new Task(false, 'test3');

const tempTaskList = [];
tempTaskList.push(task1);
tempTaskList.push(task2);
tempTaskList.push(task3);

tempTaskList.forEach( (task, index) => { 
    taskTable.appendTaskToTable(task, index+1);
});

addNewTaskBtn.addEventListener('click', ()=>{
    console.log('Add new task');
    const newTask = new Task(false, 'Temp');
    taskTable.appendTaskToTable(newTask, taskTable.getTaskNum()+1);
});

removeAllBtn.addEventListener('click', ()=>{
    alert('Are you sure to remove all selected items?');
});