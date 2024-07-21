import { model, Schema } from "mongoose";

const homeItemsSchema = new Schema(
  {
    category: { type: String, required: [true, "Category is required"] },
    categoryTitle: { type: String },
    categoryHeading: { type: String },
    categoryDescription: { type: String },
    itemType: {
      type: String,
      required: true,
      enum: ["banner", "card", "banner-card"],
    },
    itemImage: { type: String },
    itemHeading: { type: String },
    itemDescription: { type: String },
    itemBackgroundImage: { type: String },
    itemDataElements: { type: Array },
  },
  { timestamps: true }
);
const homeItem = model("homeItem", homeItemsSchema);
export default homeItem;
