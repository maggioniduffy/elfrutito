import "./globals.css";
import Header from "./components/Header";
import { sections } from "./utils";
import Section from "./components/Section";
import Contact from "./components/Contact";
export default async function Home() {
  return (
    <div className="">
      <Header />
      <div className="mt-5 md:p-8 pb-20 flex flex-col justify-between items-center font-sans min-h-96 w-full md:w-10/12 mx-auto">
        <h3 className="text-2xl font-medium text-left w-full mb-8 p-4">
          {" "}
          Catalogo{" "}
        </h3>
        <div className="flex flex-col gap-5 max-w-full">
          {sections.map(async (s) => {
            const prods = await s.function();
            return (
              <Section
                key={s.name}
                name={s.name}
                products={prods}
                href={s.ref}
              />
            );
          })}
        </div>

        <Contact />
      </div>
    </div>
  );
}
