const getDb = import('../util/database').getDb;
class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  save() {
    const db = getDb();
    db.collection('products').insertOne(this).then((result) => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })
  }
}
module.exports = Product;
