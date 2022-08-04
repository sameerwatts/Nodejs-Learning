const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProductByID(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.pageTitle,
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
    })
};

exports.postCart = (req, res, next) => {
  const {productId} = req.body;
  console.log(productId);
  res.redirect("/")
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  })
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  })
};
