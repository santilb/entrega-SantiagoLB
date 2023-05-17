import Router from "express";
import { productManager } from "../app.js";
import { __dirname } from "../utils.js";

const productsRouter = Router();

productsRouter.set('views',__dirname+'\\views');

productsRouter.get("/", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      const limitProduct = products.slice(0, limit);
      console.log(limitProduct)
      //return res.status(200).render("home", {limitProduct});
      return res.status(200).json(limitProduct);
    } else {
      return res.json(products);
      //return res.status(200).render("home", {products});
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "an error has occurred", data: {} });
  }
});

productsRouter.get("/view", async (req, res) => {
  try {
    let products = await productManager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      const limitProduct = products.slice(0, limit);
      console.log(limitProduct)
      return res.status(200).render("home", {limitProduct});
      //return res.status(200).json(limitProduct);
    } else {
      //return res.json(products);
      return res.status(200).render("home", {products});
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "an error has occurred", data: {} });
  }
});

productsRouter.get("/:pid", (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = productManager.getProductById(id);
    const result = product ? product : "Product not found";
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "an error has occurred", data: {} });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    let repeated = productManager
      .getProducts()
      .find((ele) => ele.code === newProduct.code);
    if (repeated) {
      return res
        .status(400)
        .json({ status: "error", msg: "Product already exists" });
    }
    const added = await productManager.addProduct(newProduct);
    added
      ? res
          .status(200)
          .json({ status: "success", msg: "product added", data: added })
      : res
          .status(404)
          .json({ status: "error", msg: "Product has an empty variable" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "error", msg: "an error has occurred", data: {} });
  }
});

productsRouter.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = req.body;
  const productId = productManager.getProductById(id);
  console.log("prod", productId);
  if (!productId) {
    return res.status(404).json({ status: "error", msg: "Product not found " });
  }
  const updated = productManager.updateProduct(id, product);
  updated
    ? res.status(200).json({ status: "success", msg: "product updated" })
    : res
        .status(404)
        .json({ status: "error", msg: "Product has an empty variable" });
});

productsRouter.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const deleted = productManager.deleteProduct( id);
deleted?
  res
  .status(200)
  .json({ status: "success", msg: "product deleted" }) :
  res
  .status(404)
  .json({ status: "error", msg: "Product not found" });
});

export default productsRouter;
