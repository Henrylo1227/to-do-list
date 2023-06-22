const {getCheckedSelectorList} = require("./SelectorManager.js");
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

function removeTaskInit(table){
    /*
    $('#remove-selected-btn').on('click', async ()=>{
        console.log('remove-selected-btn clicked');
        let selectedList = getCheckedSelectorList();
        let selectedTaskIdList = [];
        selectedList = getCheckedSelectorList();
        selectedTaskIdList = [];
        selectedList.forEach((e) =>{
            const taskIndex = e.id.slice(7); // Index in taskList
            const taskId = table.taskList[taskIndex].getTaskId(); //todo TASK ID IS SET IN DATABASE FROM THIS POINT NEWLY CREATED TASK DOES NOT HAVE TASK ID
            console.log(`Extracted task ID: ${taskId}`);
            selectedTaskIdList.push(taskId);
        });
        removeSelectedTasks(table, selectedTaskIdList);
    });
    */
}

//remove a number of task with a list of taskid from table
async function removeSelectedTasks(table, selectedTaskIdList){
    // database connected to server
    await axios({
        method: 'post',
        url: '/todo/remove-a-list-of-task',
        data: {
            taskIdList: selectedTaskIdList,
        }
    }).then(() =>{
        // alert
        console.debug(`removeSelectedTasks: successfully remove tasks: ${selectedTaskIdList.join(', ')}`);
        const alert = new MyAlert(SUCCESS, "Successfully remove selected tasks");
        AlertController.DisplayAlert(alert);
    }).catch((error)=>{
        //alert
        const alert = new MyAlert(FAILURE, "Failed to remove selected tasks");
        AlertController.DisplayAlert(alert);
        console.error(`removeSelectedTasks: failed to remove selected task: ${error.message}`);
    });
    LoadData(table);
}

module.exports = {removeTaskInit, removeATask, attachRemoveTaskBtnListener};