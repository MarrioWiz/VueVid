<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';

const ventas = ref([]);
const load = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const loadData = async (page = 1) => {
    try {
        const response = await axios.get(`/api/ventas?page=${page}`);
        ventas.value = response.data.data || response.data;
        lastPage.value = response.data.last_page || 1;
        currentPage.value = response.data.current_page || 1;

        load.value = true;
    } catch (error) {
        console.error('Error cargando ventas:', error);
    }
};

const deleteVenta = (id, cliente, vendedor, juego, formadepago) => {
    confirmation(
        `Cliente: ${cliente}\nVendedor: ${vendedor}\nJuego: ${juego}\nForma de Pago: ${formadepago}`,
        `/api/ventas/${id}`,
        '/ventas'
    );
};

onMounted(() => {
    loadData();
});
</script>

<template>
<div class="container mt-5">
    <div class="d-grid col-10 mx-auto mb-3">
        <router-link :to="{ path: '/ventas/create' }" class="btn btn-dark">
            <i class="fa-solid fa-circle-plus"></i> Agregar Venta
        </router-link>
    </div>
    <div v-if="!load" class="text-center">
        <img src="/loading.gif" alt="Cargando...">
    </div>
    <div v-else class="table-responsive">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Juego</th>
                    <th>Forma de Pago</th>
                    <th>Fecha de Compra</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(venta, i) in ventas" :key="venta.id">
                    <td>{{ (i+1) + (currentPage - 1) * 10 }}</td>
                    <td>{{ venta.cliente || 'Sin cliente' }}</td>
                    <td>{{ venta.vendedor || 'Sin vendedor' }}</td>
                    <td>{{ venta.juego || 'Sin juego' }}</td>
                    <td>{{ venta.formadepago }}</td>
                    <td>{{ venta.fecha_de_compra }}</td>
                    <td>
                        <router-link :to="{ path: `/ventas/edit/${venta.id}` }" class="btn btn-warning me-2">
                            Editar
                        </router-link>
                        <router-link :to="{ path: `/ventas/view/${venta.id}` }" class="btn btn-info me-2">
                            Ver
                        </router-link>
                        <button class="btn btn-danger" @click="deleteVenta(venta.id, venta.cliente, venta.vendedor, venta.juego, venta.formadepago)">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-secondary" :disabled="currentPage === 1" @click="loadData(currentPage - 1)">Anterior</button>
            <span>Página {{ currentPage }} de {{ lastPage }}</span>
            <button class="btn btn-secondary" :disabled="currentPage === lastPage" @click="loadData(currentPage + 1)">Siguiente</button>
        </div>
    </div>
</div>
</template>
