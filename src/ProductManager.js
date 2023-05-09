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

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let repe = false;
    let empty = false;

    if (title == '' || description== '' || price == '' ||  thumbnail == '' || code=='' || stock == '') {
      empty = true ;
      console.log("FOUND EMPTY VARIABLE")
    }

    let id = 0;
    this.products.forEach((prod) => {
      if (prod.id >= id) {
        id = prod.id;
      }
    });
    id++;

    this.products.forEach((ele) => {
      if (ele.code === code) {
        repe = true;
        console.log("ERROR. THE CODE CAN NOT BE REPEATED");
      }
    });

    if (!repe && !empty) {
      const finalProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(finalProduct);
      const productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (idSearch) => {
    this.products.forEach((ele) => {
      if (ele.id === idSearch) {
        console.log(ele);
      } else {
        console.log("Not Found");
      }
    });
  };

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    this.products.forEach((ele) => {
      if (ele.id === id) {
        title == '' ? 'empty' : ele.title = title;
        description == '' ? 'empty' : ele.description = description;
        price == '' ? 'empty' : ele.price = price;
        thumbnail == '' ? 'empty' : ele.thumbnail = thumbnail;
        code == '' ? 'empty' : ele.code = code;
        stock == '' ? 'empty' : ele.stock = stock;

        console.log("PRODUCT" + id + " UPDATED");
        console.log(JSON.stringify(ele))
      }
    });
    fs.writeFileSync(this.path, JSON.stringify(this.products));   
  }

  deleteProduct(id) {
    const deleted = this.products.filter((num) => num.id != id);
    this.products = deleted;
    const productsString = JSON.stringify(this.products);
    fs.writeFileSync(this.path, productsString);
  }
}

/*//TESTING
// Create Instance
const newProduct = new ProductManager("products.json");
// Show Products
newProduct.getProducts();
// Add Products
newProduct.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  250,
  "Sin Imagen",
  "abc123",
  25
);
newProduct.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  255,
  "Sin Imagen2",
  "abc1232",
  252
);

newProduct.addProduct(
  "producto prueba3",
  "Este es un producto prueba3",
  253,
  "Sin Imagen3",
  "abc12323",
  253
);

// Show Products
newProduct.getProducts();

// Add repeated product
newProduct.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  250,
  "Sin Imagen",
  "abc123",
  25
);

// Test method getProductById
newProduct.getProductById(1);
newProduct.getProductById(2);
newProduct.deleteProduct(2);
newProduct.updateProduct(3, "", "PRODUCTO ACTUALIZADO", "", "", "", "");*/
