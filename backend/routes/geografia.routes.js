module.exports = app => {
    const geografia = require("../controllers/geografia.controller.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    router.post("/", upload.single('file'), geografia.create);

    router.post("/", geografia.create);

    router.get("/", geografia.findAll);

    router.get("/:id", geografia.findOne);

    router.put("/:id", geografia.update);

    router.delete("/:id", geografia.delete);

    
    app.use('/api/geografia', router);
};