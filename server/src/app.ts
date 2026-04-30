import express from "express";
import cookieParser from "cookie-parser";
import "../src/database/client";
import "dotenv/config";
import routes from "../src/routes";

const app = express();

const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API Lancé");
});

app.use(routes);

app.listen(port, () => {
    console.log("Listening on port 3000");
});