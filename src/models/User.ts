import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    avatar: { type: String, default: "" },
    name: { type: String, required: true }
});

// UserSchema.virtual('url').get(() => {
//     return '/users' + this._id
// })

export default model('User', UserSchema)