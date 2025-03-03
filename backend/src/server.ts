import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { connectDB } from './infra/database/database';
import routes from "./api/routes/index";
import { rateLimiter } from "./security/rateLimiter";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(rateLimiter);
app.use(express.json());

app.all("/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

const port = config.port;

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
    routes(app);
    connectDB();
});