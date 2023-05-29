import { getCheckedSelectorList } from "../selectTask/SelectorManager.js";
function removeTaskInit(table){
    const removeSelectedBtn = document.getElementById('remove-selected-btn');
    removeSelectedBtn.addEventListener('click', ()=>{
        const selectedDelTasks = getCheckedSelectorList();
        const selectedTaskIdList = [];
        selectedDelTasks.forEach(element => {
            console.log(element.id.slice(7)); 
            selectedTaskIdList.push(element.id.slice(7)); //select-n --> n; extract the taskId from the html checkbox id 
        });
        removeNTasks(table, selectedTaskIdList);
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

    table.reloadTableIU();
}

//remove a number of task with a list of taskid from table
function removeNTasks(table, taskIdList){
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

export {removeTaskInit, removeATask};