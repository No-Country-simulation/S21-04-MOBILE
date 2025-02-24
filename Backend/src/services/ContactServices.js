const database = require("../config/db");
const ContactDTO = require("../dtos/contactDTO");

class ContactService {
    async getContact(id) {
        return new Promise((resolve, reject) => {
            database.query("SELECT * FROM contact WHERE id = ?", [id], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return reject(new Error("Contacto no encontrado"));

                const dbContact = results[0];
                const contact = new ContactDTO(
                    dbContact.id,
                    dbContact.user_id,
                    dbContact.name,
                    dbContact.last_name,
                    dbContact.email,
                    dbContact.phone,
                    dbContact.created_at
                );
                resolve(contact);
            });
        });
    }

    async createContact(userId, name, lastName, email, phone) {
        return new Promise((resolve, reject) => {
            // Validar si el usuario existe
            database.query("SELECT id FROM user WHERE id = ?", [userId], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El usuario no existe"));

                // Crear contacto
                const query = `
                    INSERT INTO contact (user_id, name, last_name, email, phone)
                    VALUES (?, ?, ?, ?, ?)
                `;
                const values = [userId, name, lastName, email || null, phone || null];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);

                    const newContact = new ContactDTO(
                        results.insertId,
                        userId,
                        name,
                        lastName,
                        email,
                        phone,
                        new Date()
                    );
                    resolve(newContact);
                });
            });
        });
    }

    async updateContact(id, name, lastName, email, phone) {
        return new Promise((resolve, reject) => {
            database.query("SELECT id FROM contact WHERE id = ?", [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("El contacto no existe"));

                const query = `
                    UPDATE contact
                    SET name = ?, last_name = ?, email = ?, phone = ?
                    WHERE id = ?
                `;
                const values = [name || null, lastName || null, email || null, phone || null, id];

                database.query(query, values, (error, results) => {
                    if (error) return reject(error);
                    resolve(true); // Retornamos true si se actualizó correctamente
                });
            });
        });
    }

    async deleteContact(id) {
        return new Promise((resolve, reject) => {
            database.query("DELETE FROM contact WHERE id = ?", [id], (error, results) => {
                if (error) return reject(error);
                if (results.affectedRows === 0) return reject(new Error("El contacto no existe"));

                resolve(true); // Retorna true si se eliminó correctamente
            });
        });
    }
}

module.exports = new ContactService();