document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = window.env.API_URL + "/all";
    const loading = document.getElementById("loading");
    const responsesContainer = document.createElement("div");
    responsesContainer.id = "responsesContainer";
    document.getElementById("admin").appendChild(responsesContainer);

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();

        if (data.length === 0) {
            loading.textContent = "Aucune réponse enregistrée.";
            return;
        }

        data.forEach((entry) => {
            const card = document.createElement("div");
            card.classList.add("response-card");

            card.innerHTML = `
          <h2>🎓 Informations générales</h2>
          <p><strong>Nom :</strong> ${entry.name}</p>
          <p><strong>Email :</strong> ${entry.email}</p>
          <p><strong>Programme :</strong> ${entry.program}</p>
          <p><strong>Domaine :</strong> ${entry.field}</p>
          <p><strong>Année :</strong> ${entry.promotion_year}</p>
          <p><strong>Pays :</strong> ${entry.residence_country}</p>
          <p><strong>Emploi actuel :</strong> ${entry.current_job}</p>
          <p><strong>Entreprise :</strong> ${entry.current_company}</p>
  
          <h2>🧠 Évaluation de la formation</h2>
          <p><strong>Qualité de l’enseignement :</strong> ${entry.teaching_quality}</p>
          <p><strong>Utilité des compétences :</strong> ${entry.skills_usefulness}</p>
          <p><strong>Recommander l'établissement :</strong> ${entry.recommend}</p>
          <p><strong>Témoignage :</strong> ${entry.testimonial}</p>
  
          <h2>🎓 Contribution en enseignement</h2>
          <p><strong>Prêt à enseigner :</strong> ${entry.willing_to_teach}</p>
          <p><strong>Domaines enseignables :</strong> ${entry.teaching_fields}</p>
  
          <h2>🤝 Partenariats</h2>
          <p><strong>Suggestions de partenariat :</strong> ${entry.partnership_suggestions}</p>
          <p><strong>Prêt à soutenir :</strong> ${entry.willing_to_support_partnership}</p>
  
          <h2>🌍 International & Certification</h2>
          <p><strong>À l'étranger :</strong> ${entry.abroad}</p>
          <p><strong>Problèmes avec le certificat :</strong> ${entry.certification_issue}</p>
          <p><strong>Suggestions pour le certificat :</strong> ${entry.certification_suggestion}</p>
  
          <h2>🏆 Distinctions</h2>
          <p><strong>Prix admin :</strong> ${entry.award_admin}</p>
          <p><strong>Détails :</strong> ${entry.admin_award_details}</p>
          <p><strong>Type :</strong> ${entry.admin_award_type}</p>
          <p><strong>Prix alumni :</strong> ${entry.award_alumni}</p>
          <p><strong>Détails :</strong> ${entry.alumni_award_details}</p>
          <p><strong>Type :</strong> ${entry.alumni_award_type}</p>
  
          <h2>💪 Forces et améliorations</h2>
          <p><strong>Forces :</strong> ${entry.strengths}</p>
          <p><strong>Améliorations :</strong> ${entry.improvements}</p>
        `;

            responsesContainer.appendChild(card);
        });

        loading.remove();
    } catch (err) {
        loading.textContent = "Impossible de charger les données.";
        console.error(err);
    }
});
