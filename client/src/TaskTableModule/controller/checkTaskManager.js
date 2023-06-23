const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const { DisplayAlert } = require('../../AlertModule/controller/alertController.js');
const { MyAlert, SUCCESS, FAILURE } = require('../../AlertModule/model/myAlert.js');
const {getCheckedSelectorList} = require('./SelectorManager.js');

function checkTaskInit(table){
    //add check-selected-task btn listener
    $('#check-selected-btn').on('click', ()=>{
        ///check all selected task
        const selectedTasks = getCheckedSelectorList();
        const selectedTaskIdList = [];
        selectedTasks.forEach( (e) => {
            console.log('check selected: ' +e.id.slice(7));
            selectedTaskIdList.push(e.id.slice(7));
        });
        checkSelectedTasks(table, selectedTaskIdList);
    });

}

//check a single task in the table
function checkATask(table, taskId, taskIndex){
    // send http request to check a task to the server
    axios({
        method: 'post',
        url: '/todo/check-a-task',
        data: {
            taskId: taskId,
        }
    }).then((response) => {
        // on success
        const statusDescription = response.data.statusDescription;
        console.log(`response from server: ${statusDescription}`);

        // local update
        console.log('checkATask: checking a task with taskIndex: '+taskIndex);
        console.log('\ttask checked state (before): '+table.taskList[taskIndex].getCheckState());
        table.taskList[taskIndex].toggleCheckState();
        console.log('\ttask checked state (after): '+table.taskList[taskIndex].getCheckState());
        //table.taskList[taskId]
        table.reloadTableUI();
    }).catch((error)=>{
        // on failure
        DisplayAlert(new MyAlert(FAILURE, 'Failed to check task'));
        console.error(`checkATask: failed to check task: ${error}`);
    });
}

function checkSelectedTasks(table, taskIdList){
    for (let i = 0; i < taskIdList.length; i++){
        let taskId = taskIdList[i];
        console.log('checkATask: checking a task with taskId: '+taskId);
        console.log('\ttask checked state (before): '+table.taskList[taskId].getCheckState());
        table.taskList[taskId].toggleCheckState();
        console.log('\ttask checked state (after): '+table.taskList[taskId].getCheckState());
    }
    table.reloadTableUI();
}
module.exports = {checkTaskInit, checkATask};