"use client";
import AddProductModal from "@/components/dashboard/AddProduct";
import ProductCard from "@/components/dashboard/ProductCard";
import {
  createFurniture,
  getAllFurniture,
} from "@/lib/actions/product.actions";
import { useState, useEffect } from "react";

interface Furniture {
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: string;
}

interface GetFurniture {
  _id: string;
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: string;
}

export default function Home() {
  const [products, setProducts] = useState<GetFurniture[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllFurniture();
      setProducts(products);
    };
    getProducts();
  }, []);

  const handleAddProduct = async (newProduct: Furniture) => {
    const createdProduct = await createFurniture(newProduct);
    setProducts((prevProducts) => [...prevProducts, createdProduct]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Furniture Products
      </h1>
      <div className="flex justify-end mb-4">
        <AddProductModal onSave={handleAddProduct} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
