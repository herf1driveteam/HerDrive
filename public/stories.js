async function fetchStories() {
  const response = await fetch("/api/stories");
  const records = await response.json();
  return records;
}

async function displayStories() {
  const container = document.getElementById("stories-carousel");
  const records = await fetchStories();

  records.forEach((record) => {
    const fields = record.fields;
    const name = fields.Name || "Anonymous";
    const nationality = fields.Nationality || "";
    const story = fields.Story || "";
    const imageUrl = fields.Image ? fields.Image[0].url : "default-image.jpg";

    const card = document.createElement("div");
    card.classList.add("story-card");
    card.innerHTML = `
      <img src="${imageUrl}" alt="${name}" />
      <h3>${name}</h3>
      <p><strong>${nationality}</strong></p>
      <p>${story}</p>
    `;
    container.appendChild(card);
  });
}

displayStories();
