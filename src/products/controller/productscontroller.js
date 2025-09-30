let productscontroller = {}
let productjson = require('../product.json')

productscontroller.getallproducts = (req, res) => {
    try {
        let jsonproducts = productjson
        res.status(200).json(jsonproducts)
    } catch (err) {
        console.log(err)
    }
}



module.exports = productscontroller