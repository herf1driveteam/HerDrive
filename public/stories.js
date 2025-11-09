const AIRTABLE_API_KEY = 'patV7gQjzIGaoQTHz.d51add6c7da61e48de0facabd17f59a6cd63421b66eabf27b80bdf8c2ae4c5cd';
const BASE_ID = 'app4ldM6n7omvH6bE';
const TABLE_NAME = 'BackgroundStories';

async function fetchStories() {
  const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
  });
  const data = await response.json();
  return data.records;
}
async function displayStories() {
  const records = await fetchStories();
  const container = document.getElementById('stories-carousel');

  records.forEach((record) => {
    const { name, nationality, story, image } = record.fields;
    const imageUrl = image ? image[0].url : 'default-image.jpg';

    const card = document.createElement('div');
    card.classList.add('story-card');
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" />
      <h3>${name || 'Anonymous'}</h3>
      <p><strong>${nationality || ''}</strong></p>
      <p>${story}</p>
    `;
    container.appendChild(card);
  });
}

displayStories();
