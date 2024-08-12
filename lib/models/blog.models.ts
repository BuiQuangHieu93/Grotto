import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  image: { type: String, required: true },
  day: { type: Date, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  detail: { type: String, required: true },
});

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
