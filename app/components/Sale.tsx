import React from "react";

const Sale = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="w-full max-w-md bg-red-800/70 text-red-100 rounded-2xl p-5 shadow-lg border border-red-700 backdrop-blur">
        <p className="text-sm uppercase tracking-wide text-white mb-1">
          Promoción
        </p>

        <h2 className="text-xl font-semibold">
          <b>10% OFF</b> a partir de los <span className="font-bold">2KG</span>
        </h2>

        <p className="text-sm text-red-200 mt-2">
          Aprovechá el descuento comprando en cantidad.
        </p>
      </div>
    </div>
  );
};

export default Sale;
