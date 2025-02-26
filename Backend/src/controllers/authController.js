const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthServices = require("../services/AuthServices");

exports.login = (req, res) => {
    try { 
        const { email, password } = req.body;
    
    } catch (error) {
        throw
};

exports.register = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'email y password son obligatorios' });
    }
    
    try { 
        const newUser = await AuthService.registerUser(email, password);

        res.status(201).send({
          message: "Usuario creado exitosamente",
          data: newUser
        })
    } catch (error) {
        console.error('Error al crear usuario', error);

        if (error.statusCode) {
          return res.status(error.statusCode).send({ error: error.message });
        }

        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

exports.verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        res.status(200).json({ message: 'Token is valid', userId: decoded.id });
    });
};
