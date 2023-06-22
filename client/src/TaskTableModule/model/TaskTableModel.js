const { loadTasksFromServer } = require("../controller/loadTasksController");
const { createAListofTaskView, createTaskTableView } = require ("../view/TaskTableView");
const { Task } = require('../component/Task');
const { TaskTable } = require("../component/TaskTable");
const { DisplayAlert } = require("../../AlertModule/controller/alertController");
const { MyAlert, FAILURE, CONNECT_ERROR } = require("../../AlertModule/model/myAlert");
const { attachCheckTaskBtnListener } = require("../controller/checkTaskManager"); //TODO change manager into controller
const { attachRemoveTaskBtnListener } = require('../controller/removeTaskManager'); //TODO change manager into controller

    // Methods
function tableInit() {
    // return an initialized table object
    const table = new TaskTable();
        // create table views
        createTaskTableView();
        loadTableContent();

    return table;
}

function loadTableContent(){
    //load data from database and show it in views with its button listener attached
        // load data from database
        loadTasksFromServer().then( (taskList)=>{
            const newTaskList = createAListOfTask(taskList); // cast each task into class Task
            // create views
            createAListofTaskView(newTaskList);

            // attach button listers to the table elements
            attachTableElementBtnListeners(newTaskList);

        }).catch( (error) =>{
            DisplayAlert(new MyAlert(FAILURE), 'Failed to retreive data from database');
            throw (error);
        });
}

function createAListOfTask(taskList){
    // cast each task element in the list into class Task
    // create a List of Tasks (class) but not key value pairs
    // parameter: a list of task, in key-value pair
    // return: a list of task of class task 
    let resultList = [];
    taskList.forEach((task)=>{
        const newTask = new Task (task.task_id, false, task.check_state, task.description);
        resultList.push(newTask);
    });
    return resultList;
}

function attachTableBtnListeners(){
    // attach button listener for tha table itself
}

function attachTableElementBtnListeners(taskList) {
    // attach button listeners for a list of task

    taskList.forEach( (task, index) => {
        // remove btn listner
        attachRemoveTaskBtnListener(task, index);
        // check task btn listner
        attachCheckTaskBtnListener(task, index); 
    })
}
module.exports = {tableInit, loadTableContent}