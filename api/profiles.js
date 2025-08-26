import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID
    });

    const profiles = response.results.map(page => ({
      name: page.properties.Name?.title[0]?.plain_text || "",
      occupation: page.properties.Occupation?.rich_text[0]?.plain_text || "",
      nationality: page.properties.Nationality?.rich_text[0]?.plain_text || "",
      bio: page.properties.Bio?.rich_text[0]?.plain_text || "",
      link: page.properties.Link?.url || "#",
      image: page.properties.Image?.url || "https://via.placeholder.com/150"
    }));

    res.status(200).json(profiles);

  } catch (error) {
    console.error("Notion fetch error:", error);
    res.status(500).json({ error: "Failed to load profiles" });
  }
}
