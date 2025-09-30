const express = require('express')
let port = 4000
const expressapp = express()
const productrouter = require('./src/products/routes/productsroute')
const orderRouter = require('./src/orders/routes/orderroute')
const cors = require('cors')


expressapp.use(express.json())
expressapp.use(cors())


expressapp.get('', async (req, res) => {
    res.send("i am running")
})

expressapp.use('/product', productrouter)
expressapp.use('/orders', orderRouter)

expressapp.listen(port, () => {
    console.log(`server running on port = ${port}`)
})