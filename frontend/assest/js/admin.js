document.addEventListener("DOMContentLoaded", async () => {
    const API_URL = "https://alumni-backend-wmj4.onrender.com/api/form";
    const loading = document.getElementById("loading");
    const admin = document.getElementById("admin");

    const createSectionTable = (title, headers, rows) => {
        const section = document.createElement("section");
        section.classList.add("response-section");

        const h2 = document.createElement("h2");
        h2.textContent = title;
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

        // Informations générales
        const infoHeaders = [
            "Nom",
            "Email",
            "Programme",
            "Domaine",
            "Année",
            "Pays",
            "Emploi",
            "Entreprise",
        ];
        const infoRows = data.map((entry) => [
            entry.name,
            entry.email,
            entry.program,
            entry.field,
            entry.promotion_year,
            entry.residence_country,
            entry.current_job,
            entry.current_company,
        ]);
        admin.appendChild(
            createSectionTable(
                "🎓 Informations générales",
                infoHeaders,
                infoRows
            )
        );

        // Évaluation
        const evalHeaders = [
            "Enseignement",
            "Utilité",
            "Recommander",
            "Témoignage",
        ];
        const evalRows = data.map((entry) => [
            entry.teaching_quality,
            entry.skills_usefulness,
            entry.recommend,
            entry.testimonial,
        ]);
        admin.appendChild(
            createSectionTable(
                "🧠 Évaluation de la formation",
                evalHeaders,
                evalRows
            )
        );

        // Enseignement
        const teachHeaders = ["Prêt à enseigner", "Domaines enseignables"];
        const teachRows = data.map((entry) => [
            entry.willing_to_teach,
            entry.teaching_fields,
        ]);
        admin.appendChild(
            createSectionTable(
                "🎓 Contribution en enseignement",
                teachHeaders,
                teachRows
            )
        );

        // Partenariats
        const partnerHeaders = ["Suggestions", "Prêt à soutenir"];
        const partnerRows = data.map((entry) => [
            entry.partnership_suggestions,
            entry.willing_to_support_partnership,
        ]);
        admin.appendChild(
            createSectionTable("🤝 Partenariats", partnerHeaders, partnerRows)
        );

        // International
        const intlHeaders = [
            "À l'étranger",
            "Problèmes de certificat",
            "Suggestions certificat",
        ];
        const intlRows = data.map((entry) => [
            entry.abroad,
            entry.certification_issue,
            entry.certification_suggestion,
        ]);
        admin.appendChild(
            createSectionTable(
                "🌍 International & Certification",
                intlHeaders,
                intlRows
            )
        );

        // Distinctions
        const awardHeaders = [
            "Prix admin",
            "Détails admin",
            "Type admin",
            "Prix alumni",
            "Détails alumni",
            "Type alumni",
        ];
        const awardRows = data.map((entry) => [
            entry.award_admin,
            entry.admin_award_details,
            entry.admin_award_type,
            entry.award_alumni,
            entry.alumni_award_details,
            entry.alumni_award_type,
        ]);
        admin.appendChild(
            createSectionTable("🏆 Distinctions", awardHeaders, awardRows)
        );

        // Forces et améliorations
        const improveHeaders = ["Forces", "Améliorations"];
        const improveRows = data.map((entry) => [
            entry.strengths,
            entry.improvements,
        ]);
        admin.appendChild(
            createSectionTable(
                "💪 Forces et améliorations",
                improveHeaders,
                improveRows
            )
        );

        loading.remove();
    } catch (err) {
        loading.textContent = "Impossible de charger les données.";
        console.error(err);
    }
});
