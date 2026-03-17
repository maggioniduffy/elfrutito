import { notion } from "@/lib/notion";
import { Prices, Product } from "@/app/models";
import { ProductType } from "@/app/models";

function proxyImage(url: string | null): string | null {
  if (!url) return null;
  // Route through our proxy so Notion's expiring signed URLs are fetched server-side
  return `/api/image?url=${encodeURIComponent(url)}`;
}

async function getProducts(response: any): Promise<Product[]> {
  const products: Product[] = response.results.map((page: any) => {
    const props = page.properties;
    const sale = props.Oferta?.checkbox;

    const prices: Prices = Object.entries(props)
      .filter(([key, value]: any) => {
        if (key === "Precio kg compra") return false;
        return (
          value.type === "formula" && (key.includes("kg") || key.includes("gr"))
        );
      })
      .map(([key, value]: any) => [key, value.formula.number]);

    const rawImage =
      props.Image?.url ||
      props.Image?.files?.[0]?.file?.url ||
      props.Image?.files?.[0]?.external?.url ||
      null;

    return {
      id: page.id,
      name: props.Nombre.title[0]?.plain_text ?? "",
      stock: props.Stock?.number ?? 0,
      image: proxyImage(rawImage),
      prices,
      sale,
      description: props.Descripcion?.rich_text[0]?.plain_text ?? "",
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

export async function getGranola() {
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
          select: { equals: ProductType.Granola },
        },
      ],
    },
  });

  const products = await getProducts(response);
  return products;
}

export async function getMix() {
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
          select: { equals: ProductType.Mix },
        },
      ],
    },
  });

  const products = await getProducts(response);
  return products;
}
