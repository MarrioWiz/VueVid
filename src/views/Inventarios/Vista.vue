<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const inventario = ref({});

onMounted(async () => {
    try {
        const response = await axios.get(`/api/inventarios/${route.params.id}`);
        inventario.value = response.data.data;
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
    }
});

const goBack = () => {
    router.push('/inventarios');
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Tarjeta de detalles del inventario -->
            <div class="card shadow-lg border-0" style="background: linear-gradient(135deg, #6b0f1a, #b91372); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3 class="mb-0">Detalles del Videojuego</h3>
                </div>
                <div class="card-body">
                    <!-- Información del inventario -->
                    <p><strong>Nombre del Videojuego:</strong> {{ inventario.nombrevideojuego }}</p>
                    <p><strong>Género:</strong> {{ inventario.genero }}</p>
                    <p><strong>Clasificación:</strong> {{ inventario.clasificacion }}</p>
                    <p><strong>Estudio:</strong> {{ inventario.estudio }}</p>
                    <p><strong>Precio:</strong> ${{ inventario.precio }}</p>
                    <div class="text-center mt-4">
                        <h5 class="text-warning">Imagen del Videojuego</h5>
                        <img :src="`https://apig.miguelangel.istigen23.com/${inventario.imagen}`" alt="Imagen del videojuego" class="img-thumbnail border border-warning" style="max-width: 300px;" />
                    </div>
                </div>
                <!-- Botón de regreso -->
                <div class="card-footer text-center">
                    <button @click="goBack" class="btn btn-warning w-100 fw-bold">Regresar</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.card-header {
    font-size: 1.4rem;
    letter-spacing: 1px;
}

.card-body p {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
}

.img-thumbnail {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
}

.btn-warning {
    background-color: #e0a800;
    color: #fff;
    border: none;
    transition: 0.3s;
}

.btn-warning:hover {
    background-color: #d39e00;
}
</style>
