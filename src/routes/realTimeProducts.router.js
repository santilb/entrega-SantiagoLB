import express from "express";
import {MongoDBProducts} from "../dao/MongoDBProducts.js";

export const realTimeProducts = express.Router();
const db = new MongoDBProducts();

realTimeProducts.get("/", async (req, res) => {
  try {
    const products = await db.getAll();
    return res.status(200).render("realTimeProducts", { products });
}
catch (err) {
    return res.status(500).json({ status: "error", msg: "Error in server", data: {} })
}
});

export default realTimeProducts;