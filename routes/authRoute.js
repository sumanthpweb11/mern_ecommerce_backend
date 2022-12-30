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
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// REGISTER
router.post("/register", createUser);

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

module.exports = router;
