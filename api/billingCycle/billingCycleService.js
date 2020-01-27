const BillingCycle = require('./billingCycle')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.route('count', function (req, res, next) {
    BillingCycle.count(function (erro, value) {
        if (erro) {
            res.status(500).json({ errors: [erro] })
        } else {
            res.json({value})
        }
    })
})

module.exports = BillingCycle