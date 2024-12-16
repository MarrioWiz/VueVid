<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// Variables reactivas
const devolucion = ref({});
const venta = ref({});
const juego = ref({});
const id = route.params.id;

// Función para cargar los detalles de la devolución
const getDevolucion = async () => {
    try {
        const response = await axios.get(`/api/devolucions/${id}`);
        devolucion.value = response.data.data;

        // Obtener venta y juego si existen
        if (devolucion.value.venta_id) {
            await getVenta(devolucion.value.venta_id);
        }
        if (devolucion.value.juego_id) {
            await getJuego(devolucion.value.juego_id);
        }
    } catch (error) {
        console.error('Error cargando la devolución:', error);
    }
};

// Función para cargar los detalles de la venta
const getVenta = async (ventaId) => {
    try {
        const response = await axios.get(`/api/ventas/${ventaId}`);
        venta.value = response.data.data || response.data;
    } catch (error) {
        console.error('Error cargando la venta:', error);
    }
};

// Función para cargar los detalles del juego
const getJuego = async (juegoId) => {
    try {
        const response = await axios.get(`/api/inventarios/${juegoId}`);
        juego.value = response.data.data || response.data;
    } catch (error) {
        console.error('Error cargando el juego:', error);
    }
};

// Regresar a la lista de devoluciones
const goBack = () => {
    router.push('/devolucions');
};

// Cargar los datos al montar el componente
onMounted(() => {
    getDevolucion();
});
</script>

<template>
<div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-header bg-info text-white text-center">
            <h4>Detalles de la Devolución</h4>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item"><strong>ID:</strong> {{ devolucion.id }}</li>
                <li class="list-group-item">
                    <strong>Venta:</strong> 
                    <span v-if="venta.id">Venta #{{ venta.id }} - {{ venta.formadepago }} - {{ venta.fecha_de_compra }}</span>
                    <span v-else>Sin venta</span>
                </li>
                <li class="list-group-item"><strong>Motivo:</strong> {{ devolucion.motivo }}</li>
                <li class="list-group-item"><strong>Estado del Juego:</strong> {{ devolucion.estadodeljuego }}</li>
                <li class="list-group-item">
                    <strong>Juego:</strong>
                    <span v-if="juego.id">{{ juego.nombrevideojuego }} - {{ juego.precio }} USD</span>
                    <span v-else>Sin juego</span>
                </li>
                <li class="list-group-item">
                    <strong>Creado el:</strong> {{ devolucion.created_at }}
                </li>
                <li class="list-group-item">
                    <strong>Última actualización:</strong> {{ devolucion.updated_at }}
                </li>
            </ul>
        </div>
        <div class="card-footer text-center">
            <button class="btn btn-secondary" @click="goBack">
                <i class="fa-solid fa-arrow-left"></i> Regresar
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
.card {
    max-width: 600px;
    margin: auto;
}
.card-header {
    font-size: 1.3rem;
    font-weight: bold;
}
.list-group-item {
    font-size: 1.1rem;
}
</style>
