import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import headers from "./middlewares/headers";
import authorization from "./middlewares/authorization";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(headers);
app.use(authorization);


export default app;

// const cors = require('cors');
// const corsOptions ={
//   origin:'http://localhost:3000',
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
});
