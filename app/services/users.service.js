const sql = require('../config/index')

const Users = function (user) {
    this.name = user.name;
    this.address = user.address;
    this.password = user.password;
    this.confirmpassword = user.confirmpassword;
    this.phone = user.phone;
    this.avatar = user.avatar;
}

Users.create = (newUser, result) => {
    sql.db.sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
            return;
        }
        // console.log('create products', {id: res.insertId, ...newProduct})
        result(null, { id: res.insertId, ...newUser });
        // res.send(result);
    });
}

// Users.post = () => {

// }

module.exports = Users