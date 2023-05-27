import Task from '../Task.js';
import TaskTable from '../TaskTable.js';

function addTaskInit(table){

    const addNewTaskBtn = document.getElementById('add-new-task-btn');

    addNewTaskBtn.addEventListener('click', ()=>{
        showCreateNewTaskModalForm(table);
    });
    
}

//create a modal form to collect infomation on new task
function showCreateNewTaskModalForm(table){
    $('#addTaskModal').modal('show');
    const createTaskBtn = document.getElementById('createTaskBtn');
    const taskDescriptionInput = document.getElementById('taskDescription');
    
    createTaskBtn.addEventListener('click', () => {
    const taskDescription = taskDescriptionInput.value;
    if (taskDescription.trim() !== '') {
        // Perform task creation logic here
        console.log('Creating task:', taskDescription);
        const newTask = new Task(false, false, taskDescription.trim());
        addTaskToTable(newTask, table);

        // Reset the input field
        taskDescriptionInput.value = '';

        // Close the modal
        $('#addTaskModal').modal('hide');
    }
    });
}

function addTaskToTable(newTask, table){
    table.appendTaskToTable(newTask, table.taskList.length);
}

export {addTaskInit};