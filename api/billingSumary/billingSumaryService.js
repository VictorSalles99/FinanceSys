const _ = require('lodash')
const billingCycle = require('../billingCycle/billingCycle')

function getSumary(req, res) {
    billingCycle.aggregate([{
        $project: { debit: { $sum: "$debits.value" }, credit: { $sum: "$credits.value" } }
    }, {
        $group: { _id: null, debit: { $sum: "$debit" }, credit: { $sum: "$credit" } }
    }, {
        $project: { _id: 0, debit: 1, credit: 1 }
    }], function (error, result) {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(_.defaults(result[0], { debit: 0, credit: 0 }))
        }
    })
}

module.exports = { getSumary }