document.getElementById("restaurantForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne reîncărcarea paginii

    let formData = {
        type: document.getElementById("type").value,
        budget: document.getElementById("budget").value,
        location: document.getElementById("location").value
    };

    fetch("/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        let resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "<h2>Recomandări:</h2>";

        if (data.length === 0) {
            resultsDiv.innerHTML += "<p>Niciun restaurant nu a fost găsit.</p>";
        } else {
            let cards = "";

            data.forEach(item => {
                const restaurant = item.restaurant;
                const score = item.score;

                // Pregătim lista de imagini din string
                let imagesList = [];
                if (restaurant.images && restaurant.images.includes(",")) {
                    imagesList = restaurant.images.split(",").map(img => img.trim());
                } else if (restaurant.images) {
                    imagesList = [restaurant.images];
                }

                // Aflăm imaginea potrivită pentru locație
                let imageUrl = "";
                if (imagesList.length > 0) {
                    let locationList = [];
                    if (restaurant.location && restaurant.location.includes(",")) {
                        locationList = restaurant.location.split(",").map(loc => loc.trim().toLowerCase());
                    } else {
                        locationList = [restaurant.location.toLowerCase()];
                    }

                    const index = locationList.findIndex(loc => loc === formData.location.toLowerCase());
                    imageUrl = index !== -1 && index < imagesList.length
                        ? `/static/images/${imagesList[index]}`
                        : `/static/images/${imagesList[0]}`;
                }

                const restaurantLink = restaurant.url || "#";

                cards += `
                <div class="card">
                    <a href="${restaurantLink}" target="_blank">
                        <img src="${imageUrl}" alt="${restaurant.name}">
                    </a>
                    <h3><a href="${restaurantLink}" target="_blank">${restaurant.name}</a></h3>
                    <p>${restaurant.type} • ${restaurant.budget} • ${restaurant.location}</p>
                    <small>Potrivire: ${score} ${score === 1 ? "criteriu" : "criterii"}</small>
                </div>`;
            });

            resultsDiv.innerHTML += cards;
        }
    })
    .catch(error => console.error("Eroare:", error));
});
