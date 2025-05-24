document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                "https://alumni-backend-wmj4.onrender.com/api/form",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (response.ok) {
                showModal(
                    "✅ Merci ! Votre formulaire a été soumis avec succès."
                );
                form.reset();
            } else {
                showModal(
                    "❌ Erreur : " +
                        (result.message || "Une erreur est survenue.")
                );
            }
        } catch (error) {
            console.error("Erreur de soumission :", error);
            showModal(
                "❌ Une erreur réseau est survenue. Veuillez réessayer plus tard."
            );
        }
    });
});

function showModal(message) {
    const modal = document.getElementById("notificationModal");
    const modalMessage = document.getElementById("modalMessage");
    const closeBtn = document.getElementById("closeModal");

    modalMessage.textContent = message;
    modal.classList.remove("hidden");

    closeBtn.onclick = () => {
        modal.classList.add("hidden");
    };

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 5000);
}
