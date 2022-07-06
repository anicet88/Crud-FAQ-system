const db = require("../models");
const Categorie = db.categories;
const Op = db.Sequelize.Op;

// Create and Save a new Categorie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.libelle) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Categorie
  const categorie = {
    libelle: req.body.libelle,
    description: req.body.description,
    status: req.body.status ,
    isVisible: req.body.isVisible ? req.body.isVisible : false,
    isValidated: req.body.isValidated ? req.body.isValidated : false
  };

  // Save Categorie in the database
  Categorie.create(categorie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categorie."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const categorie = req.query.categorie;
  var condition = categorie ? { categorie: { [Op.like]: `%${categorie}%` } } : null;

  Categorie.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Categorie with an code
exports.findOne = (req, res) => {
  const code = req.params.code;

  Categorie.findByPk(code)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Categorie with code=${code}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categorie with code=" + code
      });
    });
};

// Update a Categorie by the code in the request
exports.update = (req, res) => {
  const code = req.params.code;

  Categorie.update(req.body, {
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Categorie with code=${code}. Maybe Categorie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Categorie with code=" + code
      });
    });
};

// Delete a Categorie with the specified code in the request
exports.delete = (req, res) => {
  const code = req.params.code;

  Categorie.destroy({
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categorie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Categorie with code=${code}. Maybe Categorie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Categorie with code= ${code}`
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Categorie.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Categorie
exports.findAllCategorie = (req, res) => {
  Categorie.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
