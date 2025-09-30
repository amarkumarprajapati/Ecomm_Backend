const orderService = require('../services/orderservice');

const placeOrder = async (req, res) => {
    try {
        const { firstName, lastName, address, items, totalAmount } = req.body;
        if (!firstName || !lastName || !address) {
            return res.status(400).json({
                success: false,
                message: 'First name, last name, and address are required'
            });
        }

      
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

     
        const order = await orderService.createOrder({
            firstName,
            lastName,
            address,
            items,
            totalAmount
        });

        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Error placing order:', error);
        
    
        if (error.message.includes('Validation failed')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

      
        return res.status(500).json({
            success: false,
            message: 'Error placing order'
        });
    }
};

module.exports = {
    placeOrder
};