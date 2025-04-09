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
            let list = "<ul>";
            data.forEach(item => {
                const restaurant = item.restaurant;
                const score = item.score;

                // culoare în funcție de scor
                let color = score === 2 ? "green" : (score === 1 ? "orange" : "gray");

                // Logică pentru imagine:
                let imageUrl = "";

                if (Array.isArray(restaurant.images)) {
                    const locationIndex = Array.isArray(restaurant.location)
                        ? restaurant.location.findIndex(loc => loc.toLowerCase() === formData.location.toLowerCase())
                        : -1;

                    if (locationIndex !== -1) {
                        imageUrl = `/static/images/${restaurant.images[locationIndex]}`;
                    } else {
                        imageUrl = `/static/images/${restaurant.images[0]}`; // fallback
                    }
                } else if (restaurant.images) {
                    imageUrl = `/static/images/${restaurant.images}`;
                }
            

                // Adăugăm link pe numele restaurantului și pe imagine
                let restaurantLink = restaurant.url || "#";

                list += `<li style="color:${color};">
                    <a href="${restaurantLink}" target="_blank" style="text-decoration: none; color: inherit;">
                        <strong>${restaurant.name}</strong>
                    </a> - ${restaurant.type} (${restaurant.budget}, ${restaurant.location})<br>
                    <small>Potrivire: ${score} ${score === 1 ? "criteriu" : "criterii"}</small><br>
                    ${imageUrl ? `<a href="${restaurantLink}" target="_blank">
                                    <img src="${imageUrl}" alt="${restaurant.name}" style="width:200px; border-radius:8px; margin-top:10px;">
                                  </a>` : ""}
                </li>`;
            });
            list += "</ul>";
            resultsDiv.innerHTML += list;
        }
    })
    .catch(error => console.error("Eroare:", error));
});
