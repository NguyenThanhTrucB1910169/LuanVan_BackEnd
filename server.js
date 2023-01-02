const app = require("./app");
const config = require("./app/config");

 function startServer () {
    try {
         config.db.sql.connect((err) => {
            if (err) {
              throw err;
            }
            console.log("Connection done");
          });
          
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        });
    }catch (error) {
        console.log("Cannot connect to the database", error);
        process.exit();
    }
}

startServer();



