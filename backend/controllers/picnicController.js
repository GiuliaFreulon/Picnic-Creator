const PicnicModel = require("../models/Picnic");

const checkPicnicBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0);

  if (priceSum > budget) {
    return false;
  }

  return true;
};

const picnicController = {
  create: async (req, res) => {
    try {
      const picnic = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (
        picnic.services &&
        !checkPicnicBudget(picnic.budget, picnic.services)
      ) {
        res.status(406).json({ msg: "Orçamento insuficiente." });
        return;
      }

      const response = await PicnicModel.create(picnic);

      res.status(201).json({ response, msg: "Picnic criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const picnics = await PicnicModel.find();

      res.json(picnics);
    } catch (error) {
      console.log(error);
    }
  },

  get: async (req, res) => {
    try {
      const id = req.params.id;

      const picnic = await PicnicModel.findById(id);
      if (!picnic) {
        res.status(404).json({ msg: "Picnic não encontrado." });
        return;
      }

      res.json(picnic);
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    const picnic = await PicnicModel.findById(id);
    if (!picnic) {
      res.status(404).json({ msg: "Picnic não encontrado." });
      return;
    }

    const deletedPicnic = await PicnicModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ deletedPicnic, msg: "Picnic excluído com sucesso!" });
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const picnic = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (
        picnic.services &&
        !checkPicnicBudget(picnic.budget, picnic.services)
      ) {
        res.status(406).json({ msg: "Orçamento insuficiente." });
        return;
      }

      const updatedPicnic = await PicnicModel.findByIdAndUpdate(id, picnic);

      if (!updatedPicnic) {
        res.status(404).json({ msg: "Picnic não encontrado." });
        return;
      }

      res.status(200).json({ picnic, msg: "Picnic atualizado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = picnicController;
