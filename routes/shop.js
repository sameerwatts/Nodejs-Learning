const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/product/:productId", shopController.getProduct);

router.post("/cart", shopController.postCart);

router.get("/cart", shopController.getCart);

router.post("/create-order", shopController.postOrder);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.get("/orders", shopController.getOrders);


module.exports = router;
