import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DB,
    });

    const results = response.results.map((page) => ({
      name: page.properties.Name?.title[0]?.plain_text || "Unknown",
      nationality: page.properties.Nationality?.rich_text[0]?.plain_text || "",
      image: page.properties.Image?.url || "",
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
