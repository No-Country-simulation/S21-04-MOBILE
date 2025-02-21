const database = require("../config/db");

exports.getProfile = (req, res) => {
    const { id } = req.params;
    // get profile from database
    database.query(
        "SELECT * FROM profile WHERE id = ?",
        [id],
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ error: 'Error en el servidor' });
            }

            if (results.length === 0) {
                return res.status(404).send({ message: 'Perfil no encontrado' });
            }

            res.status(200).send({ data: results[0] });
        })
};

exports.postProfile = (req, res) => {
    const { userId, lastName, bio, photoURL, gender } = req.body;
    // validate if exists user by id
    database.query("SELECT id FROM user WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'El usuario no existe' });
        }

        // creating profile
        const query = `
            INSERT INTO profile (user_id, last_name, bio, photo_url, gender)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [userId, lastName, bio || null, photoURL || null, gender];

        database.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ error: 'Error al crear el perfil' });
            }

            res.status(201).send({ message: 'Perfil creado exitosamente', profileId: results.insertId });
        });
    });
};

exports.putProfile = (req, res) => {
    const { id } = req.params;
    const { lastName, bio, photoURL, gender } = req.body;
    // validate if exists user by id
    database.query("SELECT id FROM profile WHERE user_id = ?", [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'El perfil no existe' });
        }
        
        // updating profile
        const query = `
            UPDATE profile 
            SET last_name = ?, bio = ?, photo_url = ?, gender = ?
            WHERE user_id = ?
        `;
        const values = [lastName || null, bio || null, photoURL || null, gender || null, id];

        database.query(query, values, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ error: 'Error al actualizar el perfil' });
            }

            res.status(200).send({ message: 'Perfil actualizado exitosamente' });
        });
    });
};

// exports.deleteProfile = (req, res) => {};