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
    res.status(200).json(data.records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Airtable data" });
  }
}
