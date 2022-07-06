module.exports = app => {
    const reponses = require("../controllers/reponse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new response
    router.post("/", reponses.create);
  
    // Retrieve all Tutorials
    router.get("/", reponses.findAll);
    
    // Retrieve a single response with code
    router.get("/:code", reponses.findOne);
  
    // Update a response with code
    router.put("/:code", reponses.update);
  
    // Delete a response with code
    router.delete("/:code", reponses.delete);
  
    // Delete all Tutorials
    router.delete("/", reponses.deleteAll);
  
    app.use('/api/reponses', router);
  };
  