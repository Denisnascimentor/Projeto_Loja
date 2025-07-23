<template>
  <header>
    <div class="logo-left">
      <a href="#"><img :src="logo" alt="Logo" /></a>
    </div>
    <dev class="center-container">
      <form class="search-form" @submit.prevent>
        <input type="search" placeholder="Pesquisar..." class="search-input" />
        <button type="submit" class="search-btn">
          <i class="ri-search-line"></i>
        </button>
      </form>
    </dev>

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
  </header>
</template>

<script setup lang="ts">
import logo from "@/assets/img/DeRu-logo1.png";
</script>

<style scoped>
header {
  background-color: #271d1d;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}

.logo-left img {
  width: 70px;
  margin-left: 0;
  margin-top: 0;
  display: block;
}
.search-form {
  display: flex;
  align-items: center;
  background: #2c2121;
  border-radius: 20px;
  padding: 4px 12px;
  height: 40px;
  width: 250px;
  margin: 0 auto;
}

.search-input {
  border: none;
  background: transparent;
  color: #fff;
  font-size: 1rem;
  outline: none;
  padding: 8px;
  width: 150px;
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
  padding: 0 4.4rem;
  display: flex;
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
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-list li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
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
</style>
