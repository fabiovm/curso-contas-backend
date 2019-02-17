const Usuario = require('./usuario')
const errorHandler = require('../common/errorHandler')

Usuario.methods(['get', 'post', 'put', 'delete'])
Usuario.updateOptions({ new: true, runValidators: true })
Usuario.after('post', errorHandler).after('put', errorHandler)

// Usuario.route('', (req, res, next) => {
//     Usuario.find((error, value) => {
//         if (error) {
//             res.status(500).json({ errors: [error] })
//         } else {
//             res.json(value)
//         }
//     })

// })

Usuario.route('count', (req, res, next) => {
    Usuario.countDocuments((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Usuario