const ProfileService = require("../services/profileServices");

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await ProfileService.getProfile(id);

    res.status(200).send({ data: profile });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    
    res.status(error.statusCode || 500).send({
      error: error.message || 'Error en el servidor'
    });
  }
};

exports.postProfile = async (req, res) => {
  const { userId, name, lastName, bio, photoURL, gender, createdAt } = req.body;

  if (!userId || !name || !lastName) {
    return res.status(400).send({ error: 'userId, name y lastName son obligatorios' });
  }

  try {
    const newProfile = await ProfileService.createProfile(
      userId, name, lastName, bio, photoURL, gender, createdAt
    );

    res.status(201).send({
      message: 'Perfil creado exitosamente',
      data: newProfile
    });
  } catch (error) {
    console.error('Error al crear el perfil:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

exports.putProfile = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, bio, photoURL, gender } = req.body;

  try {
    const updated = await ProfileService.updateProfile(id, name, lastName, bio, photoURL, gender);

    res.status(200).send({ message: updated.message });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ProfileService.deleteProfile(id);

    res.status(200).send({ message: deleted.message });
  } catch (error) {
    console.error('Error al eliminar el perfil:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

