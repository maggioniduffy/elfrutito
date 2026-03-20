import { notion } from "@/lib/notion";
import { Prices, Product } from "@/app/models";
import { ProductType } from "@/app/models";

function getLocalImage(imageName: string | null): string {
  if (!imageName) return "/elFrutito.png";
  return `/frutos/${imageName.trim()}.jpeg`;
}

async function getProducts(
  response: any,
  type: ProductType,
  isCombo = false,
): Promise<Product[]> {
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

    const imageName =
      props.Image?.rich_text?.[0]?.plain_text ||
      props.Image?.title?.[0]?.plain_text ||
      null;

    return {
      id: page.id,
      name: props.Nombre.title[0]?.plain_text ?? "",
      stock: props.Stock?.number ?? 0,
      image: getLocalImage(imageName),
      prices,
      sale,
      description: props.Descripcion?.rich_text[0]?.plain_text ?? "",
      type,
      comboPrice: isCombo ? (props["Precio kg compra"]?.number ?? 0) : null,
    };
  });

  return products;
}

export async function getDriedFruits() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Visible", checkbox: { equals: true } },
        { property: "Tipo", select: { equals: ProductType.DriedFruit } },
      ],
    },
  });
  return getProducts(response, ProductType.DriedFruit);
}

export async function getFehydratedFruits() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Visible", checkbox: { equals: true } },
        { property: "Tipo", select: { equals: ProductType.DehydratedFruit } },
      ],
    },
  });
  return getProducts(response, ProductType.DehydratedFruit);
}

export async function getGranola() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Visible", checkbox: { equals: true } },
        { property: "Tipo", select: { equals: ProductType.Granola } },
      ],
    },
  });
  return getProducts(response, ProductType.Granola);
}

export async function getMix() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Visible", checkbox: { equals: true } },
        { property: "Tipo", select: { equals: ProductType.Mix } },
      ],
    },
  });
  return getProducts(response, ProductType.Mix);
}

export async function getCombo() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Visible", checkbox: { equals: true } },
        { property: "Tipo", select: { equals: ProductType.Combo } },
      ],
    },
  });
  return getProducts(response, ProductType.Combo, true);
}
