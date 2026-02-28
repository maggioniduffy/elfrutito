import { Product } from "../models";
import ProductCard from "./ProductCard";

interface SectionProps {
  name: string;
  products?: Product[];
}

const Section = ({ name, products }: SectionProps) => {
  return (
    <section
      className="w-full"
      id={`#${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      <h3 className="text-2xl font-medium text-left w-full"> {name} </h3>
      <main className="flex items-center gap-8 flex-wrap justify-center">
        {products?.map((p: any) => (
          <ProductCard
            id={p.id}
            key={p.id}
            name={p.name}
            prices={p.prices}
            image={p.image}
            stock={p.stock}
            sale={p.sale}
          />
        ))}
      </main>
    </section>
  );
};

export default Section;
