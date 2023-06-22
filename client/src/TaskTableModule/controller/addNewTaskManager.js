var { Task } = require('../component/Task.js')
const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const { MyAlert, SUCCESS, FAILURE } = require('../../AlertModule/model/myAlert.js');
const { DisplayAlert } = require('../../AlertModule/controller/alertController.js')

function addTaskInit(table) {

    const addNewTaskBtn = $('#add-new-task-btn').on('click', () => {
        showCreateNewTaskModalForm(table);
    })

    // modal
    const createTaskBtn = $('#createTaskBtn').on('click', () => {
        createTaskBtn.disabled = true;
        const taskDescription = $('#taskDescription').val();
 
        if (taskDescription.trim() !== '') {
            console.log(`button clicked ${taskDescription}`);
            // Perform task creation logic here
            const newTask = new Task("fun", false, false, taskDescription.trim());
            axios({
                method: 'post',
                url: '/todo/add-task',
                data: {
                    description: taskDescription.trim(),
                }
            }).then(() => {
                // on success
                addTaskToTable(newTask, table);
                // Reset the input field
                $('#taskDescription').val('');

                // Close the modal
                $('#addTaskModal').modal('hide');

                LoadData(table);

                // alert
                const alert = new MyAlert(SUCCESS, `create task ${taskDescription} successfully`);
                DisplayAlert(alert);
                createTaskBtn.disabled = false;


            }).catch((error) => {
                // alert
                const alert = new MyAlert(FAILURE, `failed to create task ${taskDescription}`);
                DisplayAlert(alert);

                console.error(`failed to create task: ${error.message}`);
            });
        }

    });

    $('#taskDescription').on('keypress', (event) => {
        if (event.key === 'Enter') {
            createTaskBtn.click();
        }
    });

}

//create a modal form to collect infomation on new task
function showCreateNewTaskModalForm(table) {
    $('#addTaskModal').modal('show');
    const taskDescriptionInput = document.getElementById('taskDescription');
}

function addTaskToTable(newTask, table) {
    table.appendTaskToTable(newTask, table.taskList.length);
}

module.exports = { addTaskInit };