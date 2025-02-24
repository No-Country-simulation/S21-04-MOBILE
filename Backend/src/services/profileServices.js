const database = require("../config/db");
const ProfileDTO = require("../models/Profile");

class ProfileService {
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

    async createProfile(userId, name, lastName, bio, photoURL, gender, createdAt) {
        return new Promise((resolve, reject) => {
            database.query("SELECT id FROM user WHERE id = ?", [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El usuario no existe"));

                const query = `
                    INSERT INTO profile (user_id, name, last_name, bio, photo_url, gender, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                const created_at =  createdAt || new Date() 
                const values = [userId, name, lastName, bio || null, photoURL || null, gender , created_at];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);

                    const newProfile = new ProfileDTO(results.insertId, userId, name, lastName, bio, photoURL, gender, created_at);
                    resolve(newProfile);
                });
            });
        });
    }

    async updateProfile(userId, name, lastName, bio, photoURL, gender) {
        return new Promise((resolve, reject) => {
            database.query("SELECT id FROM profile WHERE user_id = ?", [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El perfil no existe"));

                const query = `
                    UPDATE profile 
                    SET name = ?, last_name = ?, bio = ?, photo_url = ?, gender = ?
                    WHERE user_id = ?
                `;
                const values = [name || null, lastName || null, bio || null, photoURL || null, gender || null, userId];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);
                    resolve(true);
                });
            });
        });
    }

    async deleteProfile(userId) {
        return new Promise((resolve, reject) => {
            database.query("DELETE FROM profile WHERE user_id = ?", [userId], (error, results) => {
                if (error) return reject(error);
                if (results.affectedRows === 0) return reject(new Error("El perfil no existe"));

                resolve(true);
            });
        });
    }
}

module.exports = new ProfileService();