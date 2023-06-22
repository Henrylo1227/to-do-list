export class Task{
    constructor(taskId, selectState, checkState, description){
        this.taskId = taskId;
        this.selectState = selectState;
        this.checkState = checkState;
        this.description = description;
    }

    
    //Method
    toggleSelectState(){
        this.selectState = !this.selectState;
    }
    
    toggleCheckState(){
        this.checkState = !this.checkState;
    }

    getTaskId(){
        return this.taskId;
    }
    
    getCheckState(){
        return this.checkState;
    }

    getSelectState(){
        return this.selectState;
    }

    getDescription(){
        return this.description;
    }
}
