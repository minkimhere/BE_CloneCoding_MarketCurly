const mongoose = require('mongoose');

const AddressesSchema = new mongoose.Schema({
    address: String,
    userId : String,
});

module.exports = mongoose.model('Addresses', AddressesSchema);