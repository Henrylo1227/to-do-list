var {Task} = require('./Task.js');
var {TaskTable} = require('./TaskTable.js'); 

const {addTaskInit} = require('./addNewTask/addNewTaskManager.js');
const {removeTaskInit} = require('./removeTask/removeTaskManager.js');
const {selectorInit} = require('./selectTask/SelectorManager.js');
const {checkTaskInit} = require('./checkTask/checkTaskManager.js');


module.exports = { TableInit }

function TableInit(){
    const taskTable = new TaskTable();
    taskTable.createTaskTableUI();

    //loadSampleData(taskTable);
    loadModules(taskTable);

}


//TODO: load data from database
function loadDataFromJson(table, json){
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