const fs = require('fs').promises;
const path = require('path');

const ordersFilePath = path.join(__dirname, '../../data/orders.json');


const validateOrder = (orderData) => {
    const errors = [];
    if (!orderData.firstName || orderData.firstName.trim() === '') {
        errors.push('First name is required');
    }
    if (!orderData.lastName || orderData.lastName.trim() === '') {
        errors.push('Last name is required');
    }
    if (!orderData.address || orderData.address.trim() === '') {
        errors.push('Address is required');
    }
    

    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
        errors.push('Order must contain at least one item');
    } else {
        orderData.items.forEach((item, index) => {
            if (!item.name || !item.price || !item.quantity) {
                errors.push(`Item at index ${index} is missing required fields (name, price, quantity)`);
            }
        });
    }


    if (typeof orderData.totalAmount !== 'number' || orderData.totalAmount <= 0) {
        errors.push('Valid total amount is required');
    }

    return errors;
};

const createOrder = async (orderData) => {
    try {
       
        const validationErrors = validateOrder(orderData);
        if (validationErrors.length > 0) {
            throw new Error('Validation failed: ' + validationErrors.join(', '));
        }

        const order = {
            id: Date.now().toString(),
            ...orderData,
            status: 'placed',
            createdAt: new Date().toISOString()
        };

        const dataDir = path.join(__dirname, '../../data');
        await fs.mkdir(dataDir, { recursive: true });

        
        let orders = [];
        try {
            const ordersData = await fs.readFile(ordersFilePath, 'utf8');
            orders = JSON.parse(ordersData);
        } catch (err) {
           console.log(err)
        }

     
        orders.push(order);

        await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));

        return order;
    } catch (error) {
        console.error('Error in order service:', error);
        throw error;
    }
};

module.exports = {
    createOrder
};