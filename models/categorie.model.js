module.exports = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("categorie", {
      code: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      libelle: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      isVisible: {
        type: Sequelize.BOOLEAN
      },
      isValidated: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Categorie;
  };
  