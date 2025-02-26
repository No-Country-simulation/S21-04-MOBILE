const database = require("../config/db");
const UserDTO = require("../models/User");
const ProfileService = require("./profileServices.js");
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

    async registerUser(email, password, name) {
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
          ]

          const [insertResult] = await database.query(query, values);

          // Crear perfil
          const profileCreated = await ProfileService.createProfile(
            insertResult.insertId, name
          );
         
          const userCreated = new UserDTO(insertResult.insertId, email);
          return {
           ...userCreated,
           ...profileCreated
          }
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

    async deleteUser(id) {
        try {
            const [results] = await database.query("DELETE FROM user WHERE id = ?", [id]);
            if (results.affectedRows === 0) {
                const error = new Error("El usuario no existe");
                error.statusCode = 404;
                throw error;
            }

            return { message: "Usuario eliminado exitosamente" };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthService();
