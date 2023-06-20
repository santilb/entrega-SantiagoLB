import multer from "multer";
import { connect } from 'mongoose'

export async function connectMongo() {
  try {
    await connect(
      'mongodb+srv://santilb:X2G1Sk2EzGWdgFwu@coderhouse.ai8ozim.mongodb.net/ecommerce?retryWrites=true&w=majority'
    )
    console.log('plug to mongo!')
  } catch (e) {
    console.log(e)
    // eslint-disable-next-line no-throw-literal
    throw 'cannot connect to the db'
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//--------------------- SOCKET ---------------------
import {Server} from 'socket.io';
import {ChatModel} from "./dao/models/chats.model.js";
import ProductService from "./services/products.service.js";

export function connectSocket(httpServer){
    const socketServer = new Server(httpServer);

    socketServer.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('addProduct', async (entries) => {
        const product = await ProductService.createOne(entries);
        socketServer.emit('addedProduct', product)
        })

        socket.on('deleteProduct', async id => {
        await ProductService.deleteOne(id);
        socketServer.emit('deletedProduct', id)
        })

        socket.on('msg_front_to_back', async (msg) => {
            const msgCreated = await ChatModel.create(msg);
            const messages = await ChatModel.find({});
            socketServer.emit('msg_back_to_front', messages);
        });
    });
}

export function isAdmin(req, res, next) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(403).render('error', { error: 'error de autorización!' });
}

export function isLogedIn(req, res, next) {
  if (req.session?.email) {
    return next();
  }
  return res.status(401).render('error', { error: 'error de autorización!' });
}
