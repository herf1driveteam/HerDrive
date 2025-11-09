async function fetchStories() {
  const response = await fetch("/api/stories");
  const stories = await response.json();
  return stories;
}

async function displayStories() {
  const container = document.getElementById("stories-carousel");
  const stories = await fetchStories();

  container.innerHTML = ""; // Clear existing cards if reloaded

  stories.forEach((story) => {
    const name = story.name || "Anonymous";
    const nationality = story.nationality || "";
    const storyText = story.story || "";
    const imageUrl = story.image ? story.image : "default-image.jpg";

    const card = document.createElement("div");
    card.classList.add("story-card");

    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${name}" />` : ""}
      <h3>${name}</h3>
      <p><strong>${nationality}</strong></p>
      <p>${storyText}</p>
    `;

    container.appendChild(card);
  });
}

displayStories();
