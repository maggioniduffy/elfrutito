import { notion } from "@/lib/notion";
import { Prices, Product } from "@/app/models";
import { ProductType } from "@/app/models";

async function getProducts(response: any): Promise<Product[]> {
  const products: Product[] = response.results.map((page: any) => {
    const props = page.properties;
    const sale = props.Oferta?.checkbox;
    // Extract weight-price pairs
    const prices: Prices = Object.entries(props)
      .filter(([key, value]: any) => {
        if (key === "Precio kg compra") return false;

        return (
          value.type === "formula" && (key.includes("kg") || key.includes("gr"))
        );
      })
      .map(([key, value]: any) => [key, value.formula.number]);

    return {
      id: page.id,
      name: props.Nombre.title[0]?.plain_text ?? "",
      stock: props.Stock?.number ?? 0,
      image:
        props.Image?.url || // if URL type
        props.Image?.files?.[0]?.file?.url || // if Files type
        props.Image?.files?.[0]?.external?.url || // external file
        null,
      prices,
      sale,
    };
  });

  return products;
}

export async function getDriedFruits() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Visible",
          checkbox: { equals: true },
        },
        {
          property: "Tipo",
          select: { equals: ProductType.DriedFruit },
        },
      ],
    },
  });

  const products = await getProducts(response);
  return products;
}

export async function getFehydratedFruits() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Visible",
          checkbox: { equals: true },
        },
        {
          property: "Tipo",
          select: { equals: ProductType.DehydratedFruit },
        },
      ],
    },
  });

  const products = await getProducts(response);
  return products;
}
