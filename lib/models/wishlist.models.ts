import { IWishlist } from "@/types";
import { Schema, model, models } from "mongoose";

const WishlistSchema = new Schema<IWishlist>({
  clerkId: { type: String, required: true, unique: true },
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Furniture",
      required: true,
    },
  ],
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;
