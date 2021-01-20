const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Parkmanager API",
      version: "1.0.0",
      description: "API Documentation",
      servers: ["http://localhost:8000"],
    },
  },
  apis: ["./routes/auth.js", "./routes/parkingSpace.js", "./routes/user.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.render("index");
});

// routes
require("./routes/auth")(app);
require("./routes/parkingSpace")(app);
require("./routes/user")(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
