interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  stock?: number;
}

const ProductCard = ({ name, price, imageUrl, stock }: ProductCardProps) => {
  return (
    <div className="min-w-56 min-h-56 rounded-xl drop-shadow bg-muted-foreground border-b-3 border-card">
      <img
        src={imageUrl ? imageUrl : "/favicon.ico"}
        alt={name}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-primary font-bold">${price}</p>
        <p className="text-sm ">
          En stock <b className="text-card font-semibold">{stock} kg</b>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
