import { notion } from "@/lib/notion";

export async function getProducts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Visible",
      checkbox: { equals: true },
    },
  });

  return response.results.map((page: any) => {
    const imageFile = page.properties.Image?.files?.[0];

    return {
      id: page.id,
      name: page.properties.Nombre?.title?.[0]?.plain_text ?? "",
      price: page.properties["Precio kg venta"]?.number ?? 0,
      stock: page.properties.Stock?.number ?? 0,
      image:
        imageFile?.type === "file"
          ? imageFile.file.url
          : (imageFile?.external?.url ?? null),
    };
  });
}
