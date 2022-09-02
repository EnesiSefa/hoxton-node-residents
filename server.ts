import express, { json } from "express";
import cors from "cors";

import { residents, houses } from "./data";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`write this link http://localhost:${port}/residents or /houses`);
});
app.get("/residents", (req, res) => {
  let residentsToSend = residents.map((resident) => {
    let house = houses.find((house) => house.id === resident.houseId);
    return { ...resident, house };
  });

  res.send(residentsToSend);
});
app.get("/residents/:id", (req, res) => {
  let searchedId = Number(req.params.id);
  let match = residents.filter((resident) => resident.id === searchedId);
  res.send(match);
});

app.get("/houses", (req, res) => {
  let housesToSend = houses.map((house) => {
    let resident = residents.find((resident) => resident.id === house.id);
    return { ...house, resident };
  });

  res.send(housesToSend);
});
app.get("/houses/:id", (req, res) => {
  let searchedId = Number(req.params.id);
  let match = houses.filter((house) => house.id === searchedId);

  res.send(match);
});

app.post("/residents", (req, res) => {
  let errors: String[] = [];
  console.log(req.body);

  if (typeof req.body.name !== "string") {
    errors.push("name not provided or not a string.");
  }

  if (typeof req.body.age !== "number") {
    errors.push("age not provided or not a number.");
  }

  if (typeof req.body.gender !== "string") {
    errors.push("gender not provided or not a string.");
  }
  if (typeof req.body.houseId !== "number") {
    errors.push("houseId not provided or not a number.");
  }

  // if there are no errors, create the item
  if (errors.length === 0) {
    const newItem = {
      id: residents[residents.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      houseId: req.body.houseId,
    };
    residents.push(newItem);
    res.send(newItem);
  } else {
    // if there are any errors...
    res.status(400).send({ errors: "please write the correct keys" });
  }
});

app.post("/houses", (req, res) => {
  let errors: String[] = [];
  console.log(req.body);

  if (typeof req.body.address !== "string") {
    errors.push("address not provided or not a string.");
  }

  if (typeof req.body.type !== "string") {
    errors.push("type not provided or not a string.");
  }

  // if there are no errors, create the house
  if (errors.length === 0) {
    const newItem = {
      id: residents[residents.length - 1].id + 1,
      address: req.body.address,
      type: req.body.type,
    };
    houses.push(newItem);
    res.send(newItem);
  } else {
    // if there are any errors...
    res.status(400).send({ errors: "please write the correct keys" });
  }
});

app.delete("/houses/:id", (req, res) => {
  const foundId = Number(req.params.id);

  if (foundId > -1) {
    // -1 means the object that doesnt exist
    let deletedHouse = houses.splice(foundId, 1)[0];
    // from the array i get the first element [0] because splice returns an array with an object inside
    res.send({ message: "quote deleted successfully", deletedHouse });
  }
});

app.delete("/residents/:id", (req, res) => {
  const foundId = Number(req.params.id);
  const idToDelete = houses.findIndex((resident) => resident.id === foundId);

  if (idToDelete > -1) {
    // -1 means the object that doesnt exist
    let deletedResident = residents.splice(idToDelete, 1)[0];
    // from the array i get the first element [0] because splice returns an array with an object inside
    res.send({ message: "quote deleted successfully", deletedResident });
  }
});

app.patch("/residents/:id", (req, res) => {
  const foundId = Number(req.params.id);
  const match = residents.find((resident) => resident.id === foundId);

  if (match) {
    if (req.body.name) match.name = req.body.name;
    if (req.body.age) match.age = req.body.age;
    if (req.body.gender) match.gender = req.body.gender;
    if (req.body.houseId) match.houseId = req.body.houseId;
    res.send(match);
  } else {
    res.status(404).send({ error: "resident not found." });
  }
});

app.patch("/houses/:id", (req, res) => {
  const foundId = Number(req.params.id);
  const match = houses.find((house) => house.id === foundId);

  if (match) {
    if (req.body.address) match.address = req.body.address;
    if (req.body.type) match.type = req.body.type;

    res.send(match);
  } else {
    res.status(404).send({ error: "house not found." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
