const coordinatorRep = require("../repositories/coordinatorRepository.js");
const schema = require("../models/coordinatorModel.js");

module.exports = {
  create: async (payload) => {
    if (!payload.coord_username || payload.coord_username.trim().length === 0) {
      throw new Error("Nome de usuário é obrigatório.");
    }
    if (!payload.email || !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return coordinatorRep.create(payload);
  },

  read: async () => {
    return coordinatorRep.findAll();
  },

  readByID: async (id) => {
    const coordinator = await coordinatorRep.findById(id);
    if (!coordinator) {
      throw new Error("Coordenador não encontrado.");
    }
    return coordinator;
  },

  update: async (id, payload) => {
    if (payload.username && payload.username.trim().length === 0) {
      throw new Error("Nome do usuário não pode ser vazio.");
    }
    if (payload.email && !payload.email.includes("@")) {
      throw new Error("Email inválido.");
    }
    return coordinatorRep.update(id, payload);
  },

  delete: async (id) => {
    const coordinator = await coordinatorRep.findById(id); 
    if (!coordinator) {
      throw new Error("Coordenador não encontrado.");
    }
    await coordinatorRep.remove(id);
    return { message: `Coordenador com ID ${id} removido com sucesso.` };
  },

};
