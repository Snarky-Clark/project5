// Discalimer: I wrote the following code myself. I reused code from the previous assignment
// and reformatted it to function as a single-page application as well as to have a main
// javascript file that contained the the primary javascript and its validation. I initailly
// did not have a separate page for page switching and theme toggling, but added that later and
// was pleasantly surprised how much better everything worked.

const contactButton = document.querySelector("#contact-button");
const contactForm = document.querySelector("#myform");

if (contactForm) {
    contactForm.classList.add("hidden");
}

if (contactButton && contactForm) {
    contactButton.addEventListener("click", function() {
        contactForm.classList.toggle("hidden");
    });
}
