const express = require("express");
const cors = require("cors");

var path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
 


const db = require("./models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to geografia application."});
});

/*app.get("/Hola", (req, res) => {
    res.json({ message: "Welcome to PGL."});
});*/


require("./routes/geografia.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});