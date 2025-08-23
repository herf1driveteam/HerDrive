async function fetchProfiles() {
  try {
    const res = await fetch("/api/profiles");
    const data = await res.json();
    renderProfiles(data);
  } catch (err) {
    console.error("Error fetching profiles:", err);
  }
}

function renderProfiles(data) {
  const container = document.getElementById("profiles");
  container.innerHTML = data.map(profile => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${profile.image}" class="card-img-top" alt="${profile.name}">
        <div class="card-body">
          <h5 class="card-title">${profile.name}</h5>
          <p class="card-text"><strong>${profile.occupation}</strong></p>
          <p class="card-text"><em>${profile.nationality}</em></p>
          <p class="card-text">${profile.bio}</p>
          <a href="${profile.link}" class="btn btn-primary" target="_blank">Learn More</a>
        </div>
      </div>
    </div>
  `).join("");
}

fetchProfiles();
