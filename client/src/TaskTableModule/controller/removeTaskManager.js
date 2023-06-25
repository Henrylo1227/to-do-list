const axios = require("../../../../node_modules/axios/dist/browser/axios.cjs");
const {getCheckedSelectorList, convertTaskIndexListToTaskIdList} = require("./SelectorManager.js");
const { DisplayAlert } = require("../../AlertModule/controller/alertController.js");
const { MyAlert, SUCCESS, FAILURE } = require("../../AlertModule/model/myAlert.js");

function removeTaskInit(table){
    $('#remove-selected-btn').on('click', ()=>{
        const selectedTasks = getCheckedSelectorList();
        const selectedTaskIndexList = [];
        selectedTasks.forEach( (e) => {
            selectedTaskIndexList.push(e.id.slice(7));//select-n --> n; extract the taskId from the html checkbox id 
        });
        removeSelectedTasks(table, selectedTaskIndexList);
    });
}


//remove a task with taskid from table
function removeATask(table, taskId, taskIndex){
    // send http request to remove a task to the server
    axios({
        method: 'post',
        url: '/todo/remove-a-task',
        data: {
            taskId: taskId,
        }
    }).then((response) => {
        // on success
        const statusDescription = response.data.statusDescription;
        console.debug(`response from server: ${statusDescription}`);
        
        // alert
        DisplayAlert(new MyAlert(SUCCESS, 'A Task is removed'));

        // local update
        const tempList = [];
        for (let i = 0; i < table.taskList.length; i++) {
            if (i != taskIndex) {
                tempList.push(table.taskList[i]);
            }
        }
        table.taskList = tempList;
        table.reloadTableUI();
    }).catch((error) => {
        DisplayAlert(new MyAlert(FAILURE, 'Failed to remove a task'));
        console.error(`removeATask: failed to remove task: ${error}`);
    });
}

//remove a number of task with a list of taskid from table
function removeSelectedTasks(table, selectedTaskIndexList){
    const selectedTaskIdList = convertTaskIndexListToTaskIdList(table, selectedTaskIndexList);
    axios({
        method: 'post',
        url: '/todo/remove-a-list-of-task',
        data: {
            taskIdList: selectedTaskIdList,
        }
    }).then((response) => {
        // on success
        const statusDescription = response.data.statusDescription;
        console.debug(`response from server: ${statusDescription}`);

        // Alert
        DisplayAlert(new MyAlert(SUCCESS, 'Remove selected tasks successfully!'));

        // local update
        let newTaskList = [];
        selectedTaskIdList.forEach((taskId) => {
            newTaskList.push(table.taskList[taskIdList]);
        });
        table.taskList = newTaskList;
        table.reloadTableUI();

    }).catch((error) => {
        // on failure
        DisplayAlert(new MyAlert(FAILURE, 'Failed to remove a list of task'));
        console.error(`removeSelectedTasks: failed to remove task: ${error}`);
    });
}

module.exports = {removeTaskInit, removeATask};