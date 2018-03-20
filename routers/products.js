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
        const copy = {...product._doc}
        delete copy._id;
        accumulator[id] = copy;
        
    });
       //grab the id 

       //delete the _id internal to the object 
       // set the id val in the accumulato obj equal to product  
    //return accumulator 
    return accumulator;


}

router.get('/products', (req, res, next) => {
    Product.find()
           .exec()
           .then(allProducts => {
               
            res.status(200).json({
                products: productArrToObj(allProducts)
            });
      
           

           })

           
           .catch(next);
           
   
});
router.get('/products/:id',(req, res, next) => {
    const {id} = req.params;
   
   Product.findById(id)
           .exec()
           .then(selectedProduct => {
                const selectedId = selectedProduct._id;
                const copy = {...selectedProduct._doc};
                delete copy._id
            res.status(200).json({
                products: {
                    [selectedId]: copy
                }
            })
           })
           .catch(next);
    
})
//post means create
router.post('/products', (req, res, next) => {
    if(!req.body.name){
        next({msg:'Bad request'})
    }
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        imgSRC: req.body.imgSrc

    });
    product.save()
           .then(response => {
            res.status(201).json({
                msg: 'created product!'
                })
                
           })
            .catch(next);
    
 
})

router.put('/products/:id', (req, res, next) => {
 const {id} = req.params;
 const update = {
     name: req.body.name,
     price: req.body.price,
     imgSrc: req.body.imgSrc

 };
 Product.findByIdAndUpdate(id, update)
    .then(response => {
        res.status(200).json({
            msg: 'You have been updated'
        })
    })
    .catch(next)
});

router.delete('/products/:id', (req, res, next) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then(response => {
            res.status(200).json({
                msg: 'Successfully deleted'
            });
        })

        .catch(next)
});

module.exports = router; // like export default 