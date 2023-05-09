import fs from "fs";
import productManager from "./app.js";

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.currentId = 0;
    }

    async loadData() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const parsedData = JSON.parse(data);
            this.carts = parsedData.carts;
            this.currentId = parsedData.lastId;
        }
        catch (error) {
            console.log("JSON NOT FOUND");
            try {
                await fs.promises.writeFile(this.path, JSON.stringify({ lastId: 0, carts: [] }, null, 2), "utf-8");
                await this.loadData();
                console.log("JSON CREATED");
            }
            catch (error) {
                console.log("ERROR CREATING FILE");
            }
        }
    }
    async saveData() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({ lastId: this.currentId, carts: this.carts }, null, 2), "utf-8");
        }
        catch (error) {
            console.log("ERROR WRITING FILE");
        }
    }
    async addCart(res) {
        this.carts.push({ idCarrito: ++this.currentId, productos: [] });
        await this.saveData();
        return res.status(201).json({ status: "success", message: "Cart Created", payload: this.carts[this.carts.length - 1] });
    }
    getCartProducts(res, id) {
        if (isNaN(id)) {
            return res.status(400).json({ status: "ERROR", message: "ID ERROR" });
        }
        if (id == 0) {
            return res.status(400).json({ status: "ERROR", message: "INCORRECT ID VALUE" });
        }
        const cart = this.carts.find((item) => item.idCarrito === id);
        if (cart) {
            return res.json({ status: "SUCCESS", payload: cart.productos });
        }
        else {
            return res.status(404).json({ status: "ERROR", message: "NOT FOUND" });
        }
    }

    async addProductToCart(res, cartID, productID) {
        if (!productManager.productExists(productID)) {
            return res.status(404).json({ status: "ERROR", message: "PRODUCT NOT FOUND" });
        }
        const cartIndex = this.carts.findIndex((cart) => cart.idCarrito === cartID);
        if (cartIndex === -1) {
            return res.status(404).json({ status: "ERROR", message: "CART NOT FOUND" });
        }

        const productIndex = this.carts[cartIndex].productos.findIndex((product) => product.idProduct === productID);
        if (productIndex !== -1) {
            this.carts[cartIndex].productos[productIndex].quantity++;
            await this.saveData();
            return res.json({ status: "SUCCESS", message: "PRODUCT UPDATED", payload: this.carts[cartIndex] });
        }
        
        this.carts[cartIndex].productos.push({ idProduct: productID, quantity: 1 });
        await this.saveData();
        return res.json({ status: "SUCCESS", message: "PRODUCT ADDED", payload: this.carts[cartIndex] });
    }
}