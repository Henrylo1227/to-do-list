const axios = require("../../../../node_modules/axios/dist/browser/axios.cjs");
const {getCheckedSelectorList} = require("./SelectorManager.js");
const { DisplayAlert } = require("../../AlertModule/controller/alertController.js");
const { MyAlert, SUCCESS, FAILURE } = require("../../AlertModule/model/myAlert.js");

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
        console.log(`response from server: ${statusDescription}`);
        
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