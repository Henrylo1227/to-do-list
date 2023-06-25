function selectorInit(){
    //select all check box
    const selectAllCheckBox = document.getElementById('select-all-checkbox')
    selectAllCheckBox.addEventListener('click', (event)=>{
        if(event.target.checked){
            //toggle all selector as checked
            checkAllSelectors();
        }else{
            //toggle all selector as unchecked
            uncheckAllSelectors();
        }
    });
    //task selector
    const taskSelectorList = getSelectorList();
    taskSelectorList.forEach( (selector) => {
        selector.addEventListener('change', (event)=>{
            //toggle select-all-checkbox if one is unchecked.
            const selectorList = getSelectorList();
            const checkedSelectorList = getCheckedSelectorList();
            if (selectorList.length != checkedSelectorList.length){
                $('#select-all-checkbox').checked = false;
            }
        })
    });
}

// convert a list of taskIndex to taskId
function convertTaskIndexListToTaskIdList(table, taskIndex){
    let taskIdList = [];

    taskIndex.forEach((taskIndex) => {
        const taskId = table.taskList[taskIndex].getTaskId();
        taskIdList.push(taskId);
    })
    return taskIdList;
}


//return a list selectors in the table
function getSelectorList(){
    const selectorCollection = document.querySelectorAll('input.form-check-input');
    return selectorCollection;
}

function getCheckedSelectorList(){
    const checkedSelectorList = [];
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        if (selectorList[i].id!='select-all-checkbox' && selectorList[i].checked == true){
            checkedSelectorList.push(selectorList[i]);
        }
    }
    console.debug(checkedSelectorList);
    return checkedSelectorList;
}

function checkAllSelectors(){
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        selectorList[i].checked = true;
    }
}

function uncheckAllSelectors(){
    const selectorList = getSelectorList();
    for (let i = 0; i < selectorList.length; i++){
        selectorList[i].checked = false;
    }
}

module.exports = {selectorInit, getCheckedSelectorList, convertTaskIndexListToTaskIdList};