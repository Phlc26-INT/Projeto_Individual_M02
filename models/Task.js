class Task {
    constructor({taskId = null, empId, coordId, taskDescription, taskType, initDate, dueDate, isCoord }){
        this.taskId = taskId;
        this.empId = empId;
        this.coordId = coordId;
        this.taskDescription = taskDescription;
        this.taskType = taskType;
        this.initDate = initDate;
        this.dueDate = dueDate;
        this.isCoord = isCoord; 
    }
}

module.exports = Task;
