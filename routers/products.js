const express = require('express');
const router = express.Router();
const mockProducts = require('../mocks/products');

const Product = require('../models/product');

const productArrToObj = (arrayOfProducts) => {
    // create an accumulator obj 
    const accumulator = {};
    // for each product in array of products 
    arrayOfProducts.forEach(product => {
        const id = product._id;
        const copy = {...product}
        delete copy._id;
        accumulator[id] = copy;
        
    });
       //grab the id 

       //delete the _id internal to the object 
       // set the id val in the accumulato obj equal to product  
    //return accumulator 
    return accumulator;


}

router.get('/products', (req, res) => {
    res.status(200).json({
        products: productArrToObj(mockProducts)
    })
});
router.get('/products/:id',(req, res) => {
    const {id} = req.params;
    const productsObject = productArrToObj(mockProducts); // this will get deleted
    const selectedProduct = productsObject[id];
    res.status(200).json({
        products: {
            [id]: selectedProduct
        }
    })
})
//post means create
router.post('/products', (req, res) => {
    const productObject = productArrToObj(mockProducts);
    const id = 1000000 * Math.random();
    const newProduct = {
        _id: id,
        name: 'something',
        Price: 1000,
        created: new Date(),
        imgSRC: 'https://via.placeholder.com/250x250'
    }
    mockProducts.push(newProduct);
    res.status(201).json({
    msg: 'created product!'
    })
    
})


module.exports = router; // like export default 