import React, { useState } from "react";
import Image from "next/legacy/image";
import { ProductCardProps, UpdateFurnitureParams } from "@/types";
import { Button } from "../ui/button";
import {
  deleteFurniture,
  updateFurniture,
} from "@/lib/actions/product.actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductCard = ({ product, onDelete, onUpdate }: ProductCardProps) => {
  const [formData, setFormData] = useState<UpdateFurnitureParams>({
    title: product.title,
    originalPrice: product.originalPrice,
    salePrice: product.salePrice,
    available: product.available,
    feature: product.feature,
    type: product.type,
    bestSelling: product.bestSelling,
    category: product.category,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = await handleUpdate(formData);
    if (updatedProduct) {
      onUpdate(updatedProduct); // Notify parent of the update
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const success = await deleteFurniture(productId);
      if (success) {
        onDelete(productId);
      }
    }
  };

  const handleUpdate = async (updatedProduct: UpdateFurnitureParams) => {
    return await updateFurniture(product._id, updatedProduct);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <Image
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
        height={192}
        width={192}
      />
      <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600">
        ${product.salePrice}
        <span className="line-through">${product.originalPrice}</span>
      </p>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className=" text-white py-1 px-4 rounded w-full"
              >
                Edit Furniture
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Furniture</DialogTitle>
                <DialogDescription>
                  Make changes to your Furniture here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
              >
                <div className="space-y-6">
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
                      value={formData.title || ""}
                      onChange={handleChange}
                      className="w-full border-gray-300 rounded-md shadow-sm p-3"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label
                          htmlFor="originalPrice"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Original Price
                        </Label>
                        <Input
                          type="number"
                          id="originalPrice"
                          name="originalPrice"
                          placeholder="Original Price"
                          value={formData.originalPrice || ""}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm p-3"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="available"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Available Stock
                        </Label>
                        <Input
                          type="number"
                          id="available"
                          name="available"
                          placeholder="Available Stock"
                          value={formData.available || ""}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm p-3"
                        />
                      </div>

                      <div className="flex items-center space-x-3">
                        <Input
                          type="checkbox"
                          id="feature"
                          name="feature"
                          checked={formData.feature || false}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                        />
                        <Label
                          htmlFor="feature"
                          className="text-sm font-medium text-gray-700"
                        >
                          Feature Product
                        </Label>
                      </div>

                      <div>
                        <Label
                          htmlFor="bestSelling"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Best Selling Rank (Optional)
                        </Label>
                        <Input
                          type="number"
                          id="bestSelling"
                          name="bestSelling"
                          placeholder="Best Selling Rank"
                          value={formData.bestSelling || ""}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm p-3"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <Label
                          htmlFor="salePrice"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Sale Price (Optional)
                        </Label>
                        <Input
                          type="number"
                          id="salePrice"
                          name="salePrice"
                          placeholder="Sale Price"
                          value={formData.salePrice || ""}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm p-3"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Type
                        </Label>
                        <Input
                          type="text"
                          id="type"
                          name="type"
                          placeholder="Type"
                          value={formData.type || ""}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md shadow-sm p-3"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Category
                        </Label>
                        <Select onValueChange={handleCategoryChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="table and chair">
                              Table and Chair
                            </SelectItem>
                            <SelectItem value="ceramic art">
                              Ceramic Art
                            </SelectItem>
                            <SelectItem value="lighting">Lighting</SelectItem>
                            <SelectItem value="sofa and chair">
                              Sofa and Chair
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
                  >
                    Update
                  </Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Button
          variant="destructive"
          className=" text-white py-1 px-4 rounded w-full"
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
