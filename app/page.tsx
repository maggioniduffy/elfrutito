import "./globals.css";
import Header from "./components/Header";
import { sections } from "./utils";
import Section from "./components/Section";
export default async function Home() {
  return (
    <div className="bg-cream">
      <Header />
      <div className="p-8 flex flex-col justify-between space-y-12 items-start font-sans max-h-screen min-h-96">
        <h3 className="text-2xl font-medium text-left w-full"> Catalogo </h3>
        {sections.map(async (s) => {
          const prods = await s.function();
          return <Section key={s.name} name={s.name} products={prods} />;
        })}
      </div>
    </div>
  );
}
