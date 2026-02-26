import { notion } from "@/lib/notion";

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Visible",
        checkbox: { equals: true },
      },
    });

    const products = response.results.map((page: any) => {
      const imageFile = page.properties.Imagen?.files?.[0];

      return {
        id: page.id,
        name: page.properties.Nombre?.title?.[0]?.plain_text ?? "",
        price: page.properties.Precio_kg_venta?.number ?? 0,
        stock: page.properties.Stock?.number ?? 0,
        image:
          imageFile?.type === "file"
            ? imageFile.file.url
            : (imageFile?.external?.url ?? null),
      };
    });

    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
