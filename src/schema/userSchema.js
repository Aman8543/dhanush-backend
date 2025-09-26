const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['retailer', 'admin'], default: 'retailer' },
  address: String,
  phone:{type:String,required:true},
  cartItems:[{
    name: { type: String, required: true },
    image: { type: String, required: true },
    basePrice: { type: Number, required: true },
    description: { type: String, required: true }
}],
  
});

const User =mongoose.model('User', userSchema);
module.exports = User;