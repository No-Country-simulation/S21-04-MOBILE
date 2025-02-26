const database = require("../config/db");
const UserDTO = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
 
class AuthService {
    async getUser(userId) {
        const [result] = await database.query("SELECT * FROM user WHERE id = ?", [userId]);

        if (result.length === 0) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error
        }

        const { id, email } = result[0];

        return new UserDTO(id, email);
    }

    async registerUser(email, password) {
        try {
          const [result] = await database.query("SELECT id from user WHERE email = ?", [email]);

          if(result.length !== 0) {
            // usuario ya existe
            const error = new Error("El usuario ya existe");
            error.statusCode = 409;
            throw error;
          }

          const salt = bcrypt.genSaltSync(10);
          const passwordHash = bcrypt.hashSync(password, salt);

          const query = `
            INSERT INTO user (email, password, created_at)
            VALUES (?, ?, ?)
          `;

          const values = [
              email, 
              passwordHash,
              new Date()
          }

          const [insertResult] = await database.query(query, values);

          return new UserDTO(insertResult.insertId, email);
        } catch (error) { 
           throw error;
        }
    }

    async login(email, password) {
        try {
           const [result] = await database.query("SELECT * FROM user WHERE email = ?", [email]);

           if (result.length === 0) {
             const error = new Error("Usuario no encontrado");
             error.statusCode = 401;
             throw error
           }

           const user = result[0];
           const isMatch = await bcrypt.compare(password, user.password);

           if (!isMatch) {
             const error = new Error("Contraseña incorrecta");
             error.statusCode = 401;
             throw error
           }

           const payload = { id: user.id, email: user.email };
           const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

           return token
        } catch (error) {
           throw error;
        }
    }
}
