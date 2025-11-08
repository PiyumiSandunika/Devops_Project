const { Property } = require('../models');

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (err) {
    res.status(500).send('Error fetching properties');
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).send('Property not found');
    res.json(property);
  } catch (err) {
    res.status(500).send('Error fetching property');
  }
};

exports.addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.json(property);
  } catch (err) {
    res.status(500).send('Error adding property');
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).send('Property not found');
    await property.update(req.body);
    res.json(property);
  } catch (err) {
    res.status(500).send('Error updating property');
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).send('Property not found');
    await property.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).send('Error deleting property');
  }
};
