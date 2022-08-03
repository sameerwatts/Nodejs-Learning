const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  console.log('description', req.body);
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
