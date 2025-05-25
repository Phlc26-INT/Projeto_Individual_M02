class Coordinator {
    constructor({coordId = null, department, email, username, password, name, isCoord }){
        this.coordId = coordId;
        this.department = department;
        this.email = email;
        this.username = username;
        this.password = password;
        this.name = name;
        this.isCoord = isCoord; 
    }
}

module.exports = Coordinator;
