const Cart = require("./cart");
const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    (this.imageUrl = imageUrl), (this.description = description);
    this.price = price;
  }

  save() {
   return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',[this.title, this.price, this.imageUrl, this.description]);
  }

  static findProductByID(id) {
   
  }

  static fetchProduct() {
    return db.execute('SELECT * FROM products');
  }

  static delete(id) {
 
  }
};
