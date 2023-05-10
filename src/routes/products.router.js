import Router from "express";
import { productManager } from "../app.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    let products = productManager.getProducts();
    const limit = req.query.limit;
    if (limit) {
      const limitProduct = products.slice(0, limit);
      return res.status(200).json(limitProduct);

    } else {
      return res.json(products);
    }
  } catch (err) {
    res.status(500).json({ status: "error", msg: "an error has occurred", data: {} });
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

productsRouter.post("/", (req, res) => {
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
    productManager.addProduct(res, newProduct);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "an error has occurred", data: {} });
  }
});

productsRouter.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = req.body;
  productManager.updateProduct(res, id, product);
});

productsRouter.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.deleteProduct(res, id);
});

export default productsRouter;
