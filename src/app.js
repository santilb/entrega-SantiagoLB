import express from "express";
import ProductManager from "./dao/ProductManager.js";
import CartManager from "./dao/CartManager.js";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import chatRouter from "./routes/chat.router.js";
import realTimeProducts from "./routes/realTimeProducts.router.js";
import handlebars from 'express-handlebars'
import { __dirname, connectMongo } from "./utils.js";
import { Server as SocketServer } from "socket.io";
import MongoDBChats from "./dao/MongoDBChats.js";
import websockets from "./websockets/websockets.js";

await connectMongo();

const path = "./src/products.json";
const app = express();
const PORT = 8080;
const db = new MongoDBChats();

app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'\\views');
app.set('view engine','handlebars');

app.use(express.static(__dirname+'/public'))

export const productManager = new ProductManager(path);
export const cartManager = new CartManager('./src/carts.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/carts", cartsRouter);
app.use("/products", productsRouter);
app.use('/realtimeproducts', realTimeProducts);
app.use('/chat', chatRouter);

app.get("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not found" });
});

const httpServer = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

const io = new SocketServer(httpServer);
websockets(io);

