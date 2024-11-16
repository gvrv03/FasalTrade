import ProductCard from "@/components/Product/ProductCard";
import { brokerCrops, CropsData } from "@/SampleData/ProductsData";
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
        <h2 className="text-2xl mt-5">Broker : {searchParams?.name}</h2>
        <div className="grid mt-5 grid-cols-2 gap-5 md:grid-cols-5">
          {brokerCrops?.map((item, index) => {
            return (
              <div key={index} className="border p-2 rounded-md">
                <img src={item?.img} />
                <p className="mt-5">{item.cropName}</p>
                <p>{item.qty}</p>
                <a
                  href={`https://wa.me/${searchParams?.phoneNo}`}
                  className="bg-green-600 w-full text-white text-center font-semibold text-xs  p-2 rounded-md"
                  target="_blank"
                >
                  Contact us on WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
