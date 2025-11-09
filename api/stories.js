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

    const stories = data.records.map(record => ({
      id: record.id,
      Name: record.fields.Name || "Unknown",
      nationality: record.fields.Nationality || "—",
      story: record.fields.Story || "",
      image: record.fields.Image && record.fields.Image.length > 0 
              ? record.fields.Image[0].url 
              : null
    }));

    res.status(200).json(stories);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Airtable data" });
  }
}
