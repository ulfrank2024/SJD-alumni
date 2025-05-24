document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = window.env.API_URL + "/all";
    const loading = document.getElementById("loading");
    const table = document.getElementById("responsesTable");
    const tbody = document.getElementById("responsesBody");

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();

        if (data.length === 0) {
            loading.textContent = "Aucune réponse enregistrée.";
            return;
        }

        data.forEach((entry) => {
            const row = document.createElement("tr");
            Object.values(entry).forEach((value) => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });

        loading.classList.add("hidden");
        table.classList.remove("hidden");
    } catch (err) {
        loading.textContent = "Impossible de charger les données.";
        console.error(err);
    }
});
