import express from "express";
import fs from "fs";

let products = [];
const path = "./src/products.json";
const app = express();
const PORT = 8080;

await loadProducts();

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    const limitProduct = products.slice(0, limit);
    return res.json(limitProduct);
  } else {
    return res.json(products);
  }
});

app.get("/products/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = products.find((item) => item.id === id);
  const result = product ? product : "Product not found";
  res.json(result);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

async function loadProducts() {
  try {
    const productsString = fs.readFileSync(path, "utf-8");
    const imProducts = JSON.parse(productsString);
    products = imProducts;
  } catch (error) {
    console.log(error);
    console.log("Error Loading Products");
  }
}
