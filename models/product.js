const path = require("path");
const fs = require("fs");
const pth = require("../util/path");
const Cart = require("./cart");

const p = path.join(pth, "data", "products.json");

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    (this.imageUrl = imageUrl), (this.description = description);
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const updatedProducts = [...products];
        const updatedProductsIndex = updatedProducts.findIndex((prod) => prod.id === this.id);
        updatedProducts[updatedProductsIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static findProductByID(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static fetchProduct(cb) {
    getProductFromFile(cb);
  }

  static delete(id) {
    getProductFromFile((products) => {
      // First method
      // const productIndex = products.findIndex((p) => p.id === id);
      // products.splice(productIndex, 1);

      // Second method
      const product = products.find((p) => p.id === id);
      const updatedProduct = products.filter((p) => p.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (!err) {
          // delete from cart as well
          Cart.deleteProduct(id, product.price);
        }
        console.log(err);
      });
    });
  }
};
