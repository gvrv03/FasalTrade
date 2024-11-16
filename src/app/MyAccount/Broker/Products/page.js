import ProductCard from "@/components/Product/ProductCard";
import { CropsData } from "@/SampleData/ProductsData";
import React from "react";

const Products = ({ searchParams }) => {
  return (
    <div>
      <div>
        <div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/003/417/794/small/farming-landing-page-web-banner-background-vector.jpg"
            className="w-full h-60"
          />
        </div>
        <div className="bg-green-600 p-5 mt-5 rounded-md">
          <p className="text-white text-center font-semibold">Our Products</p>
        </div>
        <h2 className="text-2xl mt-5" >Farmer : {searchParams?.name}</h2>
        <div className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-5">
          {CropsData?.map((item, index) => {
            return (
              <ProductCard
                key={index}
                name={item.CropName}
                Image={item.Image}
                qty={item.Qty}
                date={item.HarvestDate}
                phoneNo={searchParams?.phoneNo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
