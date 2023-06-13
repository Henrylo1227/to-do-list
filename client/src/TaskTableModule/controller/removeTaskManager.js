const {getCheckedSelectorList} = require("./SelectorManager.js");

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