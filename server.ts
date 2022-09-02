import express from "express";
import cors from "cors";
import { residents, houses } from "./data";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send(`write this link http://localhost:${port}/residents or /houses`);
  });
app.get("/residents", (req, res) => {
  res.send(residents);
});

app.get("/houses", (req, res) => {
  res.send(houses);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
