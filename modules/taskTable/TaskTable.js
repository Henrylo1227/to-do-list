export class TaskTable{
    constructor(){
        this.taskList=[];
    }

    //Methods
    getTaskNum(){
        return this.taskNum;
    }

    appendTaskToTable(task, id){
        this.taskList.push(task);
        this.createTaskUI(task, id);
        //add del button listener //TO-DO
        this.attachDelTaskBtnListener('del-'+id.toString());
    }

    //create empty task table with headings and a empty body
    createTaskTableUI(){
        const itemTableRow = document.createElement('div');
        itemTableRow.className = 'row';

        const itemTable = document.createElement('table');
        itemTable.className = 'table table-hover';
        itemTableRow.appendChild(itemTable);

        const thead = document.createElement('thead');
        itemTable.appendChild(thead);

        const tr = document.createElement('tr');
        thead.appendChild(tr);

        const th1 = document.createElement('th');
        th1.className = 'col-sm-1';
        th1.scope = 'col';
        tr.appendChild(th1);

        const selectAllBox = document.createElement('input');
        selectAllBox.id = 'select-all-checkbox';
        selectAllBox.className = 'form-check-input';
        selectAllBox.type = 'checkbox';
        selectAllBox.checked = false;
        selectAllBox.ariaLabel = 'select all items';
        th1.appendChild(selectAllBox);

        const th2 = document.createElement('th');
        th2.className = 'col-sm-1';
        th2.textContent = '#';
        th2.scope = 'col';
        tr.appendChild(th2);

        const th3 = document.createElement('th');
        th3.className = 'col-sm-8';
        th3.textContent = 'Task';
        th3.scope = 'col';
        tr.appendChild(th3);

        const th4 = document.createElement('th');
        th4.className = 'col-sm-1';
        th4.scope = 'col';
        tr.appendChild(th4);

        const checkBtn = document.createElement('button');
        checkBtn.id = 'check-all-btn';
        checkBtn.type = 'button';
        checkBtn.className = 'btn btn-success';
        th4.appendChild(checkBtn);

        const checkBtnImg = document.createElement('i');
        checkBtnImg.className = 'fa-solid fa-check';
        checkBtn.appendChild(checkBtnImg);

        const th5 = document.createElement('th');
        th5.className = 'col-sm-1';
        th5.scope = 'col';
        tr.appendChild(th5);

        const removeAllBtn = document.createElement('button');
        removeAllBtn.id = 'remove-selected-btn';
        removeAllBtn.type = 'button';
        removeAllBtn.className = 'btn btn-danger';
        th5.appendChild(removeAllBtn);

        const delBtnImg = document.createElement('i');
        delBtnImg.className = 'fa-solid fa-trash-can';
        removeAllBtn.appendChild(delBtnImg);
        
        //Append to the html
        const mainContainer = document.getElementById('main-container');
        mainContainer.appendChild(itemTableRow);
        
        //Append table body, where the task is added here;
        const tableBody = document.createElement('tbody');
        tableBody.id = 'table-body'
        tableBody.className = "table-group-divider";
        itemTable.appendChild(tableBody);
    }

    //create task row in the talbe with task[Object] and its object id
    createTaskUI(task, id){
        const tr = document.createElement('tr');
        //select checkbox
        const selectCheckBoxTd = document.createElement('td');
        selectCheckBoxTd.scope = 'row';
        tr.appendChild(selectCheckBoxTd);

        const taskSelectCheckbox = document.createElement('input');
        taskSelectCheckbox.id = 'select-'+id;
        taskSelectCheckbox.checked = task.getSelectState(); //True: checked; false: uncheck
        taskSelectCheckbox.className = 'form-check-input';
        taskSelectCheckbox.type = 'checkbox';
        taskSelectCheckbox.value = task.getSelectState().toString();
        taskSelectCheckbox.ariaLabel = 'check the item: '+ id.toString();
        selectCheckBoxTd.appendChild(taskSelectCheckbox);

        //#id
        const idTd = document.createElement('td');
        idTd.textContent = id+1; //index to #
        tr.appendChild(idTd);

        //Task description
        const taskDescTd = document.createElement('td');
        taskDescTd.textContent = task.getDescription();
        tr.appendChild(taskDescTd);

        //Task check btn
        const taskCheckTd = document.createElement('td');
        tr.appendChild(taskCheckTd);

        const taskCheckBtn = document.createElement('button');
        taskCheckBtn.type = 'button';
        taskCheckBtn.className = 'btn btn-light';
        taskCheckBtn.ariaLabel = 'check task: ' + task.getDescription();
        const taskCheckBtnId = 'check-' + id.toString();
        taskCheckBtn.id = taskCheckBtnId;
        taskCheckTd.appendChild(taskCheckBtn);
        
        const taskCheckImg = document.createElement('i');
        taskCheckImg.className = 'fa-sharp fa-solid fa-check';
        taskCheckBtn.appendChild(taskCheckImg);
        
        //Task delete btn
        const taskDelTd = document.createElement('td');
        tr.appendChild(taskDelTd);

        const taskDelBtn = document.createElement('button');
        taskDelBtn.type = 'button';
        taskDelBtn.className = 'btn btn-light';
        taskDelBtn.ariaLabel = 'remove task: ' + task.getDescription();
        const delBtnId = 'del-' + id.toString();
        taskDelBtn.id = delBtnId;
        taskDelTd.appendChild(taskDelBtn);
        
        const delBtnImg = document.createElement('i');
        delBtnImg.className = 'fa-regular fa-trash-can';
        taskDelBtn.appendChild(delBtnImg);

        //Attach newly created table row to the table body
        const tableBody = document.getElementById('table-body');
        tableBody.appendChild(tr);
    }

    attachDelTaskBtnListener(btnId){
        const btn = document.getElementById(btnId);
        if (btn!=null){

            btn.addEventListener('click', ()=>
            {
                //the taskId of the deleted item
                const delTaskId = btnId.slice(4); //remove "del-"
                this.removeTask(delTaskId);
                //TODO: Update database

                //update the UI
                this.reloadTableUI();
            })
        }else{
            console.log('btn object is null, btnId: '+btnId);
            console.log(this.taskList);
        }
    }

    removeTask(taskId){
        const tempList = [];
        console.log(this.taskList.length);
        for (let i = 0; i<this.taskList.length; i++){
            if (i!= taskId){
                tempList.push(this.taskList[i]);
            }
        }
        this.taskList = tempList;
        console.log('new task list: '+this.taskList);
    }

    //apply chagne
    reloadTableUI(){
        const tableBody = document.getElementById('table-body');
        tableBody.replaceChildren();
        this.taskList.forEach((task, index) => {
            this.createTaskUI(task, index);
            
            this.attachDelTaskBtnListener('del-'+ index);
        })
    }
}

export default TaskTable;