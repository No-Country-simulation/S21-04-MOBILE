const ContactService = require("../services/ContactServices");

exports.getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await ContactService.getContact(id);

    res.status(200).send({ data: contact });
  } catch (error) {
    console.error('Error al obtener datos de contacto:', error);
    
    res.status(error.statusCode || 500).send({
      error: error.message || 'Error en el servidor'
    });
  }
};

exports.postContact = async (req, res) => {
  const { userId, spotify, youtube, phone } = req.body;

  if (!spotify || !youtube || !phone) {
    return res.status(400).send({ error: 'userId, name y lastName son obligatorios' });
  }

  try {
    const newContact = await ContactService.createContact(userId, spotify, youtube, phone);

    res.status(201).send({
      message: "Datos de contacto creado exitosamente",
      data: newContact
    })
  } catch (error) {
    console.error('Error al crear datos de contacto', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

exports.putContact = async (req, res) => {
  const { id } = req.params;
  const { spotify, youtube, phone } = req.body;

  try {
    const updated = await ContactService.updateContact(id, userId, spotify, youtube, phone);

    res.status(200).send({ message: updated.message });
  } catch (error) {
    console.error('Error al actualizar los datos de contacto:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ContactService.deleteContact(id);

    res.status(200).send({ message: deleted.message });
  } catch (error) {
    console.error('Error al eliminar los datos de contacto:', error);

    if (error.statusCode) {
      return res.status(error.statusCode).send({ error: error.message });
    }

    res.status(500).send({ error: 'Error interno del servidor' });
  };
}