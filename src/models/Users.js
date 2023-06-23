const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require ('bcryptjs');

const UserSchema = new Schema({
    nombre: {type:String, require: true},
    apellidos: {type: String, require: true},
    email: {type: String, require: true},
    contrasena: {type:String, require: true},
    date: {type: Date, default: Date.now}
});

UserSchema.methods.encryptPassword = async (contrasena) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(contrasena, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (contrasena) {
    return await bcrypt.compare( contrasena, this.contrasena);
}

module.exports = mongoose.model('User', UserSchema);