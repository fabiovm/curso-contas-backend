const restful = require('node-restful')
const mongoose = restful.mongoose

const usuarioSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    qtdChildrens: { type: Number, min: 0, required: true }
})

module.exports = restful.model('Usuario', usuarioSchema)