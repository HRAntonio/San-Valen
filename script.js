// ================================
// CONFIGURACIÓN INICIAL
// ================================

// Elementos del DOM
const heartSvg = document.getElementById('heartSvg');
const messageContainer = document.getElementById('messageContainer');
const closeBtn = document.getElementById('closeBtn');
const heartsContainer = document.getElementById('heartsContainer');
const valentineCard = document.getElementById('valentineCard');

// ================================
// GALERÍA DE TARJETAS ROMÁNTICAS
// ================================

const cardsContainer = document.getElementById('cardsContainer');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Colección de frases románticas
const loveCards = [
    {
        icon: '💖',
        text: 'El amor es la única fuerza capaz de transformar un enemigo en amigo.',
        author: '- Martin Luther King Jr.'
    },
    {
        icon: '🌹',
        text: 'Donde hay amor, hay vida.',
        author: '- Mahatma Gandhi'
    },
    {
        icon: '💕',
        text: 'El amor no mira con los ojos, sino con el alma.',
        author: '- William Shakespeare'
    },
    {
        icon: '💝',
        text: 'Te amo no solo por lo que eres, sino por lo que soy cuando estoy contigo.',
        author: '- Roy Croft'
    },
    {
        icon: '✨',
        text: 'El mejor y más bello momento de la vida debe ser sentido con el corazón.',
        author: '- Helen Keller'
    },
    {
        icon: '💓',
        text: 'Amar es encontrar en la felicidad de otro tu propia felicidad.',
        author: '- Gottfried Leibniz'
    },
    {
        icon: '🎀',
        text: 'El amor verdadero no tiene final feliz, porque el amor verdadero nunca termina.',
        author: '- Anónimo'
    },
    {
        icon: '💗',
        text: 'Eres mi hoy y todos mis mañanas.',
        author: '- Leo Christopher'
    }
];

let currentIndex = 0;
let autoRotateInterval;

// Crear las tarjetas
function createCards() {
    loveCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('love-card');
        if (index === 0) cardElement.classList.add('active');

        cardElement.innerHTML = `
            <div class="card-icon">${card.icon}</div>
            <p class="card-text">${card.text}</p>
            <p class="card-author">${card.author}</p>
        `;

        cardsContainer.appendChild(cardElement);
    });
}

// Crear los indicadores (dots)
function createDots() {
    loveCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCard(index));
        dotsContainer.appendChild(dot);
    });
}

// Ir a una tarjeta específica
function goToCard(index) {
    const cards = document.querySelectorAll('.love-card');
    const dots = document.querySelectorAll('.dot');

    // Remover clases activas
    cards.forEach(card => {
        card.classList.remove('active', 'prev', 'next');
    });
    dots.forEach(dot => dot.classList.remove('active'));

    // Calcular índices
    const prevIndex = (index - 1 + loveCards.length) % loveCards.length;
    const nextIndex = (index + 1) % loveCards.length;

    // Aplicar clases
    cards[index].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
    dots[index].classList.add('active');

    currentIndex = index;

    // Crear efecto de partículas al cambiar
    if (Math.random() > 0.5) {
        createHeartBurst();
    }
}

// Navegación
function nextCard() {
    const nextIndex = (currentIndex + 1) % loveCards.length;
    goToCard(nextIndex);
}

function prevCard() {
    const prevIndex = (currentIndex - 1 + loveCards.length) % loveCards.length;
    goToCard(prevIndex);
}

// Event listeners para navegación
nextBtn.addEventListener('click', () => {
    nextCard();
    resetAutoRotate();
});

prevBtn.addEventListener('click', () => {
    prevCard();
    resetAutoRotate();
});

// Auto-rotación de tarjetas
function startAutoRotate() {
    autoRotateInterval = setInterval(nextCard, 5000); // Cambia cada 5 segundos
}

function resetAutoRotate() {
    clearInterval(autoRotateInterval);
    startAutoRotate();
}

// Efecto de explosión de corazones pequeños
function createHeartBurst() {
    const numberOfHearts = 8;
    const rect = cardsContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.textContent = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];

        document.body.appendChild(heart);

        const angle = (Math.PI * 2 * i) / numberOfHearts;
        const distance = 60 + Math.random() * 40;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        heart.animate([
            {
                transform: 'translate(0, 0) scale(0)',
                opacity: 1
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        });

        setTimeout(() => heart.remove(), 800);
    }
}

// Inicializar la galería
createCards();
createDots();
startAutoRotate();

// ================================


// Crear las tarjetas de Piolín


// ================================
// CORAZÓN INTERACTIVO
// ================================

// Event listener para mostrar el mensaje cuando se hace clic en el corazón
heartSvg.addEventListener('click', () => {
    messageContainer.classList.add('active');

    // Crear efecto de explosión de corazones
    createHeartExplosion();

    // Reproducir animación del corazón
    heartSvg.style.transform = 'scale(1.3)';
    setTimeout(() => {
        heartSvg.style.transform = 'scale(1)';
    }, 300);
});

// Event listener para cerrar el mensaje
closeBtn.addEventListener('click', () => {
    messageContainer.classList.remove('active');
});

// Cerrar el mensaje al hacer clic fuera de él
messageContainer.addEventListener('click', (e) => {
    if (e.target === messageContainer) {
        messageContainer.classList.remove('active');
    }
});

// ================================
// CORAZONES FLOTANTES DE FONDO
// ================================

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];

    // Posición aleatoria en el ancho de la pantalla
    heart.style.left = Math.random() * 100 + '%';

    // Duración aleatoria de la animación
    const duration = 5 + Math.random() * 5;
    heart.style.animationDuration = duration + 's';

    // Retraso aleatorio
    heart.style.animationDelay = Math.random() * 2 + 's';

    // Tamaño aleatorio
    const size = 15 + Math.random() * 20;
    heart.style.fontSize = size + 'px';

    heartsContainer.appendChild(heart);

    // Eliminar el corazón después de que termine la animación
    setTimeout(() => {
        heart.remove();
    }, (duration + 2) * 1000);
}

// Crear corazones flotantes continuamente
setInterval(createFloatingHeart, 800);

// Crear algunos corazones iniciales
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 300);
}

// ================================
// EXPLOSIÓN DE CORAZONES
// ================================

function createHeartExplosion() {
    const numberOfHearts = 20;
    const rect = heartSvg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝'][Math.floor(Math.random() * 6)];

        document.body.appendChild(heart);

        // Calcular ángulo y distancia aleatorios
        const angle = (Math.PI * 2 * i) / numberOfHearts;
        const distance = 100 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        // Animar el corazón
        heart.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1.5) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // Eliminar el elemento después de la animación
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}


// ================================
// EFECTOS ADICIONALES
// ================================

// Efecto parallax sutil en la tarjeta principal
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 50;
    const y = (window.innerHeight / 2 - e.clientY) / 50;

    if (valentineCard) {
        valentineCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// Restaurar la posición cuando el mouse sale
document.addEventListener('mouseleave', () => {
    if (valentineCard) {
        valentineCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
});

// ================================
// EFECTOS DE PARTÍCULAS AL HACER SCROLL
// ================================

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Crear corazones al hacer scroll
    if (Math.abs(scrollTop - lastScrollTop) > 50) {
        createFloatingHeart();
        lastScrollTop = scrollTop;
    }
});

// ================================
// ANIMACIÓN DE ENTRADA
// ================================

// Animar elementos cuando se carga la página
window.addEventListener('load', () => {
    // Crear explosión inicial de corazones
    setTimeout(() => {
        const elements = document.querySelectorAll('.header, .valentine-card, .love-cards-section, .emoji-gallery, .footer');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease-out';
                el.style.opacity = '1';
            }, index * 200);
        });
    }, 100);
});

// ================================
// ATAJO DE TECLADO
// ================================

// Presionar 'Escape' para cerrar el mensaje
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && messageContainer.classList.contains('active')) {
        messageContainer.classList.remove('active');
    }

    // Presionar 'Enter' o 'Space' para abrir el mensaje
    if ((e.key === 'Enter' || e.key === ' ') && !messageContainer.classList.contains('active')) {
        messageContainer.classList.add('active');
        createHeartExplosion();
        e.preventDefault();
    }
});

// ================================
// CONFETI DE CORAZONES ALEATORIO
// ================================

// Crear confeti de corazones ocasionalmente
setInterval(() => {
    if (Math.random() > 0.7) {
        createHeartConfetti();
    }
}, 5000);

function createHeartConfetti() {
    const confettiCount = 15;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('floating-heart');
            confetti.textContent = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'][Math.floor(Math.random() * 8)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (10 + Math.random() * 15) + 'px';
            confetti.style.animationDuration = (3 + Math.random() * 3) + 's';

            heartsContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }, i * 100);
    }
}

// ================================
// MENSAJE DE CONSOLA
// ================================

console.log('%c💖 ¡Feliz Día de San Valentín! 💖', 'font-size: 20px; color: #ff006e; font-weight: bold;');
console.log('%cHecho con ❤️ y JavaScript vanilla', 'font-size: 14px; color: #ff4d8f;');
console.log('%cQue tengas un día lleno de amor 💕', 'font-size: 12px; color: #ffb3d9;');
