const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/prodcategoryCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// CREATE CATEGORY
router.post("/", authMiddleware, isAdmin, createCategory);

// UPDATE CATEGORY
router.put("/:id", authMiddleware, isAdmin, updateCategory);

// DELETE CATEGORY
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

// GERT SINGLE CATEGORY
router.get("/:id", getCategory);

// GET ALL CATEGORIES
router.get("/", getallCategory);

module.exports = router;
