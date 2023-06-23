const mongoose = require('mongoose');
const{ Schema } = mongoose;

const Noteschema = new Schema({
    tipo: {type: String, require: true},
    cod: {type: String, require: true},
    title: {type: String, require: true},
    description: {type: String, require: true},
    materia: {type: String, require: true},
    familia: {type: String, require: true},
    des: {type: String, require: true},
    origen: {type: String, require: true},
    propiedades: {type: String, require: true},
    formula: {type: String, require: true},

    color: {type: String, require: true},
    rgb: {type:String, require:true},
    densidad: {type: String, require: true},
    unidad: {type: String, require: true},
    refraccion: {type: String, require: true},
    solido: {type: String, require: true},
    ph: {type: String, require: true},
    lipico: {type: String, require: true},

    modo: {type: String, require: true},
    precauciones: {type: String, require: true},
    conclusiones: {type: String, require: true},

    date: {type: Date, default: Date.now},
    user: {type: String}
});

module.exports = mongoose.model('Note', Noteschema)