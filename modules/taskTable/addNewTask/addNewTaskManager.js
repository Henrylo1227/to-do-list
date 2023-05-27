import Task from '../Task.js';
import TaskTable from '../TaskTable.js';

function addTaskInit(table){

    const addNewTaskBtn = document.getElementById('add-new-task-btn');

    addNewTaskBtn.addEventListener('click', ()=>{
        createNewTaskModalForm();
        const newTask = new Task(false, false, 'Temp');
        addTaskToTable(newTask, table);
    });
    
}

//create a modal form to collect infomation on new task
function createNewTaskModalForm(){

}

function addTaskToTable(newTask, table){
    table.appendTaskToTable(newTask, table.taskList.length);
}

export {addTaskInit};