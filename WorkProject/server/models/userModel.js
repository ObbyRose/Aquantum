import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
});  

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;