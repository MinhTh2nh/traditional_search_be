const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    product_id: { type: String, required: true }, // Unique product ID
    product_code: { type: Number, required: true }, // Unique product identifier
    name: { type: String, required: true }, // Product name
    category: { type: String, required: true }, // Product category
    color: { type: String, required: true }, // Product color
    description: { type: String, default: "" }, // Product description
    index_name: { type: String, required: false }, // Optional index name
    total_stock: { type: Number, required: true }, // Total stock available
    sold_count: { type: Number, default: 0 }, // Number of items sold
    review_count: { type: Number, default: 0 }, // Total number of reviews
    rating_count: { type: Number, default: 0 }, // Total number of ratings
    avg_rating: { type: Number, default: 0 }, // Average product rating
    total_rating: { type: Number, default: 0 }, // Sum of all ratings
    price: { type: Number, required: true }, // Product price
    image_url: { type: String, default: "" }, // Image URL for the product
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to reviews
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text", description: "text" });

// Create the model
module.exports = mongoose.model('Product', productSchema);




