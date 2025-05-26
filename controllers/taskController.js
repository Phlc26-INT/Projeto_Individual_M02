const taskServices = require("../services/taskService");

exports.create = async (req, res) => {
  try {
    const newTask = await taskServices.create(req.body);
    console.log("Tarefa Criada:", newTask);
    res.status(201).json(newTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.read = async (_, res) => {
  try {
    const tasks = await taskServices.list();
    console.log("Tarefas retornadas:", tasks);
    res.json(tasks);
  } catch (e) {
    console.error("Erro ao listar tarefas:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.readById = async (req, res) => {
  try {
    const task = await taskServices.detail(req.params.id);
    console.log("Tarefa encontrada:", task);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.readByUserId = async (req, res) => {
  try {
    const tasks = await taskServices.findByUserId(req.params.empId);
    console.log("Tarefas do usuário:", tasks);
    res.json(tasks);
  } catch (e) {
    console.error("Erro ao buscar tarefas do usuário:", e);
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTask = await taskServices.update(req.params.id, req.body);
    console.log("Tarefa atualizada:", updatedTask);
    res.json(updatedTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo tarefa com ID: ${id}`);
    await taskServices.remove(id);
    console.log(`Tarefa com ID ${id} removida com sucesso`);
    res.sendStatus(204);
  } catch (e) {
    console.error("Erro ao remover tarefa:", e);
    res.status(500).json({ error: e.message });
  }
};
