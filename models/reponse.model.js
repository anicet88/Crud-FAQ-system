const { ARRAY } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Reponse = sequelize.define("reponse", {
      code: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      reponse: {
        type: Sequelize.STRING,
        setReponse(value){
          this.setDataValue('reponse',value)
        }
      },
      questions: {
        type: Sequelize.STRING,
        setQuestion(value){
          this.setDataValue('questions', value)
        }
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
  
    return Reponse;
  };
  