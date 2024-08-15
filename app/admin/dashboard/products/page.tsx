"use client";
import AddProductModal from "@/components/dashboard/AddProduct";
import ProductCard from "@/components/dashboard/ProductCard";
import {
  createFurniture,
  getAllFurniture,
} from "@/lib/actions/product.actions";
import { CreateFurnitureParams, IFurniture, IFurnitureFrontend } from "@/types";
import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState<IFurniture[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllFurniture();
      setProducts(products);
    };
    getProducts();
  }, []);

  const handleAddProduct = async (newProduct: IFurnitureFrontend) => {
    const fullProduct: CreateFurnitureParams = {
      ...newProduct,
    };
    const createdProduct = await createFurniture(fullProduct);
    setProducts((prevProducts) => [...prevProducts, createdProduct]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  const handleUpdateProduct = (updatedProduct: IFurniture) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex-center w-full">
        <h2 className="text-2xl font-semibold mb-4">Furniture Product</h2>
      </div>
      <div className="flex justify-end mb-4">
        <AddProductModal onSave={handleAddProduct} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </div>
    </div>
  );
}
