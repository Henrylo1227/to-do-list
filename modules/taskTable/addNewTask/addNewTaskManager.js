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
    const modal = document.createElement('div');
    modal.className = 'create-new-task-modal';
    modal.tabIndex = '-1';
    modal.role = 'dialog';
    
    const modalDialog = document.createElement('div');
    modal.id = 'create-new-task-modal-dialog';
    modalDialog.role = 'document';
    modal.appendChild(modalDialog);

    const modalContent = document.createElement('div');
    modal.id = 'create-new-task-modal-content';
    modalDialog.appendChild(modalContent);

    const modalHeader = document.createElement('div');
    modal.id = 'create-new-task-modal-header';
    modalContent.appendChild(modalHeader);

    const modalTitle = document.createElement('h5');
    modalTitle.id = 'create-new-task-modal-title';
    modalHeader.appendChild(modalTitle);

    const closeBtn = document.createElement('button');
    closeBtn.id = "create-new-task-modal-title";
    closeBtn.className = 'close';
    closeBtn.ariaLabel = 'Close';
    modalHeader.appendChild(closeBtn);

    
}

function addTaskToTable(newTask, table){
    table.appendTaskToTable(newTask, table.taskList.length);
}

export {addTaskInit};