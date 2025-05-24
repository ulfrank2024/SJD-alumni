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
                "Nom complet": entry.name,
                "Adresse e-mail": entry.email,
                "Programme d'études suivi": entry.program,
                "Filière (ex : Informatique, Droit...)": entry.field,
                "Quelle année avez-vous obtenu votre diplôme à SJD? (ex : 2022)":
                    entry.promotionYear,
                "Pays de résidence actuel": entry.residenceCountry,
                "Profession actuelle": entry.currentJob,
                "Entreprise actuelle": entry.currentCompany,

                // 1. Témoignage personnel
                "1.1 Est-ce que vous êtes toujours en communication avec SJD ?":
                    entry.communication,
                "1.2 Qu’est-ce que vous pensez de la communication de SJD sur ses activités?":
                    entry.activite,
                "1.3 Partagez un souvenir marquant de votre passage à SJD ou un message à la communauté :":
                    entry.testimonial,

                // 2. Expérience académique à SJD
                "2.1 Qu’est-ce que vous pensez du conseil de perfectionnement de SJD ?":
                    entry.conseil,
                "2.2 Quelles suggestions pouvez-vous faire dans le cadre de la création de l’école d’agriculture de SJD dès la rentrée prochaine ?":
                    entry.agriculture,
                "2.3 Qu’est-ce que vous pensez des projets tutorés de 4e année qui débouchent à l’incubation des entreprises ?":
                    entry.tutore,
                "2.4 Faites des recommandations aux différentes écoles (SJRS, SJMB, SJP, SJHS, SJLP) sur une filière de votre choix.":
                    entry.ecole,
                "2.5 Que pensez-vous de la mise sur pieds du CREDIT (Centre de Recherche Entrepreneuriale pour le Développement Industriel et Technologique) à SJD ?":
                    entry.centre,
                "2.5 Comment évaluez-vous la qualité générale des enseignements reçus à SJD ?":
                    entry.teachingQuality,
                "2.6 Les compétences acquises à SJD vous ont-elles été utiles dans votre parcours professionnel ?":
                    entry.skillsUsefulness,
                "2.7 Recommanderiez-vous la formation de SJD à d’autres étudiants ?":
                    entry.recommend,

                // 3. Implication dans la formation
                "3.1 Seriez-vous disposé(e) à offrir des cours, séminaires ou formations à SJD ?":
                    entry.willingToTeach,
                "3.2 Si oui, dans quel(s) domaine(s) ou sur quel(s) thème(s) ?":
                    entry.teachingFields,

                // 4. Propositions de partenariats
                "4.1 Avez-vous des idées ou opportunités de partenariat à proposer à SJD ?":
                    entry.partnershipSuggestions,
                "4.2 Seriez-vous prêt(e) à faciliter ou accompagner la mise en œuvre d’un partenariat ?":
                    entry.willingToSupportPartnership,

                // 5. Reconnaissance du diplôme à l’international
                "5.1 Êtes-vous actuellement à l’étranger ?": entry.abroad,
                "5.2 Avez-vous rencontré des difficultés pour faire certifier votre diplôme/attestation ?":
                    entry.certificationIssue,
                "5.3 Avez-vous des suggestions pour améliorer les certifications de diplômes/attestations ?":
                    entry.certificationSuggestion,

                // 6. Prix & Distinctions – Membre de l’administration
                "6.1 Souhaitez-vous proposer un prix à un membre de l’administration qui a marqué positivement votre parcours à SJD ?":
                    entry.awardAdmin,
                "6.2 Si oui, précisez le nom, la fonction et la raison :":
                    entry.adminAwardDetails,

                // 7. Prix & Distinctions – Anciens étudiants
                "7.1 Avez-vous des propositions de prix à décerner à des anciens étudiants de SJD ?":
                    entry.awardAlumni,
                "7.2 Si oui, précisez le nom, le parcours et le type de prix :":
                    entry.alumniAwardDetails,

                // 8. Vision UNEEP et formation en alternance à SJD (à compléter selon la suite du formulaire)

                "8.1 Comment bien opérationaliser la vision UNEEP (université numérique écologique entrepreneuriale et panafricaine) à SJD ?":
                    entry.vision_uneep,
                "8.2 Comment réussir l’implémentation d’une formation par alternance à SJD ?":
                    entry.work_study,
                "8.3 Comment développer davantage la culture d’entreprise par un esprit d’entrepreneuriat à SJD ?":entry.entrepreneurship_culture,
                "9.1 Quels sont, selon vous, les points forts actuels de la formation à SJD ?":
                    entry.strengths,
                "9.2 Quelles améliorations proposez-vous pour renforcer la qualité de la formation ?":
                    entry.improvements,
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
