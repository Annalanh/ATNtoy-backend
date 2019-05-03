const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    productName: {type: String, required: true},
    price: {type: Number, default: 0},
    initialStock: {type: Number, default: 100},
    sold: {type: Number, default: 0},
    currentStock: {type: Number, default: 100},
    revenue: {type: Number, default: 0},
    imageUrl: {type: String} 
}, {
    timestamps: true
})

module.exports = mongoose.model("StockData", StockSchema);