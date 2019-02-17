const env = require('../../src/.env')

module.exports = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', env.seguranca.corsAllow)
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}