const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE PRODUCT
router.post("/", authMiddleware, isAdmin, createProduct);

// GET SINGLE PRODUCT
router.get("/:id", getaProduct);

// ADD TO WISHLIST
router.put("/wishlist", authMiddleware, addToWishlist);

// STAR RATING
router.put("/rating", authMiddleware, rating);

// UPDATE PRODUCT
router.put("/:id", authMiddleware, isAdmin, updateProduct);

// DELETE PRODUCT
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

// GET ALL PRODUCTS
router.get("/", getAllProduct);

module.exports = router;
