const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthServices = require("../services/AuthServices");

exports.login = async (req, res) => {
    const { email, password } = req.body;
        
    if (!email || !password) {
      return res.status(400).send({ error: 'email y password son obligatorios' });
    }
    
    try { 
        const { token, data } = await AuthServices.login(email, password);
        
        res.json({ token, data })
    } catch (error) {
        console.error('Error al loguear usuario', error);

        if (error.statusCode) {
          return res.status(error.statusCode).send({ error: error.message });
        }

        res.status(500).send({ error: 'Error interno del servidor' });
    }
};

exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'email y password son obligatorios' });
    }
    
    try { 
        const newUser = await AuthServices.registerUser(email, password, name);

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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await AuthServices.deleteUser(id);

    res.status(200).send({ message: deleted.message });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  };
}

exports.verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        res.status(200).json({ message: 'Token is valid', userId: decoded.id });
    });
};
