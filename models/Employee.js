class Employee {
    constructor({empId = null, department, email, username, password, name, isCoord}){
        this.empId = empId;
        this.department = department;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.isCoord = isCoord; 
    }
}

module.exports = Employee;
