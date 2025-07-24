<template>
  <header>
    <div class="top-strip">
      <a href="#"><img :src="logo" alt="Logo" /></a>
      <dev class="center-container">
        <form class="search-form" @submit.prevent>
          <input
            type="search"
            placeholder="Pesquisar..."
            class="search-input"
          />
          <button type="submit" class="search-btn">
            <i class="ri-search-line"></i>
          </button>
        </form>
      </dev>
    </div>
  </header>

  <div class="secondary-strip">
    <nav class="nav-bar">
      <ul class="nav-list">
        <li>
          <a href="#home"><i class="ri-home-4-line"></i> Home</a>
        </li>
        <li>
          <a href="#discord"><i class="bx bxl-discord"></i> Discord</a>
        </li>
        <li>
          <a href="#doacoes"><i class="ri-hand-heart-line"></i> Doações</a>
        </li>
        <li>
          <a href="#contato"><i class="ri-mail-line"></i> Contato</a>
        </li>
      </ul>
    </nav>

    <div class="user-profile">
      <span class="hello-user">Oi, "nome_user"</span>
      <a href="#profile"><img :src="userPhoto" alt="User Profile" /></a>
    </div>
  </div>

  <section class="main-content-area">
    <div class="pix-donation-card">
      <img src="/src/assets/img/pix.png" alt="donation-card" />
    </div>

    <div class="content-col">
      <h2>Últimas Atualizações</h2>
      <!-- Aqui você pode adicionar os cards de atualizações -->
    </div>

    <aside class="sidebar-col">
      <div class="box-help-us">
        <h1><i class="ri-hand-heart-line"></i> DOE</h1>
        <img src="/src/assets/img/apoia.png" alt="" />
      </div>
      <!-- Você pode adicionar outros blocos aqui, como "Mais Lidos" -->
    </aside>
  </section>
</template>

<script setup lang="ts">
import logo from "@/assets/img/DeRu-logo1.png";
import userPhoto from "@/assets/img/DeRu-logo2.png";
</script>

<style scoped>
header {
  background-color: #271d1d;
  display: flex;
  height: 70px;
  justify-content: center;
}
.top-strip {
  display: flex;
  align-items: center;
  margin-right: 68vh;
  gap: 20px;
}
.top-strip img {
  width: 70px;
  height: 90 0px;
}
.search-form {
  display: flex;
  background: #2c2121;
  border-radius: 12px;
  height: 40px;
  width: 250px;
}

.search-input {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  outline: none;
  padding: 8px;
  width: 300px;
}

.search-input:focus::placeholder {
  color: transparent;
}

.search-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3em;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.secondary-strip {
  background-color: #302525;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
}
.nav-list {
  display: flex;
  gap: 60px;
  list-style: none;
  margin-right: 20vh;
}
.nav-list li a {
  color: #fff;
  text-decoration: none;
  font-size: 0.96rem;
  display: flex;
  align-items: center;
}
.nav-list li a i {
  margin-right: 8px;
  font-size: 1.3em;
}

.nav-list a {
  transition: all 0.3s ease;
}
.nav-list a:hover {
  color: #726b6b;
  transform: scale(1.2);
}

.user-profile {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-left: 100px;
}

.hello-user {
  color: #fff;
  width: 120px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
.user-profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.main-content-area {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 0 24px;
  box-sizing: border-box;
}

.pix-donation-card img {
  background-color: rgb(35, 30, 37);
  border: 2px solid #271d1d;
  box-shadow: 0 4px 38px #271d1d;
}

.content-col {
  flex: 2 1 0;
}
.content-col h2 {
  color: #271d1d;
  font-size: 2rem;
  margin-top: 100px;
  border-bottom: 2px solid #271d1d;
  display: inline-block;
}
.sidebar-col {
  flex: 1 1 300px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.box-help-us {
  border: 2px solid #271d1d;
  border-radius: 12px;
  background: white;
}
.box-help-us h1 {
  color: #271d1d;
  font-size: 20px;
}

.box-help-us img {
  margin-left: 10px;
  border-radius: 10px;
}
</style>
