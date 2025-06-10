const empServices = require("../services/empService.js");

exports.create = async (req, res) => {
  try {
    const newEmployee = await empServices.create(req.body);
    console.log("Novo Colaborador criado:", newEmployee);
    res.status(201).json(newEmployee);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.read = async (_, res) => {
  try {
    const employees = await empServices.read();
    console.log("Colaboradores retornados:", employees);
    res.json(employees);
  } catch (e) {
    console.error("Erro ao listar colaboradores:", e);
    res.status(500).json({ error: e.message });
  }
};
exports.readById = async (req, res) => {
  try {
    const employee = await empServices.readById(req.params.id);
    console.log("Colaborador encontrado:", employee);
    if (!employee) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }
    res.json(employee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedemployee = await empServices.update(req.params.id, req.body);
    res.json(updatedemployee);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo coordenador com ID: ${id}`); // Debug
    await empServices.delete(id); // Aguarda a remoção
    console.log(`Coordenador com ID ${id} removido com sucesso`);
    res.sendStatus(204); // Resposta padrão para DELETE bem-sucedido
  } catch (e) {
    console.error("Erro ao remover coordenador:", e);
    res.status(500).json({ error: e.message });
  }
};
