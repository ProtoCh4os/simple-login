import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import dotenv from "dotenv-safe";
dotenv.config();

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_ADRESS,
  })
);
app.disable('x-powered-by');
app.listen(3000);

app.use(routes);
