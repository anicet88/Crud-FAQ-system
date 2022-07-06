const db = require("../models");
const Reponse = db.reponses;
const Op = db.Sequelize.Op;
const Faq = db.faqs;

// Create and Save a new Reponse
exports.create = (req, res) => {
  // Validate request
  if (!req.body.reponse) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  

  // create and Save Reponse in the database
  Reponse.create({
    code: req.body.code,
    reponse: req.body.reponse,
    status: req.body.status ? req.body.status : false,
    questions: req.body.questions.join(),
    isVisible: req.body.isVisible ? req.body.isVisible : false,
    isValidated: req.body.isValidated ? req.body.isValidated : false

  })
    .then(data => {
      res.send(data);

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reponse."
      });
    })
    .then(reponse => {
      if (req.body.questions){
        Faq.findAll({ where: {question:{
          [Op.or]:req.body.questions
        }
          }
      })
      }
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const reponse = req.query.reponse;
  var condition = reponse ? { reponse: { [Op.like]: `%${reponse}%` } } : null;

  Reponse.findAll({ where: condition })
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

// Find a single Reponse with an code
exports.findOne = (req, res) => {
  const code = req.params.code;

  Reponse.findByPk(code)
    .then(data => { 
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Reponse with code=${code}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Reponse with code=" + code
      });
    });
};

// Update a Reponse by the code in the request
exports.update = (req, res) => {
  const code = req.params.code;

  Reponse.update(req.body, {
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reponse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Reponse with code=${code}. Maybe Reponse was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Reponse with code=" + code
      });
    });
};

// Delete a Reponse with the specified code in the request
exports.delete = (req, res) => {
  const code = req.params.code;

  Reponse.destroy({
    where: { code: code }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reponse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Reponse with code=${code}. Maybe Reponse was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Reponse with code=" + code
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Reponse.destroy({
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

// find all published Reponse
exports.findAllPublished = (req, res) => {
  Reponse.findAll({ where: { published: true } })
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
