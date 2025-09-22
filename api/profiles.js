import { imageMap } from "/public/images.js";
export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });

    const profiles = response.results.map((page) => {
      const name = page.properties.Name?.title?.[0]?.plain_text || "No Name";

      return {
        name,
        occupation: page.properties.Occupation?.rich_text?.[0]?.plain_text || "",
        nationality: page.properties.Nationality?.rich_text?.[0]?.plain_text || "",
        bio: page.properties.Bio?.rich_text?.[0]?.plain_text || "",
        link: page.properties.Link?.url || "#",
        image: imageMap[name] || "https://via.placeholder.com/300",
        featured: page.properties.Featured?.checkbox || false,
      };
    });

    res.status(200).json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
}
