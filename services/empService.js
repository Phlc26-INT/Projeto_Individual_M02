const employeeRep = require("../repositories/employeeRepository.js");
const schema = require("../models/employeeModel.js");

module.exports = {
  create: async (payload) => {
    if (!payload.username || payload.username.trim().length === 0) {
      throw new Error("Nome de usuário é obrigatório.");
    }
    if (!payload.email || !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return employeeRep.create(payload);
  },

  read: async () => {
    return employeeRep.findAll();
  },

  readById: async (id) => {
    const employee = await employeeRep.findById(id);
    if (!employee) {
      throw new Error("Colaborador não encontrado.");
    }
    return employee;
  },

  update: async (id, payload) => {
    if (payload.username && payload.username.trim().length === 0) {
      throw new Error("Nome do usuário não pode ser vazio.");
    }
    if (payload.email && !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return employeeRep.update(id, payload);
  },

  delete: async (id) => {
    const employee = await employeeRep.findById(id); 
    if (!employee) {
      throw new Error("Colaborador não encontrado.");
    }
    await employeeRep.remove(id);
    return { message: `Colaborador com ID ${id} removido com sucesso.` };
  },

};
