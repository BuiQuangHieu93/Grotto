import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { AddProductModalProps, IFurniture, IFurnitureFrontend } from "@/types";
import Image from "next/image";

const AddProductModal: React.FC<AddProductModalProps> = ({ onSave }) => {
  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [fileHoverUrl, setFileHoverUrl] = useState("");

  const [formData, setFormData] = useState<IFurnitureFrontend>({
    images: [],
    imageHover: "",
    title: "",
    originalPrice: 0,
    salePrice: 0,
    bestSelling: 0,
    date: new Date(),
    available: 0,
    feature: false,
    type: "Home", // Default to a valid value
    category: "table and chair", // Default to a valid value
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const updatedFormData = {
        ...formData,
        images: fileUrl,
        imageHover: fileHoverUrl,
      };

      onSave(updatedFormData);

      // Reset the form to its initial state
      setFormData({
        images: [],
        imageHover: "",
        title: "",
        originalPrice: 0,
        salePrice: 0,
        bestSelling: 0,
        date: new Date(),
        available: 0,
        feature: false,
        type: "Home", // Default to a valid value
        category: "table and chair", // Default to a valid value
      });

      // Reset the file URLs
      setFileUrl([]);
      setFileHoverUrl("");
    },
    [fileUrl, fileHoverUrl, formData, onSave]
  );

  const handleTypeChange = useCallback(
    (value: "Home" | "Office" | "Kitchen") => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        type: value,
      }));
    },
    []
  );

  const handleCategoryChange = useCallback(
    (
      value: "table and chair" | "ceramic art" | "lighting" | "sofa and chair"
    ) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: value,
      }));
    },
    []
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <div className="pr-2">
            <Image src="/icon/plus.svg" width={16} height={16} alt="plus" />
          </div>
          <span>Add Product</span>
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
                    Sale Price
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
                    htmlFor="bestSelling"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Best Selling
                  </label>
                  <Input
                    type="number"
                    id="bestSelling"
                    name="bestSelling"
                    placeholder="Best Selling Rank"
                    value={formData.bestSelling}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Type
                </label>
                <Select onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table and chair">
                      Table and Chair
                    </SelectItem>
                    <SelectItem value="ceramic art">Ceramic Art</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="sofa and chair">
                      Sofa and Chair
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Product
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
