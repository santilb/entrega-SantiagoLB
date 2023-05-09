import Router from "express";
import productManager from "../app.js";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  const limit = req.query.limit;
  productManager.getProducts(res, limit);
});
productsRouter.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.getProductById(id, res);
});
productsRouter.post("/", (req, res) => {
  const product = req.body;
  productManager.addProduct(res, product);
});
productsRouter.delete("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  productManager.deleteProduct(res, id);
});
productsRouter.put("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  const product = req.body;
  productManager.updateProduct(res, id, product);
});

export default productsRouter;
