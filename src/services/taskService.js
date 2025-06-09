const taskRep = require("../repositories/taskRepository.js");
const schema = require("../models/taskModel.js");

function validateDueDate(data) {
  const hoje = new Date();
  const vencimento = new Date(data);
  if (isNaN(vencimento.getTime())) {
    throw new Error("Data de deadline inválida.");
  }
  if (vencimento < hoje.setHours(0, 0, 0, 0)) {
    throw new Error("A data de deadline tem que ser maior que a data atual.");
  }
}

module.exports = {
  create: async (payload) => {
    validateDueDate(payload.due_date);
    return taskRep.create(payload);
  },

  read: async () => {
    return taskRep.findAll();
  },

  readById: async (id) => {
    const task = await taskRep.findByID(id);
    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }
    return task;
  },

  readByUserId: async (userId) => {
    return taskRep.findByUserId(userId);
  },
  
  update: async (id, payload) => {
    if (payload.due_date) validateDueDate(payload.due_date);
    return taskRep.update(id, payload);
  },

  delete: async (id) => {
    const task = await taskRep.findByID(id);
    if (!task) {
      throw new Error("Tarefa não encontrada.");
    }
    await taskRep.remove(id);
    return { message: `Tarefa ${id} removida.` };
  },
};
