import flash from "connect-flash";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import http from "http";
import morgan from "morgan";
import { dirname } from "path";
import { Server as SocketServer } from "socket.io";
import { fileURLToPath } from "url";
import { passport } from "./auth/passport-local.js";
import { connectMongoDB } from "./config/configMongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import websockets from "./websockets/websockets.js";

/** ★━━━━━━━━━━━★ variables ★━━━━━━━━━━━★ */

const app = express();
const PORT = 8080 || process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

websockets(io);

/*middlewares*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser("mySecret"));

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://santilb:X2G1Sk2EzGWdgFwu@coderhouse.ai8ozim.mongodb.net/ecommerce?retryWrites=true&w=majority',
      ttl: 60 * 10, // 10 minutes
    }),
  })
);
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(flash());

const handlebars = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("handlebars", handlebars.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/*Routes*/
app.use("/home", homeRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/chat", chatRoutes);
app.use("/auth", authRoutes);
app.use("/error", (req, res) => {
  const { errorMessage } = req.flash();
  res.render("error", { errorMessage });
});

// redirect to /home
app.get("/", (req, res) => {
  res.redirect("/home");
});
// not found
app.use("*", (req, res, next) => {
  res.render("notfound");
});

connectMongoDB();

const server = httpServer.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));