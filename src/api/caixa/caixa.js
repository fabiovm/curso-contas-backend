const restful = require('node-restful')
const mongoose = restful.mongoose

const creditoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

const debitoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    status: { type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const caixaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mes: { type: Number, min: 1, max: 12, required: true },
    ano: { type: Number, min: 1970, max: 2100, required: true },
    credito: [creditoSchema],
    debito: [debitoSchema]
})

module.exports = restful.model('Caixa', caixaSchema)