import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import realTimeProducts from "./routes/realTimeProducts.router.js";
import handlebars from 'express-handlebars'
import { __dirname } from "./utils.js";
import { Server } from "socket.io";

const path = "./src/products.json";
const app = express();
const PORT = 8080;

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'\\views');
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'))

export const productManager = new ProductManager(path);
export const cartManager = new CartManager('./src/carts.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use('/realtimeproducts', realTimeProducts);

app.get("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not found" });
});

const httpServer = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("se abrio un canal de soket" + socket.id);
  
  const allProducts = await productManager.getProducts();

  socket.on('newProduct', async (product) => { 
    console.log(JSON.stringify(product));
    await productManager.addProduct(product);
    const allProducts = await productManager.getProducts();
  });
  socket.emit('newProduct', allProducts);
});
