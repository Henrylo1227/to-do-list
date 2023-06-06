class Task{
    constructor(selectState, checkState, description){
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