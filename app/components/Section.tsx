import { Product } from "../models";
import ProductCard from "./ProductCard";

interface SectionProps {
  name: string;
  products?: Product[];
  href: string;
}

const Section = ({ name, products, href }: SectionProps) => {
  return (
    <section className="w-full py-6 px-4 " id={href}>
      <h3 className="text-2xl text-card mb-4">{name}</h3>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 " />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 " />
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory m-4">
          {products?.map((p: any) => (
            <div key={p.id} className="flex-shrink-0 snap-start my-5">
              <ProductCard
                id={p.id}
                name={p.name}
                prices={p.prices}
                image={p.image}
                stock={p.stock}
                sale={p.sale}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
