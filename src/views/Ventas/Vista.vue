<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const venta = ref({});
const id = route.params.id;

// Función para cargar los detalles de la venta
const getVenta = async () => {
    try {
        const response = await axios.get(`/api/ventas/${id}`);
        venta.value = response.data.data;
    } catch (error) {
        console.error('Error cargando los detalles de la venta:', error);
    }
};

// Regresar a la lista
const goBack = () => {
    router.push('/ventas');
};

onMounted(() => {
    getVenta();
});
</script>

<template>
<div class="container mt-5">
    <div class="card shadow-lg">
        <div class="card-header bg-info text-white text-center">
            <h4>Detalles de la Venta</h4>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item"><strong>ID:</strong> {{ venta.id }}</li>
                <li class="list-group-item"><strong>Cliente:</strong> {{ venta.cliente || 'Sin cliente' }}</li>
                <li class="list-group-item"><strong>Vendedor:</strong> {{ venta.vendedor || 'Sin vendedor' }}</li>
                <li class="list-group-item"><strong>Juego:</strong> {{ venta.juego || 'Sin juego' }}</li>
                <li class="list-group-item"><strong>Forma de Pago:</strong> {{ venta.formadepago }}</li>
                <li class="list-group-item"><strong>Fecha de Compra:</strong> {{ venta.fecha_de_compra }}</li>
                <li class="list-group-item">
                    <strong>Creado el:</strong> {{ venta.created_at }}
                </li>
                <li class="list-group-item">
                    <strong>Última actualización:</strong> {{ venta.updated_at }}
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
