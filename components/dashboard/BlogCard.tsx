// components/BlogCard.tsx

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { DeleteBlogById } from "@/lib/actions/blog.actions";
import { BlogCardDeleteProps } from "@/types";

const BlogCard: React.FC<BlogCardDeleteProps> = ({ blog, onDelete }) => {
  const { image, day, location, title, detail, _id } = blog;
  const formattedDate = new Date(day).toLocaleDateString();

  const handleDelete = async () => {
    const success = await DeleteBlogById(_id);
    if (success) {
      onDelete(_id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          style={{ objectFit: "cover" }}
          layout="fill"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <p className="text-gray-700 mt-2 line-clamp-3">{detail}</p>
      </div>
      <div className="p-4">
        <Button variant="destructive" className="w-full" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
