document.getElementById("alumniForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche le rechargement

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(window.env.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Erreur réseau");
        }

        const result = await response.json();
        alert("Formulaire envoyé avec succès !");
        e.target.reset();
    } catch (err) {
        console.error("Erreur lors de l’envoi du formulaire :", err);
        alert("Erreur lors de l’envoi du formulaire.");
    }
});
