const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const container = document.getElementById('container');

// Toggle entre login e cadastro
registerButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Funções para gerenciar usuários no localStorage
function saveUser(name, email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o email já existe
    if (users.some(user => user.email === email)) {
        return { success: false, message: 'Email já está em uso!' };
    }
    
    // Adiciona o novo usuário
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, message: 'Usuário cadastrado com sucesso!' };
}

function validateUser(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        return { success: true, message: 'Login realizado com sucesso!', user };
    } else {
        return { success: false, message: 'Email ou senha incorretos!' };
    }
}

function showMessage(message, isSuccess = true) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
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
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Handle do formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    
    if (!name || !email || !password) {
        showMessage('Por favor, preencha todos os campos!', false);
        return;
    }
    
    const result = saveUser(name, email, password);
    showMessage(result.message, result.success);
    
    if (result.success) {
        // Permite que o navegador detecte o envio bem-sucedido
        // para oferecer salvar a senha
        setTimeout(() => {
            // Limpa o formulário
            document.getElementById('registerForm').reset();
            // Muda para a tela de login
            container.classList.remove('right-panel-active');
        }, 100);
    }
});

// Handle do formulário de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        e.preventDefault();
        showMessage('Por favor, preencha todos os campos!', false);
        return;
    }
    
    const result = validateUser(email, password);
    
    if (result.success) {
        // Permite que o navegador detecte o login bem-sucedido
        // para oferecer salvar a senha
        showMessage(result.message, result.success);
        
        // Salva o usuário logado
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        
        // Não previne o comportamento padrão para permitir que
        // o navegador detecte o envio bem-sucedido
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    } else {
        e.preventDefault();
        showMessage(result.message, result.success);
    }
});

// Função para logout (você pode usar em outras páginas)
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login-register.html';
}

// Função para verificar se o usuário está logado (você pode usar em outras páginas)
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Função para listar todos os usuários cadastrados (apenas para debug)
function listAllUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Usuários cadastrados:', users);
    return users;
}
