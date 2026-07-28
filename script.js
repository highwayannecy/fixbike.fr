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
                <a href="cgl.html">Conditions Générales de Location</a>
                <a href="mentions-legales.html">Mentions Légales</a>
                <a href="confidentialite.html">Politique de Confidentialité</a>
            </div>
        </footer>
        `;
        }
    }

    // Enregistrement des nouveaux éléments HTML
    customElements.define('custom-header', CustomHeader);
    customElements.define('custom-footer', CustomFooter);

    // SYSTEME DE TRADUCTION DE LANGUE COMPLET
    // Objet de traduction contenant uniquement la langue alternative (Anglais)
    const translations = {
        en: {
            // Navigation & Hero
            "nav-revisions": "Tune-ups",
            "nav-reparations": "Repairs",
            "nav-rental": "Rentals",
            "nav-tour": "Guided Tour",
            "nav-contact": "Contact & Map",
            "hero-title": "Your Trusted Bike Expert in Annecy",
            "hero-subtitle": "All-brand repairs, comprehensive servicing, and tailor-made rentals. Ride away with peace of mind.",

            // Révisions (Forfaits Express, Gold, Diamond)
            "rev-title": "Maintenance Packages",
            "rev-subtitle": "Transparent pricing for optimal bike health",
            "rev-exp-1": "<strong>Brake</strong> adjustment",
            "rev-exp-2": "<strong>Transmission</strong> adjustment",
            "rev-exp-3": "Tire inflation",
            "rev-gld-1": "<strong>Express</strong> maintenance",
            "rev-gld-2": "Drivetrain <strong>cleaning</strong> and <strong>lubrication</strong>",
            "rev-gld-3": "<strong>Wheel</strong> and <strong>crankset</strong> inspection",
            "rev-dia-1": "<strong>Gold</strong> maintenance",
            "rev-dia-2": "<strong>Headset</strong> inspection",
            "rev-dia-3": "<strong style='font-size: 24px'>-20%</strong> on repairs",
            "pieces-repairs-disclaimer": "* Prices do not include parts or repairs",
            "pieces-disclaimer": "* Prices do not include parts",

            // Réparations (Style Image 2026)
            "rep-title": "Repair Rates",
            "rep-subtitle": "Targeted interventions based on the level of complexity",
            "cat-wheel": "WHEEL",
            "cat-brake": "BRAKES",
            "cat-trans": "DRIVETRAIN",
            
            // Blocs de description avec structures complexes (Balises <strong> respectées à 100%)
            "rep-w1-t": "<strong>Simple</strong> assembly",
            "rep-w1-d": "Tire or inner tube replacement + adjustment",
            "rep-w2-t": "<strong>Simple + medium</strong> assembly",
            "rep-w2-d": "Light wheel truing, tubeless + adjustment",
            "rep-w3-t": "<strong>Simple + medium + complex</strong> assembly",
            "rep-w3-d": "Rim replacement + adjustment",
            "rep-b1-t": "<strong>Simple</strong> assembly",
            "rep-b1-d": "Cable or housing + adjustment",
            "rep-b2-t": "<strong>Simple + medium</strong> assembly",
            "rep-b2-d": "Brake pads or disc rotors replacement or brake bleed + adjustment",
            "rep-b3-t": "<strong>Simple + medium + complex</strong> assembly",
            "rep-b3-d": "Caliper/lever replacement + adjustment",
            "rep-t1-t": "<strong>Simple</strong> assembly",
            "rep-t1-d": "Cable or housing or chain + adjustment",
            "rep-t2-t": "<strong>Simple + medium</strong> assembly",
            "rep-t2-d": "Shifter derailleur + adjustment + cleaning and lubrication",
            "rep-t3-t": "<strong>Simple + medium + complex</strong> assembly",
            "rep-t3-d": "Derailleur or cassette + adjustment + cleaning and lubrication",

            // Location
            "rent-title": "Rental Service",
            "rent-subtitle": "Premium cycling equipment hired by the hour",
            "th-equip": "Equipment / Bike Type",
            "th-price": "Rate Per Hour",
            "th-price-hd": "1/2 day <div class='th-price-detail'>(0 to 4h)</div>",
            "th-price-fd": "Full day <div class='th-price-detail'>(+ 4h)</div>",
            "rent-warn": "⚠️ Every single started hour is due ⏱️",
            "rent-foot-1": "* Up to 1m45",
            "rent-foot-2": "** Max. 40kg. Trailer only (without bike): half a day = 20 €, full day = 30 €",
            "rent-foot-3": "*** Max. 20kg. Child seat only (without bike): half-day, full day = 10 €",

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

            // Formulaire
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
            "cont-addr": "1 rue Jean Jaures, 74000 Annecy",
            "cont-h-hours": "⏱️ Opening Hours",
            "days-m": "Monday :",
            "days-t-to-s": "Tuesday to Saturday :",
            "days-s-su": "Saturday and Sunday *:",
            "rdv-warn": "* By appointment booked the day before at the latest",
            "footer-cgv": "Terms & Conditions (CGV)",

            // Boutique
            "nav-shop": "Bikes for sale 🏷️", 
            "shop-title": "Our Used & New Bikes", 
            "shop-subtitle": "Bikes fully serviced by our experts, ready to ride"
        }
    };

    // Objet pour mémoriser automatiquement le texte français d'origine écrit dans le HTML
    const originalFrenchTexts = {};

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

    // FONCTION GLOBALE DE TRADUCTION AMÉLIORÉE
    function applyTranslations() {
        document.querySelectorAll('[node-type], [data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (!key) return;

            // Au tout premier passage, on sauvegarde le texte français directement écrit dans le HTML
            if (!(key in originalFrenchTexts)) {
                originalFrenchTexts[key] = element.innerHTML;
            }

            if (currentLang === 'en') {
                // Si anglais : on applique la traduction si elle existe
                if (translations.en[key]) {
                    element.innerHTML = translations.en[key];
                }
            } else {
                // Si français : on restaure le texte HTML d'origine capturé au début
                element.innerHTML = originalFrenchTexts[key];
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