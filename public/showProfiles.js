async function loadProfiles() {
  try {
    const res = await fetch('/api/profiles');
    const profiles = await res.json();

    const container = document.getElementById('profiles-container');
    container.innerHTML = "";

    const featuredProfiles = profiles.filter(p => p.featured);

    featuredProfiles.forEach(profile => {
      const col = document.createElement('div');
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="profile-card">
          <h5 class="card-title">${profile.name}</h5>
          <p class="card-text"><strong>Occupation:</strong> ${profile.occupation || ''}</p>
          <p class="card-text"><strong>Nationality:</strong> ${profile.nationality || 'N/A'}</p>
          <p class="card-text">${profile.bio || ''}</p>
          ${profile.link && profile.link !== "#" 
            ? `<a href="${profile.link}" target="_blank" class="btn btn-primary mt-2">Learn More</a>` 
          : ""}
        </div>
      `;

        


      container.appendChild(col);
    });
  } catch (err) {
    console.error("Error loading profiles:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProfiles);
