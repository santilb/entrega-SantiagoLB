//@ts-check
//const express = require("express");
import express from "express";
const app = express();
const PORT = 8000;
let users = [
  { id: 0, nombre: "guille", dni: 32324 },
  { id: 1, nombre: "usuario1", dni: 1111111 },
  { id: 2, nombre: "usuario2", dni: 2222222 },
  { id: 3, nombre: "usuario12", dni: 3333333 },
];

app.get("/users", (req, res) => {
  const name = req.query.name;
  const requestID = req.query.id;
  const userFound = users.find((u) => u.id == requestID);
  const userName = users.find((u) => u.nombre == name);

  userName ? res.json(userName) : res.json("Nombre " + name + " no encontrado");

  if (userFound) {
    return res.json(userFound);
  } else {
    return res.json("error: usuario con id " + requestID + " no encontrado");
  }
});

/*  
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const requestID = req.params.id;
  const userFound = users.find((u) => u.id == requestID);
  if (userFound) {
    return res.json(userFound);
  } else {
    return res.json('error: usuario no encontrado');
  }
});*/

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
