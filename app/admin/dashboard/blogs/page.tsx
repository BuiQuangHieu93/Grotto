"use client";

import React, { useEffect, useState } from "react";
import AddBlog from "@/components/dashboard/AddBlog";
import BlogCard from "@/components/dashboard/BlogCard";
import {
  createBlog as createBlogAction,
  getAllBlog,
} from "@/lib/actions/blog.actions";
import { BlogDataProps, GetBlogParams } from "@/types";

const Blog = () => {
  const [blogs, setBlogs] = useState<GetBlogParams[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAllBlog();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  const handleAddBlog = async (newBlog: BlogDataProps) => {
    const createdBlog = await createBlogAction(newBlog);
    setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
  };

  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Blogs</h1>
      <div className="flex justify-end mb-4">
        <AddBlog onSave={handleAddBlog} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDeleteBlog} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
