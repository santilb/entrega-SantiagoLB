import express from "express";
import fs from "fs";
import ProductManager from './productManager.js'
import CartManager from "./CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";

const path = "./src/products.json";
const app = express();
const PORT = 8080;

const productManager = new ProductManager(path);
const cartManager = new CartManager("cart.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

app.get("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not found"});
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});