import express from "express";
import handlebars from 'express-handlebars';
import session from 'express-session';
import path from 'path';
import authRouter  from './routes/auth.router.js';
import cartsRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/view.router.js";
import { __dirname, connectMongo, connectSocket, isAdmin, isLogedIn } from './utils.js';
import MongoStore from 'connect-mongo';


await connectMongo();

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

//CONFIG EXPRESS
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Handlebars
app.engine("handlebars", handlebars.engine());
//app.set("views", __dirname + "//views");
//app.set('views', path.join(__dirname, 'views'));
app.set('views', 'views');
app.set("view engine", "handlebars");


app.use(
  session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://santilb:X2G1Sk2EzGWdgFwu@coderhouse.ai8ozim.mongodb.net/ecommerce?retryWrites=true&w=majority', ttl: 7200 }),
    secret: 'a-secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/profile', isLogedIn, (req, res) => {
  const user = { email: req.session.email, isAdmin: req.session.isAdmin };
  return res.status(403).render('profile', { user: user });

  //return res.send('session: ' + JSON.stringify(req.session));
});

app.get('/secret', isAdmin, (req, res) => {
  return res.send('lugar re secreto');
});
app.use("/", viewsRouter);
// ENDPOINTS API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/chat", chatRouter);
app.use('/auth', authRouter)

app.get("*", (req, res, next) => {
  res.status(404).json({ status: 404, message: "Page Not found" });
});



connectSocket(httpServer);
