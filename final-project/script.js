function toggleMobileNav() {
    const mobileNavBar = document.getElementById('mobileNavBar');
    if (mobileNavBar.style.display === 'flex' || mobileNavBar.style.display === '') {
        mobileNavBar.style.display = 'none';
    } else {
        mobileNavBar.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileLinks = document.querySelectorAll('.mobileLink');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileNavBar').style.display = 'none';
        });
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navBar a");

    const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));

            const activeLink = document.querySelector(
            `a[href="#${entry.target.id}"]`
            );
            if (activeLink) {
            activeLink.classList.add("active");
            }
        }
        });
    },
    { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

});