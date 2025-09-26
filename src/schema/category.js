const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  basePrice: { type: Number, required: true },
  description: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },
  products: [productSchema] // Array of products
});


const Category=mongoose.model('Category', categorySchema);
module.exports = Category;
