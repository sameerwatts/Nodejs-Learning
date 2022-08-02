const products = [];

module.exports = class Product {
    constructor(t) {
        console.log("🚀 ~ file: product.js ~ line 6 ~ Product ~ constructor ~ this", this)
        this.title = t;
        console.log("🚀 ~ file: product.js ~ line 6 ~ Product ~ constructor ~ this", this)
    };

    save() {
        products.push(this);
    }

    static fetchProduct() {
        return products
    }
}