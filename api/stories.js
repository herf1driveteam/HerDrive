export default async function handler(req, res) {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const BASE_ID = "app4ldM6n7omvH6bE";
  const TABLE_NAME = "BackgroundStories";

  try {
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API returned ${response.status}`);
    }

    const data = await response.json();

    // Map and filter records
    const stories = data.records
      .map(record => {
        const fields = record.fields;

        // Skip if no image field or empty
        if (!fields.Image || fields.Image.length === 0) return null;

        return {
          id: record.id,
          name: fields.Name || "Unknown",
          nationality: fields.Nationality || "—",
          story: fields.Story || "",
          image: fields.Image[0].url, // ✅ Actual image URL from Airtable
        };
      })
      .filter(story => story !== null); // Remove any skipped nulls

    res.status(200).json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Airtable data" });
  }
}
