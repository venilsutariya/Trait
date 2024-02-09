import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    qualityName: { type: String, required: true },
    photo: { type: String },
    yarnCost: { type: Number },
    warpingCost: { type: Number },
    extraCost: { type: Number },
    jobCost: { type: Number },
    addProfit: { type: Number },
    sellingPrice: { type: Number },
    yarnType: { type: String },
    warpYarnDetail: { type: String },
    weftYarnDetail: { type: String },
    yarnDetail: { type: String },
    yarnPattern: { type: String },
    reed: { type: String },
    reedPattern: { type: String },
    drafting: { type: String },
    lessing: { type: String }
  },
  {
    timestamps: true,
  }
);

export const Quality = mongoose.models.quality || mongoose.model("quality", qualitySchema);