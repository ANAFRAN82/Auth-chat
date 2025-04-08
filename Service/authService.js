const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const SECRET_KEY = "tu_clave_secreta"; 

const login = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return { status: 404, message: "Usuario no encontrado" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: 403, message: "Credenciales inválidas" };
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        return { status: 200, token };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

const createUser = async (username, email, password) => {
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return { status: 400, message: "El usuario ya existe" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return { status: 201, message: "Usuario creado", user: newUser };
    } catch (error) {
        return { status: 500, message: error.message };
    }
};

module.exports = { login, createUser };