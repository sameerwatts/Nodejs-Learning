const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render("shop/index", {
        prods: product,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((product) => {
      res.render("shop/product-list", {
        prods: product,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then((products) => {
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // SECOND APPROACH
  // Product.findByPk(prodId).then((product)=> {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // }).catch(err=> console.log(err))
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      cart.getProducts().then((cartProducts) => {
        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: cartProducts,
          totalPrice: cart.totalPrice,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        //...
      }
      return Product.findByPk(productId)
        .then((product) => {
          return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .catch((err) => console.log(err));
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // Product.findProductByID(productId, (product) => {
  //   Cart.addProduct(productId, product.price);
  // });
  // res.redirect("/");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productid;
  Product.findProductByID(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
