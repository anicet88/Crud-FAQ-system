module.exports = app => {
    const categories = require("../controllers/categorie.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Categorie
    router.post("/", categories.create);
  
    // Retrieve all Categories
    router.get("/", categories.findAll);
  
    // Retrieve a single Categorie with code
    router.get("/:code", categories.findOne);
  
    // Update a Categorie with code
    router.put("/:code", categories.update);
  
    // Delete a Categorie with code
    router.delete("/:code", categories.delete);
  
    // Delete all Tutorials
    router.delete("/", categories.deleteAll);
  
    app.use('/api/categories', router);
  };
  