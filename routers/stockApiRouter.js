const express = require('express');
const Router = express.Router;
const stockApiRouter = Router();

const StockModel = require("../Models/StockData");

//Create
stockApiRouter.post("/", (req, res) => {
    const name = req.body.productName;
    const initial = req.body.initialStock;
    const price = req.body.price;
    const sold = req.body.sold;
    const current = initial - sold;
    const revenue = price*sold;
    const url = req.body.imageUrl;

    StockModel.create({productName: name, initialStock: initial, price: price, sold: sold, currentStock: current, revenue: revenue, imageUrl: url}, (err, stockCreated) => {
        if(err) res.send({success: 0, err})
        else res.send({success: 1, data: stockCreated})
    })
})
//Read all
stockApiRouter.get("/", (req, res) => {
    StockModel.find({}, (err, products) => {
        if(err) console.log(err)
        else res.send({success: 1, data: products})
    })
})
//Read by Id
stockApiRouter.get("/:id", (req, res) => {
    StockModel.findOne({"_id" : req.params['id']}, (err, product) => {
        if(err) {
            console.log(err)
        }
        else res.send(product)
    })
})
//Update
stockApiRouter.put("/:id/", (req, res) => {
    const id = req.params.id;
    const sold = req.body.sold;
    StockModel.findById(id, (err, product) => {
        if(err) {
            console.log(err)
        }
        else{
            const newSold = Number(product.sold) + Number(sold);
            const newCurrent = product.currentStock - sold;
            const newRevenue = product.revenue + product.price * sold;
            StockModel.findByIdAndUpdate(
                product._id,
                {$set: {sold: newSold, currentStock: newCurrent, revenue: newRevenue}},
                {new: true},
                (err, updated) => {
                    if(err) console.log(err)
                    else {
                        StockModel.find({}, (err, products) => {
                            if(err) console.log(err)
                            else res.send(products)
                        })
                    }
                }
            )
        }
    })
})
//delete
stockApiRouter.delete("/:id", (req, res) => {
    StockModel.deleteOne({"_id": req.params.id}, (err, deleted) => {
        if(err) console.log(err)
        else res.send(deleted)
    })
})

module.exports = stockApiRouter;