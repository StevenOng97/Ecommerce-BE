const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    images: [{ type: String, required: true }],
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    isNew: { type: Boolean, default: false },
    priceAfterSale: { type: Number },
    sale: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
