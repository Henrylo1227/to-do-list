const axios = require('../../../../node_modules/axios/dist/browser/axios.cjs');
const { DisplayAlert, ClearAlert } = require('../../AlertModule/controller/alertController.js');
const { MyAlert, SUCCESS, FAILURE } = require('../../AlertModule/model/myAlert.js');
const {getCheckedSelectorList, convertTaskIndexListToTaskIdList} = require('./SelectorManager.js');

// modes
const CHECK_ALL = 1;
const UNCHECK_ALL = 2;

function checkTaskInit(table){
    //add check-selected-task btn listener
    $('#check-selected-btn').on('click', ()=>{
        ///check all selected task
        const selectedTasks = getCheckedSelectorList();
        const selectedTaskIndexList = [];
        selectedTasks.forEach( (e) => {
            console.log('check selected: ' +e.id.slice(7));
            selectedTaskIndexList.push(e.id.slice(7));
        });
        // decided check mode (either check or uncheck) based on the check state
        // of the first selected task. 
        const firstIndex = selectedTaskIndexList[0];
        const firstSelectedTaskState = table.taskList[firstIndex].getCheckState();
        const checkMode = firstSelectedTaskState? UNCHECK_ALL : CHECK_ALL;
        checkSelectedTasks(checkMode, table, selectedTaskIndexList);
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

        // Alert
        ClearAlert();

        // local update
        table.taskList[taskIndex].toggleCheckState();
        table.reloadTableUI();
    }).catch((error)=>{
        // on failure
        DisplayAlert(new MyAlert(FAILURE, 'Failed to check task'));
        console.error(`checkATask: failed to check task: ${error}`);
    });
}

function checkSelectedTasks(mode, table, selectedTaskIndexList){
    if (mode != CHECK_ALL && mode != UNCHECK_ALL) {
        throw(new Error(`check selected task error: mode ${mode} not support`));
    }
    let targetState;
    let urlEndPoint;
    if (mode === CHECK_ALL){
        // check all mode
        urlEndPoint = '/todo/check-a-list-of-task';
        targetState = true;
    } else if (mode === UNCHECK_ALL){
        // uncheck all mode
        urlEndPoint = '/todo/uncheck-a-list-of-task';
        targetState = false;
    }
    // convert task Index to TaskID
    const selectedTaskIdList = convertTaskIndexListToTaskIdList(table, selectedTaskIndexList);

    axios({
        method: 'post',
        url: urlEndPoint,
        data: {
            taskIdList: selectedTaskIdList,
        }
    }).then((response)=>{
        // on success
        const statusDescription = response.data.statusDescription;
        console.log(`response from server: ${statusDescription}`);

        // local update
        selectedTaskIndexList.forEach((taskIndex) => {
            table.taskList[taskIndex].setCheckState(targetState);
        })
        table.reloadTableUI();
    }).catch((error)=>{
        // on failure
        DisplayAlert(new MyAlert(FAILURE, targetState ? 'Failed to check selected tasks': 'Failed to uncheck selected tasks'));
        console.error(`checkSelectedTasks: failed to check or uncheck task: ${error}`);
    });
}

module.exports = {checkTaskInit, checkATask};