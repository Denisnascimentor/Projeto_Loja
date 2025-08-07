// Popup do usuário
const userIcon = document.getElementById('user-icon');
const userPopup = document.getElementById('user-popup');

// Função para verificar se o usuário está logado
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Função para logout
function logout() {
    localStorage.removeItem('currentUser');
    updateUserPopup();
    userPopup.classList.remove('show');
    showMessage('Logout realizado com sucesso!');
}

// Função para mostrar mensagens
function showMessage(message, isSuccess = true) {
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        background-color: ${isSuccess ? '#4CAF50' : '#f44336'};
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Função para atualizar o conteúdo do popup baseado no status do usuário
function updateUserPopup() {
    const currentUser = getCurrentUser();
    const popupContent = userPopup.querySelector('.popup-content');
    
    if (currentUser) {
        // Usuário logado - mostrar informações e opção de logout
        popupContent.innerHTML = `
            <div class="user-info">
                <h3>Bem-vindo!</h3>
                <p><strong>${currentUser.name}</strong></p>
                <p>${currentUser.email}</p>
            </div>
            <div class="user-actions">
                <a href="#" class="profile-btn">Meu Perfil</a>
                <a href="#" class="orders-btn">Meus Pedidos</a>
                <button class="logout-btn" onclick="logout()">Sair</button>
            </div>
        `;
    } else {
        // Usuário não logado - mostrar opção de login
        popupContent.innerHTML = `
            <p>Faça login para acessar sua conta</p>
            <a href="login-register.html" class="connect-btn">Conectar-se</a>
        `;
    }
}

// Mostrar/esconder popup ao clicar no ícone do usuário
userIcon.addEventListener('click', (e) => {
    e.preventDefault();
    updateUserPopup(); // Atualiza o conteúdo antes de mostrar
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

// Inicializar o popup quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    updateUserPopup();
});
