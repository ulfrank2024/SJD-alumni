document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://alumni-backend-wmj4.onrender.com/api/form";
    const loading = document.getElementById("loading");
    const admin = document.getElementById("admin");

    const createUnifiedTable = (headers, rows) => {
        const section = document.createElement("section");
        section.classList.add("response-section");

        const h2 = document.createElement("h2");
        h2.textContent = "📋 Résumé des réponses des alumni";
        section.appendChild(h2);

        const table = document.createElement("table");
        table.classList.add("response-table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        rows.forEach((row) => {
            const tr = document.createElement("tr");
            row.forEach((cell) => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
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

        if (data.length === 0) {
            loading.textContent = "Aucune réponse enregistrée.";
            return;
        }

        // En-têtes unifiés
        const headers = [
            "Nom",
            "Email",
            "Programme",
            "Domaine",
            "Année",
            "Pays",
            "Emploi",
            "Entreprise",
            "Enseignement",
            "Utilité",
            "Recommander",
            "Témoignage",
            "Prêt à enseigner",
            "Domaines enseignables",
            "Suggestions partenariat",
            "Soutien partenariat",
            "À l'étranger",
            "Problèmes certificat",
            "Suggestions certificat",
            "Prix admin",
            "Détails admin",
            "Type admin",
            "Prix alumni",
            "Détails alumni",
            "Type alumni",
            "Forces",
            "Améliorations",
        ];

        // Lignes unifiées
        const rows = data.map((entry) => [
            entry.name,
            entry.email,
            entry.program,
            entry.field,
            entry.promotion_year,
            entry.residence_country,
            entry.current_job,
            entry.current_company,
            entry.teaching_quality,
            entry.skills_usefulness,
            entry.recommend,
            entry.testimonial,
            entry.willing_to_teach,
            entry.teaching_fields,
            entry.partnership_suggestions,
            entry.willing_to_support_partnership,
            entry.abroad,
            entry.certification_issue,
            entry.certification_suggestion,
            entry.award_admin,
            entry.admin_award_details,
            entry.admin_award_type,
            entry.award_alumni,
            entry.alumni_award_details,
            entry.alumni_award_type,
            entry.strengths,
            entry.improvements,
        ]);

        // Création d'un tableau unique
        admin.appendChild(createUnifiedTable(headers, rows));
        loading.remove();
    } catch (err) {
        loading.textContent = "Impossible de charger les données.";
        console.error(err);
    }
});
