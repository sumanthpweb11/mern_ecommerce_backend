const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// REGISTER
router.post("/register", createUser);

// FORGOT PASSWORD TOKEN
router.post("/forgot-password-token", forgotPasswordToken);

// RESET PASSWORD
router.put("/reset-password/:token", resetPassword);

// LOGIN
router.post("/login", loginUserCtrl);

// ADMIN LOGIN
router.post("/admin-login", loginAdmin);

// ADD TO CART
router.post("/cart", authMiddleware, userCart);

// ADD COUPON
router.post("/cart/applycoupon", authMiddleware, applyCoupon);

// CREATE ORDER COD
router.post("/cart/cash-order", authMiddleware, createOrder);

// GET ALL USERS
router.get("/all-users", getallUser);

// GET ORDERS
router.get("/get-orders", authMiddleware, getOrders);

// GET ALL ORDES
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);

// HANDLE REFRESH TOKEN
router.get("/refresh", handleRefreshToken);

// LOGOUT
router.get("/logout", logout);

// GET WISHLIST
router.get("/wishlist", authMiddleware, getWishlist);

// GET USER CART
router.get("/cart", authMiddleware, getUserCart);

// GET SINGLE USER
router.get("/:id", authMiddleware, isAdmin, getaUser);

// EMPTY CART
router.delete("/empty-cart", authMiddleware, emptyCart);

// DELETE USER
router.delete("/:id", deleteaUser);

// UPDATE ORDER STATUS
router.put(
  "/order/update-order/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

// UPDATE USER
router.put("/edit-user", authMiddleware, updateaUser);

// SAVE ADDRESS
router.put("/save-address", authMiddleware, saveAddress);

// BLOCK USER
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

// UNBLOCK USER
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// UPDATE PASSWORD
router.put("/password", authMiddleware, updatePassword);

module.exports = router;
