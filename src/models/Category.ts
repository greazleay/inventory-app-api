import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

// Virtal for Category URL
// CategorySchema.virtual("url").get(() => {
//   return "/api/category" + this._id;
// });

export default model("Category", CategorySchema);