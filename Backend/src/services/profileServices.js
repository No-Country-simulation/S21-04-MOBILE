const database = require("../config/db");
const ProfileDTO = require("../models/Profile");

class ProfileService {
    async getProfile(userId) {
        const [result] = await database.query("SELECT * FROM profile WHERE user_id = ?", [userId]);

        if (result.length === 0) {
            const error = new Error("Perfil no encontrado");
            error.statusCode = 404
            throw error
        }

        const { id, user_id, name, last_name, bio, photo_url, gender, created_at } = result[0];

        return new ProfileDTO(id, user_id, name, last_name, bio, photo_url, gender, created_at);
    }

    async createProfile(userId, name, lastName, bio, photoURL, gender, createdAt) {
        try {
            const [userResult] = await database.query("SELECT id FROM user WHERE id = ?", [userId]);

            if (userResult.length === 0) {
                const error = new Error("El usuario no existe");
                error.statusCode = 404;
                throw error;
            }

            const [profileResult] = await database.query("SELECT * FROM profile WHERE user_id = ?", [userId]);

            if (profileResult.length > 0) {
                const error = new Error("Ya existe el perfil del usuario");
                error.statusCode = 400;
                throw error;
            }

            const query = `
                INSERT INTO profile (user_id, name, last_name, bio, photo_url, gender, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            const values = [
                userId,
                name,
                lastName,
                bio || null,
                photoURL || null,
                gender,
                createdAt || new Date(),
            ];

            const [insertResult] = await database.query(query, values);

            const newProfile = new ProfileDTO(
                insertResult.insertId,
                userId,
                name,
                lastName,
                bio,
                photoURL,
                gender,
                createdAt
            );

            return newProfile;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(userId, name, lastName, bio, photoURL, gender) {
        try {
            const [profileResult] = await database.query("SELECT id FROM profile WHERE user_id = ?", [userId]);

            if (profileResult.length === 0) {
                const error = new Error("El perfil no existe");
                error.statusCode = 404;
                throw error;
            }

            const query = `
                UPDATE profile 
                SET name = ?, last_name = ?, bio = ?, photo_url = ?, gender = ?
                WHERE user_id = ?
            `;

            const values = [name || null, lastName || null, bio || null, photoURL || null, gender || null, userId];

            const [updateResult] = await database.query(query, values);

            if (updateResult.affectedRows === 0) {
                const error = new Error("No se pudo actualizar el perfil");
                error.statusCode = 400;
                throw error;
            }

            return { message: "Perfil actualizado exitosamente" };
        } catch (error) {
            throw error;
        }
    }

    async deleteProfile(userId) {
        try {
            const [results] = await database.query("DELETE FROM profile WHERE user_id = ?", [userId]);
            if (results.affectedRows === 0) {
                const error = new Error("El perfil no existe");
                error.statusCode = 404;
                throw error;
            }

            return { message: "Perfil eliminado exitosamente" };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProfileService();