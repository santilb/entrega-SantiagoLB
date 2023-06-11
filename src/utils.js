import multer from "multer";
import { connect } from 'mongoose'

export async function connectMongo() {
  try {
    await connect(
      'mongodb+srv://santilb:KPVnm3izYlOwtJin@coderhouse.ai8ozim.mongodb.net/ecommerce?retryWrites=true&w=majority'
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

// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);