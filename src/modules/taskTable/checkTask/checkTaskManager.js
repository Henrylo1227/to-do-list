import { getCheckedSelectorList } from "../selectTask/SelectorManager.js";
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
function checkATask(table, taskId){
    console.log('checkATask: checking a task with taskId: '+taskId);
    console.log('\ttask checked status (before): '+table.taskList[taskId].getCheckState());
    table.taskList[taskId].toggleCheckState();
    console.log('\ttask checked status (after): '+table.taskList[taskId].getCheckState());
    //table.taskList[taskId]
    table.reloadTableUI();

}

function checkSelectedTasks(table, taskIdList){
    for (let i = 0; i < taskIdList.length; i++){
        let taskId = taskIdList[i];
        console.log('checkATask: checking a task with taskId: '+taskId);
        console.log('\ttask checked status (before): '+table.taskList[taskId].getCheckState());
        table.taskList[taskId].toggleCheckState();
        console.log('\ttask checked status (after): '+table.taskList[taskId].getCheckState());
    }
    table.reloadTableUI();
}

export {checkTaskInit, checkATask};