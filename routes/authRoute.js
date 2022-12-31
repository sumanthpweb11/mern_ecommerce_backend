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

// GET ALL USERS
router.get("/all-users", getallUser);

// HANDLE REFRESH TOKEN
router.get("/refresh", handleRefreshToken);

// LOGOUT
router.get("/logout", logout);

// GET SINGLE USER
router.get("/:id", authMiddleware, isAdmin, getaUser);

// DELETE USER
router.delete("/:id", deleteaUser);

// UPDATE USER
router.put("/edit-user", authMiddleware, updateaUser);

// BLOCK USER
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);

// UNBLOCK USER
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// UPDATE PASSWORD
router.put("/password", authMiddleware, updatePassword);

module.exports = router;
