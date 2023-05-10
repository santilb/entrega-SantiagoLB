import Router from "express";
import { cartManager } from "../app.js";

const cartsRouter = Router();

cartsRouter.post("/", (req, res) => {
  try {
    const cart = cartManager.addCart();
    res.status(200).json({ message: "Cart Created!", cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

cartsRouter.get("/:cid", (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = cartManager.getCartById(cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: "Cart not found" });
  }
});

cartsRouter.post("/:cid/products/:pid", async (req, res, next) => {
  try {
      const cartId = req.params.cid
      const productId = req.params.pid
      const searchCart = cartManager.getCarts().find((ele) => ele.idCart == cartId)
      if (!searchCart) {
          res.status(200).json(`Cart id: ${cartId} Not Found`)
      }
      const product = cartManager.addProductToCart(cartId, productId)
      res.status(200).json(product)
  } catch (err) {
    console.log(err)
      res.status(500).json({ status: "error", msg: "Internal Error" })
  }
})

export default cartsRouter;
