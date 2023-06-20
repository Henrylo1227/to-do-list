var {Task} = require('../component/Task.js')
const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const { MyAlert, SUCCESS, FAILURE } = require('../../AlertModule/model/myAlert.js');

function addTaskInit(table, alertController){

    const addNewTaskBtn = document.getElementById('add-new-task-btn');

    addNewTaskBtn.addEventListener('click', ()=>{
        showCreateNewTaskModalForm(table, alertController);
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
            const newTask = new Task("temp", false, false, taskDescription.trim());
            axios({
                method: 'post',
                url: '/todo/add-task',
                data: {
                    description: taskDescription.trim(),
                }
            }).then(()=>{
                // on success
                
                // show in notification
                addTaskToTable(newTask, table);
    
                // Reset the input field
                taskDescriptionInput.value = '';
    
                // Close the modal
                $('#addTaskModal').modal('hide');


                // alert
                const alert = new MyAlert(SUCCESS, `Task ${description} is added`);
                alertController.addAlert(alert);

            }).catch(() => {
                // alert
                const alert = new MyAlert(FAILURE, `Failed to create new task`);
                console.debug('failed to create new task')
            });
        }  
    });

}

function addTaskToTable(newTask, table){
    table.appendTaskToTable(newTask, table.taskList.length);
}

module.exports = {addTaskInit};