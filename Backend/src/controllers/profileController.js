const ProfileService = require("../services/profileServices");

exports.getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await ProfileService.getProfile(id);
    res.status(200).send({ data: profile });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error en el servidor' });
  }
};

exports.postProfile = async (req, res) => {
  const { userId, name, lastName, bio, photoURL, gender, createdAt } = req.body;
  try {
    const newProfile = await ProfileService.createProfile(userId, name, lastName, bio, photoURL, gender, createdAt);
    res.status(201).send({ message: 'Perfil creado exitosamente', profile: newProfile });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al crear el perfil' });
  }
};

exports.putProfile = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, bio, photoURL, gender } = req.body;
  try {
    const updated = await ProfileService.updateProfile(id, name, lastName, bio, photoURL, gender);
    if (updated) {
      res.status(200).send({ message: 'Perfil actualizado exitosamente' });
    } else {
      res.status(404).send({ error: 'Perfil no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al actualizar el perfil' });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ProfileService.deleteProfile(id);
    if (deleted) {
      res.status(200).send({ message: 'Perfil eliminado exitosamente' });
    } else {
      res.status(404).send({ error: 'Perfil no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al eliminar el perfil' });
  }
};
