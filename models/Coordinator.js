class Coordinator {
    constructor({id = null, department, email, username, password, name, isCoord }){
        this.id = id;
        this.department = department;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.isCoord = isCoord; 
    }
}

moudule.exports = Coordinator;
