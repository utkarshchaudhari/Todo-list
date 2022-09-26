export default class Task {
    constructor(title, dueDate){
        this.title = title;
        this.dueDate = dueDate;
    }

    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getDuedate(){
        return this.dueDate;
    }

    setDuedate(dueDate){
        this.dueDate = dueDate;
    }
}