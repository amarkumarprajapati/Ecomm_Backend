let express = require('express')
let productscontroller = require('../controller/productscontroller')

let route = express.Router()

route.get('/getallproducts', productscontroller.getallproducts)

module.exports = route