var {Task} = require('./Task.js');
var {TaskTable} = require('./TaskTable.js'); 

const {addTaskInit} = require('./addNewTask/addNewTaskManager.js');
const {removeTaskInit} = require('./removeTask/removeTaskManager.js');
const {selectorInit} = require('./selectTask/SelectorManager.js');
const {checkTaskInit} = require('./checkTask/checkTaskManager.js');

const axios = require('./../../../node_modules/axios/dist/browser/axios.cjs');

module.exports = { TableInit }

function TableInit(){
    const taskTable = new TaskTable();
    taskTable.createTaskTableUI();

    // data
    //retrieve task data from database
    axios('/data/taskTable').then( (res)=>{
        console.log(`TableInit: successfully retrieve table data: ${res.data}`);
        const dataList = res.data;
        console.log(dataList);
        loadDataFromList(taskTable, dataList);
    }).catch((error)=>{
        console.error(`TableInit: failed to retrieve table data: ${error.message}`);
    });


    //loadSampleData(taskTable);
    loadModules(taskTable);

}


//TODO: load data from database
function loadDataFromList(table, dataList){
    dataList.forEach((task, index)=>{
        const tempTask = new Task(task.task_id, false, task.check_status, task.description);
        table.appendTaskToTable(tempTask, index);
    });
}   

// sample data
function loadSampleData(table){
    /*sample data*/
    const task1 = new Task("01",false, false, 'test1');
    const task2 = new Task("04",false, false, 'test2');
    const task3 = new Task("02",true, true, 'test3');
    const task4 = new Task("24",false, false, 'test4');
    const task5 = new Task("ok",false, false, 'test5');
    
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

// read data from db

//add all button listeners
function loadModules(table){

    //addNewTask Module
    addTaskInit(table);

    //selectTask Module
    selectorInit();
    
    //removeTask Module
    removeTaskInit(table);

    //checkTask Module
    checkTaskInit(table);
    
}