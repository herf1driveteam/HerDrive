async function fetchStories() {
  const response = await fetch("/api/stories");
  const stories = await response.json();
  return stories;
}

async function displayStories() {
  const container = document.getElementById("stories-carousel");
  const stories = await fetchStories();

  container.innerHTML = ""; // Clear existing cards if reloaded

  records.forEach((record) => {
    if (!record.fields) return; // skip if no fields

    const { Name, Nationality, Story, Image } = record.fields;
    const name = Name || "Anonymous";
    const nationality = Nationality || "";
    const story = Story || "";
    const imageUrl = Image && Image.length > 0 ? Image[0].url : "default-image.jpg";


    const card = document.createElement("div");
    card.classList.add("story-card");

    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${name}" />` : ""}
      <h3>${name}</h3>
      <p><strong>${nationality}</strong></p>
      <p>${story}</p>
    `;


    container.appendChild(card);
  });
}

displayStories();

const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");
const carousel = document.getElementById("stories-carousel");

scrollLeft.addEventListener("click", () => {
  carousel.scrollBy({ left: -300, behavior: "smooth" });
});
scrollRight.addEventListener("click", () => {
  carousel.scrollBy({ left: 300, behavior: "smooth" });
});
