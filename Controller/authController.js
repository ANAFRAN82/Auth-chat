const { login, createUser } = require("../Service/authService");

const loginController = async (req, res) => {
    const { username, password } = req.body;
    const respuesta = await login(username, password);

    if (respuesta.status === 200) {
        res.json({ token: respuesta.token });
    } else {
        res.status(respuesta.status).json({ message: respuesta.message });
    }
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const result = await createUser(username, email, password);
    res.status(result.status || 201).json(result);
};

module.exports = { loginController, registerUser };