document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://alumni-backend-wmj4.onrender.com/api/form";
    const loading = document.getElementById("loading");
    const admin = document.getElementById("admin");
    const mobileContainer = document.getElementById("mobileResponses");

    const createMobileCard = (name, date) => {
        const div = document.createElement("div");
        div.classList.add("mobile-card");

        const h2 = document.createElement("h2");
        h2.textContent = name;
        div.appendChild(h2);

        const dateP = document.createElement("p");
        dateP.classList.add("submission-date");
        dateP.textContent = `🕒 Soumis le : ${new Date(
            date
        ).toLocaleDateString()}`;
        div.appendChild(dateP);

        return div;
    };
    

    const createUserCard = (title, date, infoObject) => {
        const section = document.createElement("section");
        section.classList.add("user-card");

        // Ligne de date
        const dateP = document.createElement("p");
        dateP.classList.add("submission-date");
        dateP.textContent = `🕒 Soumis le : ${new Date(date).toLocaleString()}`;
        section.appendChild(dateP);

        // Titre
        const h2 = document.createElement("h2");
        h2.textContent = title;
        section.appendChild(h2);

        // Tableau
        const table = document.createElement("table");
        table.classList.add("response-table");

        const tbody = document.createElement("tbody");

        Object.entries(infoObject).forEach(([key, value]) => {
            const tr = document.createElement("tr");

            const th = document.createElement("th");
            th.textContent = key;

            const td = document.createElement("td");
            td.textContent = value || "—";

            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        section.appendChild(table);
        return section;
    };

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erreur réseau");

        const data = await response.json();
        console.log(data[0]);

        if (data.length === 0) {
            loading.textContent = "Aucune réponse enregistrée.";
            return;
        }

   data.forEach((entry) => {
       const responses = {
           Email: entry.email,
           Programme: entry.program,
           Domaine: entry.field,
           "Année de promotion": entry.promotion_year,
           "Pays de résidence": entry.residence_country,
           "Emploi actuel": entry.current_job,
           "Entreprise actuelle": entry.current_company,
           "Qualité de l’enseignement": entry.teaching_quality,
           "Utilité des compétences": entry.skills_usefulness,
           "Recommander la formation": entry.recommend,
           Témoignage: entry.testimonial,
           "Prêt à enseigner": entry.willing_to_teach,
           "Domaines enseignables": entry.teaching_fields,
           "Suggestions de partenariat": entry.partnership_suggestions,
           "Soutien aux partenariats": entry.willing_to_support_partnership,
           "Études à l’étranger": entry.abroad,
           "Problèmes de certificat": entry.certification_issue,
           "Suggestions de certification": entry.certification_suggestion,
           "Prix admin": entry.award_admin,
           "Détails prix admin": entry.admin_award_details,
           "Type de prix admin": entry.admin_award_type,
           "Prix alumni": entry.award_alumni,
           "Détails prix alumni": entry.alumni_award_details,
           "Type de prix alumni": entry.alumni_award_type,
           "Forces de la formation": entry.strengths,
           "Axes d’amélioration": entry.improvements,
       };

       const date = entry.createdAt || Date.now();
       const fullName = `👤 ${entry.name}`;

       // 💻 Desktop version
       admin.appendChild(createUserCard(fullName, date, responses));

       // 📱 Mobile version
       mobileContainer.appendChild(createMobileCard(fullName, date));
   });


        loading.remove();
    } catch (err) {
        loading.textContent = "Impossible de charger les données.";
        console.error(err);
    }
});
