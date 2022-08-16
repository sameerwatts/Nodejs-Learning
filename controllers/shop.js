const Cart = require("../models/cart");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.findAll().then(product => {
    res.render("shop/index", {
      prods: product,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(err=>console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(product => {
    res.render("shop/product-list", {
      prods: product,
      pageTitle: "All Products",
      path: "/products",
    });
  }).catch(err=>console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}}).then((products)=> {
    res.render("shop/product-detail", {
      product: products[0],
      pageTitle: products[0].title,
      path: "/products",
    });
  }).catch(err=> console.log(err))
  // Product.findByPk(prodId).then((product)=> {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // }).catch(err=> console.log(err))
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchProduct((products) => {
      const cartProducts = [];
      products.forEach((product) => {
        const cartProductData = cart.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      });
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
        totalPrice: cart.totalPrice,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findProductByID(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/");
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
