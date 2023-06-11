import MongoClass from "./MongoClass.js";
import { productsSchema }  from "./models/ProductSchema.js";

export class MongoDBProducts extends MongoClass {
  constructor() {
    super("products", productsSchema);
  }
}
