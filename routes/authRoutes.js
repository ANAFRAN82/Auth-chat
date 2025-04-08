const express = require("express");
const router = express.Router();
const { loginController, registerUser } = require("../Controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", loginController);

router.post("/register", registerUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Perfil del usuario", user: req.user });
});

module.exports = router;