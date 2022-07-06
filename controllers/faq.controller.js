const db = require("../models");
const Faq = db.faqs; 
const Op = db.Sequelize.Op;

// Create and Save a new Faq
exports.create = (req, res) => {
  // Validate request
  if (!req.body.question) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Faq
  const faq = {
    question: req.body.question,
    details: req.body.details,
    status: req.body.status ,
    isVisible: req.body.isVisible ? req.body.isVisible : false,
    isValidated: req.body.isValidated ? req.body.isValidated : false

  };

  // Save Faq in the database
  Faq.create(faq)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Faq."
      });
    });
};

// Retrieve all Faq from the database.
exports.findAll = (req, res) => {
  const question = req.query.question;
  var condition = question ? { question: { [Op.like]: `%${question}%` } } : null;

  Faq.findAll({ where: condition })
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

// Find a single Faq with an code 
exports.findOne = (req, res) => {
  const code  = req.params.code ;

  Faq.findByPk(code)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Faq with code =${code}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Faq with code =" + code 
      });
    });
};

// Update a Faq by the code  in the request
exports.update = (req, res) => {
  const code  = req.params.code ;

  Faq.update(req.body, {
    where: { code : code  }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Faq was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Faq with code =${code}. Maybe Faq was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Faq with code =" + code 
      });
    });
};

// Delete a Faq with the specified code  in the request
exports.delete = (req, res) => {
  const code  = req.params.code ;

  Faq.destroy({
    where: { code : code  }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Faq was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Faq with code =${code }. Maybe Faq was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Faq with code =" + code 
      });
    });
};

// Delete all Faq from the database.
exports.deleteAll = (req, res) => {
  Faq.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Faq were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Faq
exports.findAllPublished = (req, res) => {
  Faq.findAll({ where: { published: true } })
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
