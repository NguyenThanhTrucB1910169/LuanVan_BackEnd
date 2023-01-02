const Users = require("../services/users.service")

exports.create = async(req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Tutorial
      const account = new Users({
        name: req.body.name,
        address: req.body.address,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        // avatar: req.body.avatar,
        // phone: req.body.phone,
      });
    
      // Save Tutorial in the database
      Users.create(account, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        else res.send(data);
      });
    
}