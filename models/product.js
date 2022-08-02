const path = require('path');
const fs = require('fs');
const pth = require('../util/path');

const p = path.join(pth, 'data', 'products.json');

const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}
module.exports = class Product {
    constructor(t) {
        this.title = t;
    };
    
    save() {
        getProductFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
        // fs.readFile(p, (err, fileContent) => {
        //     let products = [];
        //     if(!err) {
        //         products = JSON.parse(fileContent);
        //     }
        // });
    }

    static fetchProduct(cb) {
        getProductFromFile(cb);
    }
}