import MongoDBChats from "../dao/MongoDBChats.js";
import { MongoDBProducts } from "../dao/MongoDBProducts.js";
const db = new MongoDBChats();
const db2 = new MongoDBProducts();

export default (io) =>  {
  io.on("connection", async (socket) => {
    console.log("👤 New user connected. Soquet ID : ", socket.id);

    socket.on("new-message", async (message) => {
      db.create(message);
      const messages = await db.getAll();
      console.log(messages);
      socket.emit("refresh-messages", messages);
      socket.broadcast.emit("refresh-messages", messages);
    });

    socket.on('newProduct', async (product) => { 
    console.log(JSON.stringify(product));
    await db2.create(product);
    const allProducts = await db2.getAll();
    socket.emit('refresh-product', allProducts);
  });

  const allProducts = await db2.getAll();
  socket.emit('refresh-product', allProducts);

    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
};