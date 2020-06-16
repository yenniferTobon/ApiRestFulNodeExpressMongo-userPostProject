const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user', UserSchema);
