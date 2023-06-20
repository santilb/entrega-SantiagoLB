import express from "express";
import handlebars from "express-handlebars";
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/view.router.js";
import { __dirname, connectMongo } from "./utils.js";
import { connectSocket } from "./utils.js";

await connectMongo();

const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname +"\\"+ "views");
app.set("view engine", "handlebars");

// ENDPOINTS API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/chat", chatRouter);

app.get("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not found" });
});

const httpServer = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

connectSocket(httpServer);
