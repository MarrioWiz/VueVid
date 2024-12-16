<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const route = useRoute();
const vendedors = ref({});
const id = ref(route.params.id);

onMounted(() => {
    getVendedors();
});

const getVendedors = async () => {
    await axios.get('/api/vendedors/' + id.value).then(response => {
        vendedors.value = response.data.data; // Accede a la propiedad `data`
    });
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg border-0" style="background: linear-gradient(135deg, #40407a, #706fd3); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3>Detalles del Vendedor</h3>
                </div>
                <div class="card-body">
                    <p class="fs-5"><strong>Nombre:</strong> {{ vendedors.nombre }}</p>
                    <p class="fs-5"><strong>Correo:</strong> {{ vendedors.correo }}</p>
                    <p class="fs-5"><strong>Teléfono:</strong> {{ vendedors.telefono }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Estilo de la tarjeta */
.card {
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Fondo de la tarjeta */
.card-body {
    background: linear-gradient(135deg, #f1f2f6, #dcdde1);
    padding: 20px;
    border-radius: 10px;
}

/* Encabezado */
.card-header {
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 10px 10px 0 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Texto */
p {
    margin-bottom: 15px;
    font-size: 1.2rem;
    color: #2d3436;
}
</style>
