const  Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/add-product', activeShop: false, activeAddProduct: true, hasProductCss: true, hasFormsCss: true });
}

exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  }

exports.getProducts = (req, res, next) => {
    Product.fetchProduct(products => {
        res.render('shop', { prods: products, pageTitle: 'Shop', path: '/shop', isProductAvailable: products.length > 0, hasProductCss: true, activeShop: true, activeAddProduct: false });
    });
}

