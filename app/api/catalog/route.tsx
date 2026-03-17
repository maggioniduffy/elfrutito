import { ImageResponse } from "next/og";
import { Client } from "@notionhq/client";

export const runtime = "edge";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  const products = res.results.map((page: any) => ({
    name: page.properties.Nombre.title[0]?.plain_text,
    price1kg: page.properties["1kg"].number,
    price500: page.properties["500gr"].number,
  }));

  return new ImageResponse(
    <div
      style={{
        background: "#fafafa",
        width: "100%",
        height: "100%",
        padding: 60,
        fontSize: 40,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 60, marginBottom: 80 }}>El Frutito 🌰</div>

      {products.map((p) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "12px 0",
          }}
        >
          <span>{p.name}</span>
          <span>{p.price1kg}</span>
          <span>{p.price500}</span>
        </div>
      ))}
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
