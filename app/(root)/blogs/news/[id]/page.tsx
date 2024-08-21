"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBlog, GetBlogById } from "@/lib/actions/blog.actions";
import { GetBlogParams } from "@/types";
import Image from "next/legacy/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState<GetBlogParams[]>([]);
  const [blog, setBlog] = useState<GetBlogParams>();
  const [loading, setLoading] = useState(true); // Loading state
  const params = useParams();

  const blogId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    const fetchBlog = async () => {
      // First, get the specific blog by ID
      if (blogId) {
        const blog = await GetBlogById(blogId);
        setBlog(blog);

        // After setting the blog, fetch all blogs and filter out the current blog
        const blogs = await getAllBlog();
        const blogsFilter = blogs.filter(
          (item: GetBlogParams) => item._id !== blog._id
        );
        setBlogs(blogsFilter);
      }
      setLoading(false); // Stop loading after fetching data
    };

    fetchBlog();
  }, [blogId]);

  const formattedDate = (day?: Date) => {
    if (day) {
      return new Date(day).toLocaleDateString();
    }
    return "Unknown Date";
  };

  return (
    <div className="bg-[#e9e8e4] w-full py-20 px-5">
      <div className="pb-12">
        <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center">
          Blog
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="order-last md:order-first flex-shrink-0 border-[1px] border-white h-[570px] rounded-md">
          <h2 className="text-xl font-semibold bg-gray-100 p-5 rounded-t-md">
            Recent Post
          </h2>
          <div className="h-[500px] overflow-y-auto rounded-b-md">
            {blogs.map((data) => (
              <Link
                className="flex flex-row p-4"
                key={data._id}
                href={`/blogs/news/${data._id}`}
              >
                <div className="pr-4">
                  {loading ? (
                    <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-sm" />
                  ) : (
                    <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24">
                      <Image
                        src={data.image}
                        alt="image"
                        layout="fill"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-sm md:text-base text-[#666666] hover:text-black">
                    {data.title}
                  </div>
                  <div className="flex flex-row pt-2">
                    <div>
                      <Image
                        src="/icon/calendar.svg"
                        alt="calendar"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className="text-[#a6946b]">
                      {formattedDate(data.day)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="order-first md:order-last flex-grow">
          {loading ? (
            <Skeleton className="w-full h-[200px] sm:h-[400px] md:h-[688px] rounded-sm" />
          ) : (
            <div key={blog?._id} className="group">
              <div className="w-full overflow-hidden">
                <Image
                  src={blog?.image as string}
                  width={1034}
                  height={688}
                  alt={`image-${blog?._id}`}
                  className="transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex flex-row text-center text-xs sm:text-sm text-[#a6946b] uppercase py-2 sm:py-4">
                  <span>
                    <Image
                      src="/icon/calendar.svg"
                      width={20}
                      height={20}
                      alt="calendar"
                    />
                  </span>
                  <div className="pl-2 sm:pl-4">{formattedDate(blog?.day)}</div>
                  <span className="px-1 sm:px-2">&bull;</span>
                  <div>{blog?.location}</div>
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-semibold pb-2 sm:pb-4 group-hover:text-[#a6946b]">
                  {blog?.title}
                </div>
                <div className="text-xs sm:text-sm text-[#666666] font-normal">
                  {blog?.detail}
                </div>
              </div>
            </div>
          )}
          <Button className="flex items-center mt-5 py-2 bg-[#333333] text-white w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%]">
            <Image
              src="/icon/upload-share.svg"
              width={12}
              height={12}
              alt="share"
            />
            <span className="ml-2">Share</span>
          </Button>
        </div>
      </div>

      <div className="flex-center md:mt-16 lg:mt-20 mt-12">
        <Link
          className="flex flex-row items-center p-2 sm:p-3 md:p-4 text-sm sm:text-base"
          href="/blog/news"
        >
          <Image
            src="/icon/arrow-back.svg"
            width={16}
            height={16}
            alt="arrow-back"
          />
          <span className="ml-2 sm:ml-4">Back to blog</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
