<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const devolucions = ref([]);
const load = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const loadData = async (page = 1) => {
    try {
        const response = await axios.get(`/api/devolucions?page=${page}`);
        devolucions.value = response.data.data || response.data;
        lastPage.value = response.data.last_page || 1;
        currentPage.value = response.data.current_page || 1;

        load.value = true;
    } catch (error) {
        console.error('Error cargando devoluciones:', error);
    }
};

const deleteDevolucion = (id, motivo, estadodeljuego, venta, juego) => {
    confirmation(
        `Motivo: ${motivo}\nEstado del Juego: ${estadodeljuego}\nVenta: ${venta}\nJuego: ${juego}`,
        `/api/devolucions/${id}`,
        '/devolucions'
    );
};

onMounted(() => {
    loadData();
});
</script>

<template>
<div class="container mt-5">
    <div class="d-grid col-10 mx-auto mb-3">
        <router-link :to="{ path: '/devolucions/create' }" class="btn btn-dark">
            <i class="fa-solid fa-circle-plus"></i> Agregar Devolución
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
                    <th>Venta</th>
                    <th>Motivo</th>
                    <th>Estado del Juego</th>
                    <th>Juego</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(devolucion, i) in devolucions" :key="devolucion.id">
                    <td>{{ (i+1) + (currentPage - 1) * 10 }}</td>
                    <td>{{ devolucion.venta || 'Sin venta' }}</td>
                    <td>{{ devolucion.motivo }}</td>
                    <td>{{ devolucion.estadodeljuego }}</td>
                    <td>{{ devolucion.juego || 'Sin juego' }}</td>
                    <td>
                        <router-link :to="{ path: `/devolucions/edit/${devolucion.id}` }" class="btn btn-warning">Editar</router-link>
                        <router-link :to="{ path: `/devolucions/view/${devolucion.id}` }" class="btn btn-info">Ver</router-link>
                        <button class="btn btn-danger" @click="deleteDevolucion(devolucion.id, devolucion.motivo, devolucion.estadodeljuego, devolucion.venta, devolucion.juego)">Eliminar</button>
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
