const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')
const { orderByToMongo} = require('../../common/utils')
const { LIST } = require('../../consts')

BillingCycle.methods([ 'get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('', (req, res, next) => {
    let total = {};
    let orderBy =  orderByToMongo(req)
    const skip = req.query.skip?req.query.skip:LIST.SKIP_DEFAULT
    const limit = req.query.limit?req.query.limit:LIST.LIMIT_DEFAULT
    //req.headers.json({"x-count": 0})
    //console.log('orderBy: '+orderBy)
    BillingCycle.find((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(value)
        }
    }).sort(orderBy).skip(skip).limit(limit)

    
})

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.countDocuments((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
    }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, {
        $project: {_id: 0, credit: 1, debt: 1}
    }]).exec((error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }
    })
})

module.exports = BillingCycle