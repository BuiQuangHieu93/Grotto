import { ICompare } from "@/types";
import { Schema, model, models } from "mongoose";

const CompareSchema = new Schema<ICompare>({
  clerkId: { type: String, required: true, unique: true },
  compare: [
    {
      type: Schema.Types.ObjectId,
      ref: "Furniture",
      required: true,
    },
  ],
});

const Compare = models.Compare || model("Compare", CompareSchema);

export default Compare;
