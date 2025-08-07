// Popup do usuário
const userIcon = document.getElementById('user-icon');
const userPopup = document.getElementById('user-popup');

// Mostrar/esconder popup ao clicar no ícone do usuário
userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    userPopup.classList.toggle('show');
});

// Fechar popup ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userPopup.contains(e.target)) {
        userPopup.classList.remove('show');
    }
});

// Fechar popup ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        userPopup.classList.remove('show');
    }
});
