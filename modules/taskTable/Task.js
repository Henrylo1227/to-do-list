class Task{
    constructor(checkState, description){
        this.selectState = false;
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

export default Task;