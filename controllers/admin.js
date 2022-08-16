const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProducts = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  Product.create({
    title,
    price,
    imageUrl,
    description,
  })
    .then((result) => console.log('Created product'))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Product.findProductByID(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productid, title, imageUrl, price, description } = req.body;
  const product = new Product(productid, title, imageUrl, description, price);
  product.save();
  res.redirect("/admin/products");
};

exports.productDelete = (req, res, next) => {
  const productId = req.body.productid;
  Product.delete(productId);
  res.redirect("/admin/products");
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
