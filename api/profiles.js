export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const profiles = response.results.map((page) => {
      const name = page.properties.Name?.title[0]?.plain_text || "No Name";

      // normalize the name to match image file
      const imageFileName = name.toLowerCase().replace(/\s+/g, "_") + ".jpg";
      const imageUrl = `https://her-drive.vercel.app/images/${imageFileName}`;

      return {
        name,
        occupation: page.properties.Occupation?.rich_text[0]?.plain_text || "",
        nationality: page.properties.Nationality?.rich_text[0]?.plain_text || "",
        bio: page.properties.Bio?.rich_text[0]?.plain_text || "",
        link: page.properties.Link?.url || "#",
        image: imageUrl, // automatically generated
        featured: page.properties.Featured?.checkbox || false,
      };
    });

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
}
