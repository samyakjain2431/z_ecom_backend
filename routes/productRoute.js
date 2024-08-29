const express = require("express");
const {
    handleGetAllProducts,
    handleAddNewProduct,
    handleAddManyProducts,
    handleGetSingleProduct
 } = require("../controllers/productController");

const router = express.Router();

router.get("/", handleGetAllProducts)

router.get("/productDetail/:id", handleGetSingleProduct)

router.post("/newOne", handleAddNewProduct)

router.post("/newMany", handleAddManyProducts)

module.exports = router;