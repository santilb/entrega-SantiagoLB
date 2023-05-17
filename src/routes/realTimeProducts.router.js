import express from "express";
import { productManager } from "../app.js";

export const realTimeProducts = express.Router();

realTimeProducts.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.status(200).render("realTimeProducts", { products });
}
catch (err) {
    return res.status(500).json({ status: "error", msg: "Error in server", data: {} })
}
});

export default realTimeProducts;