const {getCheckedSelectorList} = require("./SelectorManager.js");
<<<<<<< HEAD
const AlertController = require('../../AlertModule/controller/alertController.js');
const { MyAlert, SUCCESS, FAILURE } = require('../../AlertModule/model/myAlert.js')
const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const { response } = require("express");
const { removeATaskFromServer } = require("./loadTasksController.js");


function attachRemoveTaskBtnListener(task, index){
    // attach remove task btn listner for one task
    const btn = $('#del-' + index);
    if (btn != null) {
      btn.on('click', () => {
        removeATaskFromServer(task.getTaskId()).then((taskList) => {
            // reload view
        });
      });
    } else {
      console.log('btn object is null, taskId: ' + index);
    }
}
=======
>>>>>>> parent of 53e9e0c (aborts changes)

function removeTaskInit(table){
    $('#remove-selected-btn').on('click', ()=>{
        const selectedTasks = getCheckedSelectorList();
        const selectedTaskIdList = [];
        selectedTasks.forEach( (e) => {
            console.log(e.id.slice(7));
            selectedTaskIdList.push(e.id.slice(7));//select-n --> n; extract the taskId from the html checkbox id 
        });
        removeSelectedTasks(table, selectedTaskIdList);
    });
}


//remove a task with taskid from table
function removeATask(table, taskId){
    const tempList = [];
    for (let i = 0; i < table.taskList.length; i++) {
      if (i != taskId) {
        tempList.push(table.taskList[i]);
      }
    }
    table.taskList = tempList;
    //Todo: update database
    table.reloadTableUI();
}

//remove a number of task with a list of taskid from table
function removeSelectedTasks(table, taskIdList){
    const tempList = [];
    for (let i = 0; i < table.taskList.length; i++){
        if (!(i in taskIdList)){
            tempList.push(table.taskList[i]);
        }
    }
    table.taskList = tempList;
    //Todo: update database

    table.reloadTableUI();
}

module.exports = {removeTaskInit, removeATask};