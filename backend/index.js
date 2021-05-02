const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db");

//  Express Route
const studentRoute = require("../backend/routes/student.route");

//  Connenting MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log(`Database Successfully Connected`);
    },
    (error) => {
      console.log(`Cloud not connect to Database : ${error}`);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/students", studentRoute);

// PORT
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Connect to port : ${port}`);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
