<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const route = useRoute();
const cliente = ref({});
const id = ref(route.params.id);

onMounted(() => {
    getCliente();
});

const getCliente = async () => {
    await axios.get('/api/clientes/' + id.value).then(response => {
        cliente.value = response.data.data;
    });
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg border-0" style="background: linear-gradient(135deg, #1e272e, #485460); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3>Detalles del Cliente</h3>
                </div>
                <div class="card-body">
                    <p><strong>Nombre:</strong> {{ cliente.nombre }}</p>
                    <p><strong>Correo:</strong> {{ cliente.correo }}</p>
                    <p><strong>Teléfono:</strong> {{ cliente.telefono }}</p>
                    <p><strong>Edad:</strong> {{ cliente.edad }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Estilo general de la tarjeta */
.card {
    border-radius: 10px;
}

/* Encabezado */
.card-header {
    border-radius: 10px 10px 0 0;
}

/* Fondo del contenido */
.card-body {
    background: linear-gradient(135deg, #f1f2f6, #dcdde1);
    padding: 20px;
    border-radius: 10px;
    font-size: 1rem;
    color: #2c3e50;
}

/* Sombra y diseño */
.card {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
</style>
