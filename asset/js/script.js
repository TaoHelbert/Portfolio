// Fichier : asset/js/script.js

function scrollCards(direction) {
    const container = document.querySelector('.tt');
    const card = document.querySelector('.card');

    // S'il n'y a pas de carte, on arrête pour éviter une erreur.
    if (!card) return;

    // On calcule la largeur d'une carte en incluant l'espace (gap) entre elles
    // pour un défilement précis.
    const gap = parseFloat(window.getComputedStyle(container).gap) || 20;
    const cardWidth = card.offsetWidth + gap;

    // On défile de 2 cartes à la fois pour un mouvement rapide.
    const scrollAmount = cardWidth * 2;


    // --- LOGIQUE DE LA BOUCLE INFINIE ---

    // Si on clique sur le bouton "Suivant" (droite)
    if (direction === 1) {
        // On vérifie si on est à la fin du scroll.
        // La petite marge de 1px évite les erreurs d'arrondi du navigateur.
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
            // Si on est à la fin, on retourne au tout début avec une animation.
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Sinon, on défile normalement vers la droite.
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
    // Si on clique sur le bouton "Précédent" (gauche)
    else if (direction === -1) {
        // On vérifie si on est déjà au début.
        if (container.scrollLeft === 0) {
            // Si oui, on va directement à la fin avec une animation.
            container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
            // Sinon, on défile normalement vers la gauche.
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }
}



// ==========================================
// GESTION DU FORMULAIRE DE CONTACT
// ==========================================
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

// On vérifie que le formulaire existe sur la page avant d'agir
if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
if (response.ok) {
                successMessage.style.display = "block"; // Affiche le message
                form.reset(); // Vide le formulaire

                // NOUVEAU : Fait disparaître le message après 5 secondes
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 5000);
            } else {                alert("Oups ! Il y a eu un problème lors de l'envoi de votre message.");
            }
        } catch (error) {
            alert("Oups ! Une erreur réseau est survenue.");
        }
    });
}