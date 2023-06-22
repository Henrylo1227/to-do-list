export class TaskTable{
    constructor(){
        this.taskList = [];
    }

    //Method
    getTaskList(){
        return this.taskList;
    }

    setTaskList(newTaskList){
        this.taskList = newTaskList
    }
}

