const db = require("../models");
const Geografia = db.geografia;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    if(!req.body.nombre){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

 const geografia = {
    nombre: req.body.nombre,
    poblacion: req.body.poblacion,
    filename: req.file ? req.file.filename : ""
 }


 Geografia.create(geografia)
 .then(data => {
    res.send(data);
 })
 .catch (err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating the geografia."
    });

     });
 };
    

exports.findAll = (req, res) => {
   Geografia.findAll()
   .then(data => {
    res.send(data);
   })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving the geografia."
    });

});

};


exports.findOne = (req, res) =>  {
    const id = req.params.id;

    Geografia.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Comunidad with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Comunidad with id=" + id
        });
      });
  };



exports.update = (req, res) =>  {
    const id = req.params.id;

  Geografia.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comunidad was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comunidad with id=${id}. Maybe Comunidad was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comunidad with id=" + id
      });
    });
};

exports.delete = (req, res) =>  {
    const id = req.params.id;

    Geografia.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comunidad was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Comunidad with id=${id}. Maybe Comunidad was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Geografia with id=" + id
        });
      });


};


