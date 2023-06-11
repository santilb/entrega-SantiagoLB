import fs from "fs";
import { uuid } from "uuidv4";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];

    if (fs.existsSync(this.path)) {
      const cartsString = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(cartsString);
      this.carts = carts;
    }
  }

  addCart() {
    const newCart = {
      idCart: uuid(),
      products: [],
    };
    this.carts.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts));
    return newCart.idCart;
  }

  getCarts = () => {
    return this.carts;
  };

  getCartById = (id) => {
    const searchCart = this.carts.find((cart) => cart.idCart === id);
    if (searchCart) {
      return searchCart;
    } else {
      return `Cart ID Not Found`;
    }
  };

  addProductToCart(cid, pid) {
    try {
      const data = this.carts;
      const cart = this.carts.find((cart) => cart.idCart == cid);
      if (cart) {
        const product = cart.products.find((product) => product.idProd == pid);
        
        if (product) {
          product.quantity = parseInt(product.quantity + 1);
          const index = cart.products.indexOf(product);
          cart.products.splice(index, 1, product);
          const indexCart = data.indexOf(cart);
          data.splice(indexCart, 1, cart);
          const productsString = JSON.stringify(data);
          fs.writeFileSync(this.path, productsString);
          return product;

        } else {
          cart.products.push({ idProd: pid, quantity: 1 });
          const indexCart = data.indexOf(cart);
          data.splice(indexCart, 1, cart);
          const productsString = JSON.stringify(data, null, 2);
          fs.writeFileSync(this.path, productsString);
        }
      } else {
        return "No existe el carrito";
      }
    } catch (err) {
      console.log(err);
    }
  }

  deleteCart(cid) {
    const deleteCart = this.carts.filter((num) => num.id != cid);
    this.carts = deleteCart;
    const cartsString = JSON.stringify(this.carts);
    fs.writeFileSync(this.path, cartsString);
  }
}
