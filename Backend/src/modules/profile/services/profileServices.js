const database = require("../../../config/db");
const ProfileDTO = require("../models/Profile");

class ProfileService {
    // Obtener perfil por ID
    async getProfile(id) {
        return new Promise((resolve, reject) => {
            database.query("SELECT * FROM profile WHERE id = ?", [id], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return reject(new Error("Perfil no encontrado"));

                const dbProfile = results[0];
                const profile = new ProfileDTO(dbProfile.id, dbProfile.user_id, dbProfile.name, dbProfile.last_name, dbProfile.bio, dbProfile.photo_url, dbProfile.gender, dbProfile.created_at);
                resolve(profile);
            });
        });
    }

    // Crear un nuevo perfil
    async createProfile(userId, lastName, bio, photoUrl, gender) {
        return new Promise((resolve, reject) => {
            // Validar si el usuario existe
            database.query("SELECT id FROM user WHERE id = ?", [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El usuario no existe"));

                // Crear perfil
                const query = `
          INSERT INTO profile (user_id, last_name, bio, photo_url, gender)
          VALUES (?, ?, ?, ?, ?)
        `;
                const values = [userId, lastName, bio || null, photoUrl || null, gender];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);

                    const newProfile = new ProfileDTO(results.insertId, userId, null, lastName, bio, photoUrl, gender, new Date());
                    resolve(newProfile);
                });
            });
        });
    }

    // Actualizar un perfil
    async updateProfile(userId, lastName, bio, photoUrl, gender) {
        return new Promise((resolve, reject) => {
            database.query("SELECT id FROM profile WHERE user_id = ?", [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El perfil no existe"));

                const query = `
          UPDATE profile 
          SET last_name = ?, bio = ?, photo_url = ?, gender = ?
          WHERE user_id = ?
        `;
                const values = [lastName || null, bio || null, photoUrl || null, gender || null, userId];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);
                    resolve(true); // Retornamos true si se actualizó correctamente
                });
            });
        });
    }

    // Eliminar un perfil
    async deleteProfile(userId) {
        return new Promise((resolve, reject) => {
            database.query("DELETE FROM profile WHERE user_id = ?", [userId], (error, results) => {
                if (error) return reject(error);
                if (results.affectedRows === 0) return reject(new Error("El perfil no existe"));

                resolve(true); // Retorna true si se eliminó correctamente
            });
        });
    }
}

module.exports = new ProfileService();