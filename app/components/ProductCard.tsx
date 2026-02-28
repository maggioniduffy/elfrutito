import { Product } from "../models";
import Image from "next/image";
const ProductCard = ({ name, prices, image, stock, sale }: Product) => {
  return (
    <div className="w-56 min-h-56 relative rounded-xl shadow-xl hover:drop-shadow-lg transition-shadow hover:bg-foreground hover:scale-105">
      {sale && (
        <div className="absolute font-semibold shadow shadow-red-500 top-2 right-0 bg-red-500 text-white px-2 py-1 rounded">
          Oferta!
        </div>
      )}
      <Image
        src={image ? image : "/elFrutito.png"}
        alt={name}
        width={50}
        height={50}
        className="w-full h-48 object-cover rounded-t-xl bg-card"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="my-2 flex flex-wrap gap-2 bg-cream p-2 rounded">
          {prices.map(([weight, price]: any) => (
            <p key={weight} className="text-sm bg-ring px-2 py-1 rounded">
              {weight}: <b className="text-cream font-semibold">${price}</b>
            </p>
          ))}
        </div>
        <p className="text-sm ">
          En stock <b className="text-card font-semibold">{stock} kg</b>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
