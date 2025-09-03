import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const profiles = response.results.map((page) => ({
      name: page.properties.Name?.title[0]?.plain_text || "No Name",
      occupation: page.properties.Occupation?.rich_text[0]?.plain_text || "",
      nationality: page.properties.Nationality?.rich_text[0]?.plain_text || "",
      bio: page.properties.Bio?.rich_text[0]?.plain_text || "",
      link: page.properties.Link?.url || "#",
      image: page.properties.Image?.url || "https://via.placeholder.com/300",
      featured: page.properties.Featured?.checkbox || false, // ✅ add checkbox
    }));

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
}
