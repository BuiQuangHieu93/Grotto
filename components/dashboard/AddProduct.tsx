import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { Value } from "@radix-ui/react-select";
import { AddProductModalProps, Furniture } from "@/types";

const AddProductModal: React.FC<AddProductModalProps> = ({ onSave }) => {
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [fileHoverUrl, setFileHoverUrl] = useState("");

  const [formData, setFormData] = useState<Furniture>({
    images: [],
    imageHover: "",
    title: "",
    originalPrice: 0,
    salePrice: 0,
    bestSelling: 0,
    date: new Date(),
    available: 0,
    feature: false,
    type: "",
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
      images: fileUrl,
      imageHover: fileHoverUrl,
    };
    onSave(updatedFormData);
    console.log(updatedFormData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details of the new product you want to add.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Image URL (Max 10 images)
                  </label>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      const urls = res.map((img) => img.url);
                      setFileUrl((prevUrls) => [...prevUrls, ...urls]);
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

                <div>
                  <label
                    htmlFor="originalPrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Original Price
                  </label>
                  <Input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    placeholder="Original Price"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>

                <div>
                  <label
                    htmlFor="available"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Available Stock
                  </label>
                  <Input
                    type="number"
                    id="available"
                    name="available"
                    placeholder="Available Stock"
                    value={formData.available}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Input
                    type="checkbox"
                    id="feature"
                    name="feature"
                    checked={formData.feature}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="feature"
                    className="text-sm font-medium text-gray-700"
                  >
                    Feature Product
                  </label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="imageHover"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Hover Image URL (Only 1 image)
                  </label>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setFileHoverUrl(res[0].url);
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

                <div>
                  <label
                    htmlFor="salePrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sale Price (Optional)
                  </label>
                  <Input
                    type="number"
                    id="salePrice"
                    name="salePrice"
                    placeholder="Sale Price"
                    value={formData.salePrice}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type
                  </label>
                  <Input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
              >
                Submit
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
