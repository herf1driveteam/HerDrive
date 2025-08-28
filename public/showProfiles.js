async function loadProfiles() {
  try {
    const res = await fetch('/api/profiles');
    const profiles = await res.json();

    const container = document.getElementById('profiles-container');
    container.innerHTML = "";

    const filtered = profiles.filter(p => p.featured === true);

    filtered.forEach(profile => {
      const col = document.createElement('div');
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow rounded-3 profile-card">
          <div class="image-wrapper">
            <img src="${profile.image || 'https://via.placeholder.com/300'}" 
                 alt="${profile.name}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${profile.name}</h5>
            <p class="card-text"><strong>Nationality:</strong> ${profile.nationality || 'N/A'}</p>
            <p class="card-text">${profile.bio || ''}</p>
            ${
              profile.link 
                ? `<a href="${profile.link}" target="_blank" class="btn btn-primary">Learn More</a>` 
                : ''
            }
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  } catch (err) {
    console.error("Error loading profiles:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProfiles);
