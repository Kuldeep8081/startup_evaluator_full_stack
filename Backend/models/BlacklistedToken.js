import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true }
}, { timestamps: true });

export const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
