import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number },
  stock: { type: Number },
  img: { type: String },
});

// Virtal for Category URL
// ProductSchema.virtual("url").get(() => {
//   return "/api/product" + this._id;
// });

export default model("Product", ProductSchema);
