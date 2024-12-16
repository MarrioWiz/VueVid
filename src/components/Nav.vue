<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const showLogoutButton = ref(true);
const route = useRoute();

const isLoginPage = computed(() => route.name === 'login');

function logout() {
  authStore.logout();
  showLogoutButton.value = false;
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Videojuegos</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.user">
          <li class="nav-item px-lg-5 h4">
            {{ authStore.user.name }}
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/clientes" class="nav-link">Clientes</RouterLink>
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/devolucions" class="nav-link">Devolucion</RouterLink>
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/inventarios" class="nav-link">Inventarios</RouterLink>
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/Vendedors" class="nav-link">Vendedores</RouterLink>
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/Ventas" class="nav-link">Ventas</RouterLink>
          </li>
          <li class="nav-item px-lg-3">
            <RouterLink to="/graphic" class="nav-link">Graphic</RouterLink>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!isLoginPage && showLogoutButton">
          <li class="nav-item px-lg-5">
            <button @click="logout" class="btn btn-success">Salir</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar-custom {
  background: linear-gradient(to bottom, #1f1f1f, #e50914);
  color: white;
}

.navbar-custom .nav-link,
.navbar-custom .navbar-brand {
  color: white;
  transition: color 0.3s;
}

.navbar-custom .nav-link:hover {
  color: #e50914;
}

.navbar-custom .btn-success {
  background-color: #e50914;
  border-color: #a50f13;
  transition: background-color 0.3s, border-color 0.3s;
}

.navbar-custom .btn-success:hover {
  background-color: #a50f13;
  border-color: #70080d;
}
</style>
