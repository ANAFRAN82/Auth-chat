const jwt = require("jsonwebtoken");

const SECRET_KEY = "tu_clave_secreta";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Acceso denegado" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido" });
    }
};

module.exports = authMiddleware;