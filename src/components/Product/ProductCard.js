import React from "react";

const ProductCard = ({ name, qty, date, phoneNo ,Image}) => {
  return (
    <div className="p-2 border rounded-md  flex gap-2 flex-col ">
      <img
        src={Image}
        className=""
      />
      <h1>{name}</h1>
      <p>{qty}</p>
      <p className="text-xs text-gray-500">{date}</p>
      <a
        href={`https://wa.me/${phoneNo}`}
        className="bg-green-600 text-white text-center font-semibold text-xs p-2 rounded-md"
        target="_blank"
      >
        Contact us on WhatsApp
      </a>
    </div>
  );
};

export default ProductCard;
