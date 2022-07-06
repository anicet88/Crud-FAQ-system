module.exports = (sequelize, Sequelize) => {
    
    const Faq = sequelize.define("faq", {
      code: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      question: {
        type: Sequelize.STRING
      },
      details: {
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
    return Faq;
  };
  /*Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      through: 'GroupUsers',
      as: 'users',
      foreignKey: 'groupId'
    });
  };*/