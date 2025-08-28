async function loadProfiles() {
  try {
    console.log("Fetching profiles...");
    const res = await fetch('/api/profiles');
    console.log("Response status:", res.status);

    const profiles = await res.json();
    console.log("Profiles data:", profiles);

    const container = document.getElementById('profiles-container');
    container.innerHTML = ""; 

    profiles.forEach(profile => {
      const col = document.createElement('div');
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow rounded-3">
          <img src="${profile.image || 'https://via.placeholder.com/300'}" 
               class="card-img-top" 
               alt="${profile.name}">
          <div class="card-body">
            <h5 class="card-title">${profile.name}</h5>
            <p class="card-text"><strong>Nationality:</strong> ${profile.nationality || 'N/A'}</p>
            <p class="card-text">${profile.bio || ''}</p>
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
