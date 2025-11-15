// stories.js

async function fetchStories() {
  const response = await fetch("/api/stories");
  if (!response.ok) {
    console.error("Failed to fetch stories:", response.status);
    return [];
  }
  const records = await response.json();
  return records;
}

async function displayStories() {
  const container = document.getElementById("stories-carousel");
  if (!container) {
    console.error("No container with ID 'stories-carousel' found.");
    return;
  }

  const records = await fetchStories();

  if (!records || records.length === 0) {
    container.innerHTML = "<p>No stories available yet.</p>";
    return;
  }

  records.forEach((record) => {
    // Make sure record fields exist
    const name = record.Name || "Anonymous";
    const nationality = record.nationality || "—";
    const story = record.story || "";
    const imageUrl = record.image;

    const card = document.createElement("div");
    card.classList.add("story-card");
     const imageSection = imageUrl
      ? `<img src="${imageUrl}" alt="${name}" class="story-img" />`
      : `<div class="story-placeholder"></div>`;
      
    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${name}" />` : ""}
      <div class="story-content">
        <h3>${name}</h3>
        <p><strong>${nationality}</strong></p>
        <p>${story}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Run display function
displayStories();

const scrollContainer = document.getElementById("stories-carousel");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

scrollLeftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
});

scrollRightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
});

