import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    if (fs.existsSync(this.path)) {
      const productsString = fs.readFileSync(this.path, "utf-8");
      const products = JSON.parse(productsString);
      this.products = products;
    }
  }

  addProduct = async (obj) => {
    let id = 0;
    this.products.forEach((prod) => {
      if (prod.id >= id) {
        id = prod.id;
      }
    });

    id++;

    if (obj) {
      if (this.products.find((product) => product.code === obj.code)) {
        return "The product already exists";
      }
      if (
        !obj.title ||
        !obj.description ||
        !obj.price ||
        !obj.code ||
        !obj.category ||
        !obj.stock
      ) {
        return "Product has an empty variable";
      }
      if (!product.thumbnail) {
        product.thumbnail = [];
      }
      if (!product.status) {
        product.status = true;
      }
      const newProduct = { id: id, ...obj };
      this.products.push(newProduct);
      const productsString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productsString);
      return newProduct
    }
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (idSearch) => {
    const product = this.products.find((p) => p.id === idSearch);
      if (product) {
        return product;
      } else {
        console.log ("PRODUCT NOT FOUND")
      }
  };

  updateProduct(id, product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log( "You must to complete all the fields");
    } else {
      this.products.forEach(async (ele) => {
        if (ele.id === id) {
          ele.title = product.title;
          ele.description = product.description;
          ele.price = product.price;
          ele.thumbnail = product.thumbnail;
          ele.code = product.code;
          ele.stock = product.stock;
          console.log("Entro",ele);
          await fs.promises.writeFileSync(this.path, JSON.stringify(this.products));
        }
      });
    }
  }

  deleteProduct(id) {
    const deleted = this.products.filter((num) => num.id != id);
    this.products = deleted;
    const productsString = JSON.stringify(this.products);
    fs.writeFileSync(this.path, productsString);
  }
}