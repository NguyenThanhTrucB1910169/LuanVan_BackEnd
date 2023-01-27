require('dotenv').config();
const app = require("./app");
const connect = require("./app/config/connectdb");

 function startServer () {
    try {
        connect(app)
        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        });
    }catch (error) {
        console.log("Cannot connect to the database", error);
    }
}

startServer();
