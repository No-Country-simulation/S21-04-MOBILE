const ContactService = require("../services/contactService");

exports.getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactService.getContact(id);
    res.status(200).send({ data: Contact });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error en el servidor' });
  }
};

exports.postContact = async (req, res) => {
  const { userId, lastName, bio, photoURL, gender } = req.body;
  try {
    const newContact = await ContactService.createContact(userId, lastName, bio, photoURL, gender);
    res.status(201).send({ message: 'Contacto creado exitosamente', Contact: newContact });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al crear contacto' });
  }
};

exports.putContact = async (req, res) => {
  const { id } = req.params;
  const { lastName, bio, photoURL, gender } = req.body;
  try {
    const updated = await ContactService.updateContact(id, lastName, bio, photoURL, gender);
    if (updated) {
      res.status(200).send({ message: 'Contacto actualizado exitosamente' });
    } else {
      res.status(404).send({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al actualizar contacto' });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ContactService.deleteContact(id);
    if (deleted) {
      res.status(200).send({ message: 'Contacto eliminado exitosamente' });
    } else {
      res.status(404).send({ error: 'Contacto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Error al eliminar contacto' });
  }
};
