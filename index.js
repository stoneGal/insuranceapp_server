const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const connect = require("./config/dbconnection");

connect();

//middleware
app.use(morgan("tiny"));
app.use(express.json()); //req.body
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Routers

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard router
app.use("/dashboard", require("./routes/dashboard"));

//policy router
app.use("/policy", require("./routes/policy"));

//beneficiary router
app.use("/beneficiary", require("./routes/beneficiary"));

// home route
app.get("/home", (req, res) => {
  res.send("Bethel Insurance Application API");
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use((req, res, next)=> {
//     const err = new Error();
//     error.status = 404;
//     next(err)
// });

// if(app.get("env") === "development"){
//     app.use((err, req, res, next)=> {
//         res.status(err.status || 500)
//         res.send({
//             message: err.message,
//             error: err
//         });
//     });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("App has started at port 5000");
});
