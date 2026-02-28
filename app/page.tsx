import "./globals.css";
import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import { getProducts } from "../lib/products";

export default async function Home() {
  const products = await getProducts();
  console.log(products);
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen items-center justify-center font-sans">
        <main className="p-8 flex items-center gap-8">
          {products.map((p: any) => (
            <ProductCard
              key={p.id}
              name={p.name}
              price={p.price}
              imageUrl={p.imageUrl}
              stock={p.stock}
            />
          ))}
        </main>
      </div>
    </>
  );
}
