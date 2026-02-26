import Image from "next/image";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
          {products.map((p: any) => (
            <div key={p.id} className="border rounded-xl p-4 shadow-sm">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              )}
              <h2 className="text-lg font-semibold mt-3">{p.name}</h2>
              <p>${p.price}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock} kg</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
