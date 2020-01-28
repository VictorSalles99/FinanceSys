const BillingCycle = require('./billingCycle')
const _ = require('lodash')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

BillingCycle.after('post', sendErrorsOrnext).after('put', sendErrorsOrnext)

function sendErrorsOrnext(req, res, next) {
    const bundle = res.locals.bundle

    if (bundle.errors) {
        let errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }

    function parseErrors(nodeRestFulErrors){
        const errors = []
        _.forIn(nodeRestFulErrors, error => errors.push(error.message))
        return errors        
    }
}

BillingCycle.route('count', function (req, res, next) {
    BillingCycle.count(function (erro, value) {
        if (erro) {
            res.status(500).json({ errors: [erro] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = BillingCycle