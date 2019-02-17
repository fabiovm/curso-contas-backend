const Caixa = require('./caixa')
const errorHandler = require('../common/errorHandler')

Caixa.methods([ 'get', 'post', 'put', 'delete'])
Caixa.updateOptions({new: true, runValidators: true})
Caixa.after('post', errorHandler).after('put', errorHandler)

// Caixa.route('', (req, res, next) => {
//     Caixa.find((error, value) => {
//         if(error) {
//             res.status(500).json({errors: [error]})
//         } else {
//             res.json(value)
//         }
//     })
// })

Caixa.route('contar', (req, res, next) => {
    Caixa.countDocuments((error, value) => {
        if (error) {    
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

Caixa.route('sumario', (req, res, next) => {
    Caixa.aggregate([{
        $project: {credito: {$sum: "$creditos.value"}, debito: {$sum: "$debitos.value"}}
    }, {
        $group: {_id: null, credito: {$sum: "$credito"}, debito: {$sum: "$debito"}}
    }, {
        $project: {_id: 0, credito: 1, debito: 1}
    }]).exec((error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credito: 0, debito: 0 })
        }
    })
})

module.exports = Caixa