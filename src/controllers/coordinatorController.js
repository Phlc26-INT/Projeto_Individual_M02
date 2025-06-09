const coordServices = require("../services/coordService.js");

exports.create = async (req, res) => {
  try {
    const newCoordinator = await coordServices.create(req.body);
    console.log("Novo Coordenador criado:", newCoordinator);
    res.status(201).json(newCoordinator);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.read = async (_, res) => {
  try {
    const coordinators = await coordServices.read();
    console.log("Coordenadores retornados:", coordinators);
    res.json(coordinators);
  } catch (e) {
    console.error("Erro ao listar coordenadores:", e);
    res.status(500).json({ error: e.message });
  }
};
exports.readById = async (req, res) => {
  try {
    const coordinator = await coordServices.readById(req.params.id);
    console.log("Coordenador encontrado:", coordinator);
    if (!coordinator) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }
    res.json(coordinator);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedcoordinator = await coordServices.update(req.params.id, req.body);
    res.json(updatedcoordinator);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Removendo coordenador com ID: ${id}`); 
    await coordServices.delete(id); 
    console.log(`Coordenador ${id} removido.`);
    res.sendStatus(204);
  } catch (e) {
    console.error("Erro ao remover coordenador:", e);
    res.status(500).json({ error: e.message });
  }
};