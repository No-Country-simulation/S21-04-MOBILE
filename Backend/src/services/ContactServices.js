const database = require("../config/db");
const ContactDTO = require("../models/Contact");

class ContactService {
    async getContact(userId) {
        const [result] = await database.query("SELECT * FROM contact WHERE user_id = ?", [userId]);

        if (result.length === 0) {
            const error = new Error("Datos de contacto no encontrado");
            error.statusCode = 404;
            throw error
        }

        const { id, user_id, spotify, youtube, phone } = result[0];

        return new ContactDTO(id, user_id, spotify, youtube, phone);
    }

    async createContact(userId, spotify, youtube, phone) {
        try {
            const [userResult] = await database.query("SELECT id from user WHERE id = ?", [userId]);

            if (userResult.length === 0) {
                const error = new Error("El usuario no existe");
                error.statusCode = 404;
                throw error;
            }

            const [contactResult] = await database.query("SELECT * FROM contact WHERE user_id = ?", [userId]);

            if (contactResult.length > 0) {
                const error = new Error("Ya existe datos de contacto del usuario");
                error.statusCode = 400;
                throw error;
            };

            const query = `
                INSERT INTO contact (user_id, spotify, youtube, phone, created_at)
                VALUES (?, ?, ?, ?)
            `;

            const values = [
                userId,
                spotify || null,
                youtube || null,
                phone || null,
                createdAt || new Date()
            ];

            const [insertResult] = await database.query(query, values);

            const newContact = new ContactDTO(
                insertResult.insertId,
                userId,
                spotify,
                youtube,
                phone,
                createAt
            );

            return newContact;
        } catch (error) {
            throw error;
        }
    }

    async updateContact(userId, spotify, youtube, phone) {
        try {
            const [contactResult] = await database.query("SELECT id FROM profile WHERE user_id = ?", [userId]);

            if (contactResult.length === 0) {
                const error = new Error("El usuario no existe");
                error.statusCode = 404;
                throw error;
            }

            const query = `
                UPDATE contact 
                SET spotify = ?, youtube = ?, phone = ?
                WHERE user_id = ?
            `;

            const values = [spotify || null, youtube || null, phone || null, userId];

            const [updateResult] = await database.query(query, values);

            if (updateResult.affectedRows === 0) {
                const error = new Error("No se pudo actualizar los datos de contacto");
                error.statusCode = 400;
                throw error;
            }

            return { message: "Datos de contacto actualizado exitosamente" };
        } catch (error) {
            throw error;
        }
    }

    async deleteContact(userId) {
        try {
            const [results] = await database.query("DELETE FROM contact WHERE user_id = ?", [userId]);
            if (results.affectedRows === 0) {
                const error = new Error("Los datos de contacto no existen");
                error.statusCode = 404;
                throw error;
            }

            return { message: "Datos de contacto eliminado exitosamente" };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ContactService();