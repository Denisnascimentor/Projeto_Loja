
function createDemoUsers() {
    const demoUsers = [
        {
            name: "João Silva",
            email: "joao@teste.com",
            password: "123456"
        },
        {
            name: "Maria Santos",
            email: "maria@teste.com", 
            password: "123456"
        },
        {
            name: "Pedro Oliveira",
            email: "pedro@teste.com",
            password: "123456"
        },
        {
            name: "Ana Costa",
            email: "ana@teste.com",
            password: "123456"
        }
    ];

    // Salva os usuários no localStorage
    localStorage.setItem('users', JSON.stringify(demoUsers));
    
    console.log('Usuários de demonstração criados:');
    demoUsers.forEach(user => {
        console.log(`Email: ${user.email} | Senha: ${user.password}`);
    });
    
    return demoUsers;
}
