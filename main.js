// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Menú desplegable
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Efecto de scroll en el header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegación suave (smooth scroll)
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

    // Cambiar entre modo claro y oscuro
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Cálculo de paneles SIP
    const cotizacionForm = document.getElementById('cotizacionForm');
    const tamanoPanelSelect = document.getElementById('tamano-panel');
    const panelPersonalizado = document.getElementById('panel-personalizado');
    const resultadoPaneles = document.getElementById('resultado-paneles');

    tamanoPanelSelect.addEventListener('change', function() {
        if (this.value === 'personalizado') {
            panelPersonalizado.style.display = 'block';
        } else {
            panelPersonalizado.style.display = 'none';
        }
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
});