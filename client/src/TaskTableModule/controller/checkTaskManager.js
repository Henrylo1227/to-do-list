const {getCheckedSelectorList} = require('./SelectorManager.js');


function attachCheckTaskBtnListener(task, index){
    // attach check task btn listner for one task
    const btn = $('#check-' + index);
    if (btn != null) {
      btn.on('click', () => {
        checkATask(task.getTaskId());
      });
    } else {
      console.log('btn object is null, taskId: ' + index);
    }
}

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
// TODO rewrite 
function checkATask(taskId){
    const payload = `{'taskId': '${taskId}'}`
    console.log(`send /todo/check-a-task data: ${payload}`);
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
module.exports = {checkTaskInit, checkATask, attachCheckTaskBtnListener};