var {Task} = require('../component/Task.js')

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

    taskDescriptionInput.addEventListener('keypress', (event) =>{
        if (event.key === 'Enter'){
            createTaskBtn.click();
        }
    });
    
    createTaskBtn.addEventListener('click', () => {
        const taskDescription = taskDescriptionInput.value;
        if (taskDescription.trim() !== '') {
            // Perform task creation logic here
            const newTask = new Task(false, false, taskDescription.trim()); //TODO: insert new record to db
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

module.exports = {addTaskInit};