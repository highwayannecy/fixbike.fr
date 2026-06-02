document.addEventListener("DOMContentLoaded", () => {

    // Pseudo-base de données des vélos à vendre
    const bikesDB = [
        {
            id: 1,
            name: "NCM T3s",
            type: "VAE / Électrique",
            price: "1 250 €",
            state: "Proche du neuf",
            image: "assets/ncm_t3s.webp",
            features: ["Taille 26\"", "Moteur DAS-KIT x15 (55 Nm)", "Batterie 576Wh", "Autonomie ~90km", "Révisé et garanti 12 mois constructeur"]
        },
        {
            id: 2,
            name: "TREK ÉMONDA SL 6 PRO 2018",
            type: "Vélo de route",
            price: "1 600 €",
            state: "Occasion - Très bon état",
            image: "assets/trek.jpg",
            features: ["Taille 58 (XL)", "Cadre Carbone léger", "Transmission Shimano Ultegra 2x11v", "Poids : 7,8 kg", "Roues : Vittoria QURANO 60 Full Carbon CLINCHER Wheel Set with G+ Graphene"]
        },
        {
            id: 3,
            name: "Orbea AVANT H60 2025",
            type: "Vélo de route",
            price: "1 000 €",
            state: "Occasion - Excellent état",
            image: "assets/orbea.webp",
            features: ["Taille 53 (S/M)", "Cadre Aluminium", "Transmission Shimano Claris 2x8v", "Poids : 10,2 kg", "Freins à disque mécanique"]
        },
        {
            id: 4,
            name: "ROSSIGNOL Heretic Deore 12",
            type: "VTT Enduro Tout-Suspendu",
            price: "2 700 €",
            state: "Neuf",
            image: "assets/rossignol.jpg",
            features: ["Taille L", "Transmission Shimano Deore 1x12v", "Poids : 17,2 kg", "Disques hydrauliques 4 pistons", "Fourche : Marzocchi Bomber Z1 Rail 2.0 (170 mm de débattement)", "Amortisseur : Marzocchi Bomber Air (165 mm de débattement)"]
        },
    ];

    // Définition du Header Personnalisé
    class CustomHeader extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
        <header>
            <div class="header-container">
                <a href="index.html" class="logo-container">
                    <img src="assets/logo-fixbike.png" alt="FIXBIKE Logo" class="logo-img">
                </a>
                
                <button class="burger-menu" id="burgerToggle">☰</button>

                <nav id="mainNav">
                    <a href="index.html#revisions" data-i18n="nav-revisions">Révisions</a>
                    <a href="index.html#reparations" data-i18n="nav-reparations">Réparations</a>
                    <a href="index.html#locations" data-i18n="nav-rental">Locations</a>
                    <a href="index.html#balade" data-i18n="nav-tour">Balade Guidée</a>
                    <a href="boutique.html" style="color: var(--accent);" data-i18n="nav-shop">Vélos à vendre 🏷️</a>
                    <a href="index.html#contact" data-i18n="nav-contact">Contact & Accès</a>
                    <div class="nav-actions">
                        <button class="lang-btn" id="langToggle">🇬🇧 EN</button>
                    </div>
                </nav>
            </div>
        </header>
        `;
        }
    }

    // Définition du Footer Personnalisé
    class CustomFooter extends HTMLElement {
        connectedCallback() {
            this.innerHTML = `
        <footer>
            <img src="assets/logo-fixbike.png" alt="FIXBIKE Logo" class="footer-logo"><br>
            <p>© 2026 fix-bike.fr - Tous droits réservés.</p>
            <div class="footer-links">
                <a href="cgv.html" data-i18n="footer-cgv">Conditions Générales de Vente (CGV)</a>
            </div>
        </footer>
        `;
        }
    }

    // Enregistrement des nouveaux éléments HTML
    customElements.define('custom-header', CustomHeader);
    customElements.define('custom-footer', CustomFooter);

    // SYSTEME DE TRADUCTION DE LANGUE COMPLET
    const translations = {
        fr: {
            // Navigation & Hero
            "nav-revisions": "Révisions",
            "nav-reparations": "Réparations",
            "nav-rental": "Locations",
            "nav-tour": "Balade Guidée",
            "nav-contact": "Contact & Accès",
            "hero-title": "Votre Expert Vélo de Confiance à Annecy",
            "hero-subtitle": "Réparation toutes marques, révisions complètes et service de location sur mesure. Repartez l'esprit tranquille.",

            // Révisions
            "rev-title": "Forfaits Révision",
            "rev-subtitle": "Des formules transparentes pour un entretien optimal",
            "rev-exp-1": "Réglage frein et vitesses",
            "rev-exp-2": "Gonflage pneus",
            "rev-sil-1": "<strong>Inclus Formule Express</strong>",
            "rev-sil-2": "Nettoyage et graissage transmission",
            "rev-sil-3": "Contrôle des roues et pédalier",
            "rev-gld-1": "<strong>Inclus Formule Silver</strong>",
            "rev-gld-2": "Contrôle du jeu de direction",
            "rev-gld-3": "Nettoyage complet du vélo",
            "pieces-disclaimer": "* Les prix n’incluent pas les pièces de rechange",

            // Réparations
            "rep-title": "Tarifs Réparation",
            "rep-subtitle": "Interventions ciblées selon le niveau de complexité",
            "cat-wheel": "ROUE",
            "cat-brake": "FREIN",
            "cat-trans": "TRANSMISSION",
            "lvl-1": "Niveau 1",
            "lvl-2": "Niveau 2",
            "lvl-3": "Niveau 3",
            "rep-w1-t": "Montage simple",
            "rep-w1-d": "Changement de pneu ou chambre à air",
            "rep-w2-t": "Montage simple + medium",
            "rep-w2-d": "Dévoilage léger + réglages",
            "rep-w3-t": "Montage simple + medium + complexe",
            "rep-w3-d": "Changement de jante ou montage tubeless + réglages",
            "rep-b1-t": "Montage simple",
            "rep-b1-d": "Câble ou gaine + réglages",
            "rep-b2-t": "Montage simple + medium",
            "rep-b2-d": "Changement patins ou plaquettes ou disque ou purge + réglages",
            "rep-b3-t": "Montage simple + medium + complexe",
            "rep-b3-d": "Changement étrier/levier + réglages",
            "rep-t1-t": "Montage simple",
            "rep-t1-d": "Câble ou gaine ou chaîne + réglages",
            "rep-t2-t": "Montage simple + medium",
            "rep-t2-d": "Manette dérailleur + réglages + nettoyage et lubrification",
            "rep-t3-t": "Montage simple + medium + complexe",
            "rep-t3-d": "Dérailleur ou cassette + réglages + nettoyage et lubrification",

            // Location
            "rent-title": "Service Location",
            "rent-subtitle": "Des équipements de qualité loués à l'heure",
            "th-equip": "Équipement / Type de Vélo",
            "th-price": "Tarif Par Heure",
            "rent-warn": "⚠️ Chaque heure entamée est due ⏱️",
            "rent-foot-1": "* Jusqu'à 1m45",
            "rent-foot-2": "** Location accompagnée d'un de nos vélos. Location seule : Charette 20 €/h, Siège Enfant 10 €/h.",

            // Balade Guidée
            "tour-title": "Découverte du lac d'Annecy",
            "tour-subtitle": "Balade Guidée en Vélo Électrique autour du Lac d’Annecy",
            "tour-intro": "Les horaires indiqués sont donnés à titre indicatif afin de garder une expérience détendue et agréable. Le programme reste flexible et le retour peut se faire légèrement plus tôt selon le rythme du groupe.",
            "tour-inc-h": "Inclus",
            "tour-inc-1": "Vélo électrique",
            "tour-inc-2": "Casque",
            "tour-inc-3": "Guide local",
            "tour-inc-4": "Anecdotes & spots cachés",
            "tour-inc-5": "Picnic au bord du lac",
            "tour-inc-6": "Pauses photos",
            "tour-inc-7": "Petits groupes (max. 10 personnes)",
            "tour-tagline": "Découvrez Annecy comme un local 🚴‍♂️🌿",
            "tour-map-h": "Carte de l'itinéraire",

            // Timeline de la Balade
            "t-900-t": "Accueil & Briefing",
            "t-900-d": "Accueil au magasin, réglage des vélos, casques, eau et présentation rapide du programme et des consignes de sécurité. Un départ convivial avec musique, café et conseils locaux.",
            "t-930-t": "Départ vers le lac",
            "t-930-d": "Passage par Le Pâquier, les Jardins de l’Europe et le célèbre Pont des Amours avec une première vue sur le lac et les montagnes.",
            "t-945-t": "Arrêt Pont des Amours",
            "t-945-d": "Découverte de la légende du pont, de l’histoire d’Annecy surnommée la Venise des Alpes et pause photos.",
            "t-1000-t": "Balade rive Est",
            "t-1000-d": "Portion facile et agréable avec plusieurs points de vue panoramiques sur le lac.",
            "t-1030-t": "Veyrier-du-Lac",
            "t-1030-d": "Découverte de l’un des plus beaux villages du lac avec ses villas, ses vues montagne/lac et son eau turquoise.",
            "t-1115-t": "Arrivée à Menthon-Saint-Bernard",
            "t-1115-d": "Pause dans le charmant village situé au pied du célèbre château.",
            "t-1130-t": "Arrêt Château de Menthon",
            "t-1130-d": "Pause panoramique proche du château médiéval. Histoires locales, légendes de Saint Bernard et inspiration Disney.",
            "t-1210-t": "Route vers Talloires",
            "t-1210-d": "L’une des plus belles portions de la balade avec des paysages alpins exceptionnels.",
            "t-1230-t": "Arrivée à Talloires",
            "t-1230-d": "Découverte de l’atmosphère paisible de l’un des plus beaux villages du lac.",
            "t-1245-t": "Picnic au bord du lac",
            "t-1245-d": "Moment détente avec picnic, baignade possible et temps libre dans un cadre exceptionnel.",
            "t-1345-t": "Départ retour",
            "t-1345-d": "Retour plus calme et relaxant le long du lac.",
            "t-1445-t": "Pause baignade / plage",
            "t-1445-d": "Pause détente avec possibilité de baignade et photos au bord du lac.",
            "t-1545-t": "Retour par la voie verte",
            "t-1545-d": "Portion facile et agréable permettant de profiter pleinement du paysage et de l’ambiance locale.",
            "t-1630-t": "Dernier arrêt panorama",
            "t-1630-d": "Dernières photos, échanges et recommandations locales avant le retour à Annecy.",
            "t-1700-t": "Retour Annecy centre",
            "t-1700-d": "Fin de la balade dans le centre-ville d’Annecy.",
            "t-1730-t": "Fin d’expérience",
            "t-1730-d": "Partage des photos, recommandations locales, QR code Instagram et fin de journée conviviale.",

            "form-name-lbl": "Nom complet",
            "form-email-lbl": "Adresse Email",
            "form-phone-lbl": "Téléphone (Optionnel)",
            "form-msg-lbl": "Votre message / Demande de réservation",
            "form-btn-submit": "Envoyer le message",
            "form-subject-lbl": "Sujet de votre demande",
            "form-subj-select": "-- Choisissez un sujet --",
            "form-subj-rep": "Réparation / Révision d'un vélo",
            "form-subj-rent": "Location de matériel",
            "form-subj-tour": "Réservation Balade Guidée",
            "form-subj-other": "Autre demande",
            "form-file-lbl": "Ajouter une photo ou un fichier (Optionnel)",
            "form-file-help": "Format d'image ou PDF accepté (Max 5 Mo)",

            // Contact & Footer
            "cont-title": "Contact & Informations Générales",
            "cont-subtitle": "Passez nous voir à l'atelier ou réservez par téléphone",
            "cont-h-coord": "📍 Coordonnées",
            "cont-h-contact": "✉️ Contact",
            "cont-addr": "11 Rue de la Paix, 74000 Annecy, France",
            "cont-h-hours": "⏱️ Horaires d'Ouverture",
            "days-w": "Lundi au Vendredi :",
            "days-s-su": "Samedi et Dimanche * :",
            "rdv-warn": "* Sur rendez-vous pris la veille au plus tard",
            "footer-cgv": "Conditions Générales de Vente (CGV)",

            "nav-shop": "Vélos à vendre 🏷️", 
            "shop-title": "Nos Vélos d'Occasion & Neufs", 
            "shop-subtitle": "Des vélos entièrement révisés par nos experts, prêts à rouler"
        },
        en: {
            // Navigation & Hero
            "nav-revisions": "Tune-ups",
            "nav-reparations": "Repairs",
            "nav-rental": "Rentals",
            "nav-tour": "Guided Tour",
            "nav-contact": "Contact & Map",
            "hero-title": "Your Trusted Bike Expert in Annecy",
            "hero-subtitle": "All-brand repairs, comprehensive servicing, and tailor-made rentals. Ride away with peace of mind.",

            // Révisions
            "rev-title": "Maintenance Packages",
            "rev-subtitle": "Transparent pricing for optimal bike health",
            "rev-exp-1": "Brake and gear adjustment",
            "rev-exp-2": "Tire inflation",
            "rev-sil-1": "<strong>Express Package Included</strong>",
            "rev-sil-2": "Drivetrain cleaning and lubrication",
            "rev-sil-3": "Wheel and crankset inspection",
            "rev-gld-1": "<strong>Silver Package Included</strong>",
            "rev-gld-2": "Headset play inspection",
            "rev-gld-3": "Complete bike wash",
            "pieces-disclaimer": "* Prices do not include replacement parts",

            // Réparations
            "rep-title": "Repair Rates",
            "rep-subtitle": "Targeted interventions based on technical complexity",
            "cat-wheel": "WHEEL",
            "cat-brake": "BRAKES",
            "cat-trans": "DRIVETRAIN",
            "lvl-1": "Level 1",
            "lvl-2": "Level 2",
            "lvl-3": "Level 3",
            "rep-w1-t": "Simple installation",
            "rep-w1-d": "Tire or inner tube replacement",
            "rep-w2-t": "Simple + medium installation",
            "rep-w2-d": "Light wheel truing + adjustments",
            "rep-w3-t": "Simple + medium + complex installation",
            "rep-w3-d": "Rim replacement or tubeless setup + adjustments",
            "rep-b1-t": "Simple installation",
            "rep-b1-d": "Cable or housing replacement + adjustments",
            "rep-b2-t": "Simple + medium installation",
            "rep-b2-d": "Brake pads, disc rotor replacement or brake bleed + adjustments",
            "rep-b3-t": "Simple + medium + complex installation",
            "rep-b3-d": "Caliper or lever replacement + adjustments",
            "rep-t1-t": "Simple installation",
            "rep-t1-d": "Cable, housing or chain replacement + adjustments",
            "rep-t2-t": "Simple + medium installation",
            "rep-t2-d": "Shifter replacement + adjustments + cleaning and lubrication",
            "rep-t3-t": "Simple + medium + complex installation",
            "rep-t3-d": "Derailleur or cassette replacement + adjustments + cleaning and lubing",

            // Location
            "rent-title": "Rental Service",
            "rent-subtitle": "Premium cycling equipment hired by the hour",
            "th-equip": "Equipment / Bike Type",
            "th-price": "Rate Per Hour",
            "rent-warn": "⚠️ Every single started hour is due ⏱️",
            "rent-foot-1": "* Up to 1m45",
            "rent-foot-2": "** Rental accompanied by one of our bikes. Single rental: Trailer €20/h, Baby Seat €10/h.",

            // Balade Guidée
            "tour-title": "Annecy Lake Experience",
            "tour-subtitle": "Guided E-Bike Tour Around Lake Annecy",
            "tour-intro": "The schedule is provided as an indication to keep the experience relaxed and enjoyable. The tour remains flexible and may finish slightly earlier depending on the group’s pace.",
            "tour-inc-h": "Included",
            "tour-inc-1": "Electric bike",
            "tour-inc-2": "Helmet",
            "tour-inc-3": "Local guide",
            "tour-inc-4": "Stories & hidden spots",
            "tour-inc-5": "Picnic by the lake",
            "tour-inc-6": "Photo stops",
            "tour-inc-7": "Small groups (max. 10 people)",
            "tour-tagline": "Discover Annecy like a local 🚴‍♂️🌿",
            "tour-map-h": "Route Map",

            // Timeline de la Balade
            "t-900-t": "Welcome & Briefing",
            "t-900-d": "Meet at the bike shop for bike fitting, helmets, water, a quick presentation and safety instructions. A relaxed start with coffee, music & local tips.",
            "t-930-t": "Departure Along the Lake",
            "t-930-d": "Ride through Le Pâquier, Jardins de l’Europe and the famous Pont des Amours with beautiful views of the lake and mountains.",
            "t-945-t": "Pont des Amours Stop",
            "t-945-d": "Discover the romantic legend of the bridge, why Annecy is called the Venice of the Alps and enjoy group photos.",
            "t-1000-t": "Scenic East Shore Ride",
            "t-1000-d": "Easy and relaxing cycling section with panoramic viewpoints and turquoise water all along the lake.",
            "t-1030-t": "Veyrier-du-Lac",
            "t-1030-d": "Enjoy one of the most beautiful villages around the lake with elegant villas, mountain views and crystal-clear water.",
            "t-1115-t": "Menthon-Saint-Bernard",
            "t-1115-d": "Arrival in the charming lakeside village at the foot of the famous castle.",
            "t-1130-t": "Château de Menthon Stop",
            "t-1130-d": "Panoramic stop near the medieval castle. Discover local legends, the Saint Bernard story and the Disney inspiration rumor.",
            "t-1210-t": "Ride Toward Talloires",
            "t-1210-d": "One of the most scenic sections of the tour with breathtaking alpine landscapes.",
            "t-1230-t": "Talloires Arrival",
            "t-1230-d": "Explore the peaceful atmosphere of Talloires, one of the jewels of Lake Annecy.",
            "t-1245-t": "Picnic by the Lake",
            "t-1245-d": "Relax by the water with a local picnic, swimming opportunities and free time in a peaceful setting.",
            "t-1345-t": "Return Ride",
            "t-1345-d": "A calm and enjoyable ride back along the lake.",
            "t-1445-t": "Swimming / Beach Stop",
            "t-1445-d": "Optional swimming and relaxing stop by the lake.",
            "t-1545-t": "Greenway Ride",
            "t-1545-d": "Easy cycling section along the lake with time to enjoy the scenery and local atmosphere.",
            "t-1630-t": "Final Panorama Stop",
            "t-1630-d": "Last viewpoint before returning to Annecy. Perfect moment for photos and local recommendations.",
            "t-1700-t": "Return to Annecy",
            "t-1700-d": "End of the ride in Annecy city center.",
            "t-1730-t": "End of Experience",
            "t-1730-d": "Photo sharing, local recommendations, Instagram QR code and a relaxed end to the day.",

            "form-name-lbl": "Full Name",
            "form-email-lbl": "Email Address",
            "form-phone-lbl": "Phone Number (Optional)",
            "form-msg-lbl": "Your Message / Booking Request",
            "form-btn-submit": "Send Message",
            "form-subject-lbl": "Subject of your request",
            "form-subj-select": "-- Choose a subject --",
            "form-subj-rep": "Bike Repair / Service",
            "form-subj-rent": "Equipment Rental",
            "form-subj-tour": "Guided Tour Booking",
            "form-subj-other": "Other inquiry",
            "form-file-lbl": "Add a photo or file (Optional)",
            "form-file-help": "Image or PDF format accepted (Max 5 MB)",

            // Contact & Footer
            "cont-title": "Contact & General Info",
            "cont-subtitle": "Visit our workshop or book by phone",
            "cont-h-coord": "📍 Contact Info",
            "cont-h-contact": "✉️ Contact",
            "cont-addr": "11 Rue de la Paix, 74000 Annecy, France",
            "cont-h-hours": "⏱️ Opening Hours",
            "days-w": "Monday to Friday:",
            "days-s-su": "Saturday and Sunday *:",
            "rdv-warn": "* By appointment booked the day before at the latest",
            "footer-cgv": "Terms & Conditions (CGV)",

            "nav-shop": "Bikes for sale 🏷️", 
            "shop-title": "Our Used & New Bikes", 
            "shop-subtitle": "Bikes fully serviced by our experts, ready to ride"
        }
    };

    // INITIALISATION DES BOUTONS DE NAVIGATION APRES LE RENDU DU COMPOSANT CUSTOM
    const popup = document.getElementById('promoPopup');
    const closeBtn = document.getElementById('closePopup');
    const actionBtn = document.getElementById('popupAction');
    const burgerToggle = document.getElementById('burgerToggle');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    // GESTION DE LA POPUP
    if (popup) {
        setTimeout(() => {
            popup.classList.add('active');
            body.classList.add('popup-active');
        }, 600);

        function closePopup() {
            popup.classList.remove('active');
            body.classList.remove('popup-active');
        }

        if (closeBtn) closeBtn.addEventListener('click', closePopup);

        if (actionBtn) {
            actionBtn.addEventListener('click', () => {
                closePopup();
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    burgerToggle.textContent = '☰';
                }
            });
        }

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    // GESTION DYNAMIQUE DU MENU BURGER (Re-ciblée car générée par le Web Component)
    if (burgerToggle && mainNav) {
        burgerToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            burgerToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    burgerToggle.textContent = '☰';
                }
            });
        });
    }

    // FONCTION GLOBALE DE TRADUCTION AVEC PRÉSERVATION DES BALISES INTÉRIEURES
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                // Si l'élément contient du gras (strong), on remplace uniquement le texte mais garde la structure HTML
                if (element.innerHTML.includes('<strong>')) {
                    let strongContent = element.querySelector('strong').innerHTML;
                    // Traduction spécifique pour les cas complexes ou remplacement de contenu brut
                    if (key === "rev-sil-1") element.innerHTML = `<strong>${translations[currentLang]["rev-sil-1"].replace(/<\/?[^>]+(>|$)/g, "")}</strong>`;
                    else if (key === "rev-gld-1") element.innerHTML = `<strong>${translations[currentLang]["rev-gld-1"].replace(/<\/?[^>]+(>|$)/g, "")}</strong>`;
                } else {
                    element.innerText = translations[currentLang][key];
                }
            }
        });
    }

    // ÉCOUTEUR SUR LE BOUTON DE LANGUE (Fonctionnel même avec l'en-tête dynamique)
    let currentLang = 'fr';
    const langToggleBtn = document.getElementById('langToggle');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            langToggleBtn.textContent = currentLang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
            document.documentElement.lang = currentLang;
            applyTranslations();
        });
    }

    // Sécurité pour empêcher l'envoi de fichiers trop lourds (> 4.5 Mo)
    const fileInput = document.getElementById('form-file');
    const fileHelp = document.getElementById('fileHelp');
    const formButton = document.querySelector('.submit-btn');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const fileSize = this.files[0].size / 1024 / 1024; // Taille en Mo
                if (fileSize > 4.5) { // Sécurité un peu en dessous de 5Mo
                    alert("Ce fichier est trop lourd ! Veuillez choisir une image ou un document de moins de 5 Mo.");
                    this.value = ""; // On vide le champ
                    if (fileHelp) {
                        fileHelp.style.color = "var(--accent)"; // Met le texte d'aide en rouge
                        fileHelp.style.fontWeight = "bold";
                    }
                } else {
                    if (fileHelp) {
                        fileHelp.style.color = "var(--text-muted)";
                        fileHelp.style.fontWeight = "normal";
                    }
                }
            }
        });
    }

    // Génération dynamique des cartes de vélos (Pattern identique aux cartes du site)
    const bikesGrid = document.getElementById('bikes-grid');

    if (bikesGrid) {
        bikesGrid.innerHTML = bikesDB.map(bike => `
        <div class="revision-card bike-card">
            <div>
                <!-- Badge d'état du vélo -->
                <div class="badge">${bike.state}</div>
                
                <!-- Visuel du vélo -->
                <div class="bike-img-container">
                    <img src="${bike.image}" alt="${bike.name}" class="bike-card-img">
                </div>

                <!-- Infos principales -->
                <h3 class="bike-title">${bike.name}</h3>
                <small class="bike-type">${bike.type}</small>
                
                <!-- Prix standardisé -->
                <div class="price-tag">${bike.price}</div>
                
                <!-- Liste des caractéristiques techniques -->
                <ul class="feature-list">
                    ${bike.features.map(feat => `<li>${feat}</li>`).join('')}
                </ul>
            </div>
            
            <!-- Action pour l'acheteur -->
            <div style="margin-top: 25px;">
                <a href="index.html#contact" class="map-btn" style="display: block; text-align: center; background-color: var(--text-dark);">
                    Interessé ? Contactez l'atelier
                </a>
            </div>
        </div>
    `).join('');
    }
});