document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    const cotizacionForm = document.getElementById('cotizacionForm');
    const tamanoPanelSelect = document.getElementById('tamano-panel');
    const panelPersonalizado = document.getElementById('panel-personalizado');
    const resultadoPaneles = document.getElementById('resultado-paneles');

    tamanoPanelSelect.addEventListener('change', function() {
        panelPersonalizado.style.display = this.value === 'personalizado' ? 'block' : 'none';
    });

    cotizacionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const metros = parseFloat(document.getElementById('metros').value);
        let anchoPanel, altoPanel;

        if (tamanoPanelSelect.value === 'personalizado') {
            anchoPanel = parseFloat(document.getElementById('ancho').value);
            altoPanel = parseFloat(document.getElementById('alto').value);
        } else {
            const tamano = tamanoPanelSelect.value.split('x');
            anchoPanel = parseFloat(tamano[0]);
            altoPanel = parseFloat(tamano[1]);
        }

        const areaPanel = anchoPanel * altoPanel;
        const panelesNecesarios = Math.ceil(metros / areaPanel);

        resultadoPaneles.textContent = `Necesitas aproximadamente ${panelesNecesarios} paneles.`;
    });

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;
    const itemsPerView = 3;
    const itemWidth = 100 / itemsPerView;

    function moveCarousel() {
        currentIndex++;
        if (currentIndex >= totalItems - itemsPerView + 1) {
            currentIndex = 0;
        }
        carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    }

    setInterval(moveCarousel, 5000);
    carouselTrack.style.transform = `translateX(0)`;
});
