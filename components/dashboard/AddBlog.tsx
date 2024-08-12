"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/lib/uploadthing";
import { AddBlogModalProps, BlogDataProps } from "@/types";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

const AddBlog: React.FC<AddBlogModalProps> = ({ onSave }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState<BlogDataProps>({
    image: imageUrl, // Initialize with imageUrl
    day: new Date(),
    location: "",
    title: "",
    detail: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      image: imageUrl, // Ensure this matches your BlogDataProps
    };
    onSave(updatedFormData);
    console.log(updatedFormData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <div className="pr-2">
            <Image src="/icon/plus.svg" width={16} height={16} alt="plus" />
          </div>

          <span> Add Blog</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Blog</DialogTitle>
          <DialogDescription>
            Add to your blog here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form
            onSubmit={handleSubmit}
            className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
          >
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add Image
                </Label>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      image: res[0].url, // Update formData when image is uploaded
                    }));
                    console.log("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`);
                  }}
                  onUploadBegin={(name) => {
                    console.log("Uploading: ", name);
                  }}
                  className="w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </Label>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="detail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Detail
              </Label>
              <Input
                type="text"
                id="detail"
                name="detail"
                placeholder="Detail"
                value={formData.detail}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                required
              />
            </div>
            <DialogClose asChild>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
              >
                Submit
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="w-full mt-4">Close</Button>
            </DialogClose>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlog;
