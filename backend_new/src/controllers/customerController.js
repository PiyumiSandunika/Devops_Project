const { Customer } = require('../models');

exports.makePayment = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).send('Payment recorded successfully!');
  } catch (err) {
    res.status(500).send('Error recording payment');
  }
};
