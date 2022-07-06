module.exports = app => {
    const faqs = require("../controllers/faq.controller.js");
  
    var router = require("express").Router();
  
    // Create a new faq
    router.post("/", faqs.create);
  
    // Retrieve all Tutorials
    router.get("/", faqs.findAll);
  
    // Retrieve a single faq with code
    router.get("/:code", faqs.findOne);
  
    // Update a faq with code
    router.put("/:code", faqs.update);
  
    // Delete a faq with code
    router.delete("/:code", faqs.delete);
  
    // Delete all Tutorials
    router.delete("/", faqs.deleteAll);
  
    app.use('/api/faqs', router);
  };
  