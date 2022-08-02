const path = require('path');
const fs = require('fs');
const pth = require('../util/path');

const p = path.join(pth, 'data', 'products.json');
module.exports = class Product {
    constructor(t) {
        this.title = t;
    };
    
    save() {
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchProduct(cb) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        })
    }
}