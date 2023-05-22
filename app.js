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
const task4 = new Task(false, 'test4');
const task5 = new Task(false, 'test5');

const tempTaskList = [];
tempTaskList.push(task1);
tempTaskList.push(task2);
tempTaskList.push(task3);
tempTaskList.push(task4);
tempTaskList.push(task5);

tempTaskList.forEach( (task, index) => { 
    taskTable.appendTaskToTable(task, index);
});
/*handled right after database input*/

addNewTaskBtn.addEventListener('click', ()=>{
    console.log('Add new task');
    const newTask = new Task(false, 'Temp');
    taskTable.appendTaskToTable(newTask, taskTable.taskList.length);
});

removeAllBtn.addEventListener('click', ()=>{
    alert('Are you sure to remove all selected items?');
});
