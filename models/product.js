const path = require("path");
const fs = require("fs");
const pth = require("../util/path");

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
        console.log('updatedProducts',updatedProducts);
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
};
