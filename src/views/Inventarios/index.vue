<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const inventarios = ref([]);
const load = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);

const loadInventarios = async (page = 1) => {
    try {
        const response = await axios.get(`/api/inventarios?page=${page}`);
        inventarios.value = response.data.data || response.data;
        currentPage.value = response.data.current_page || 1;
        lastPage.value = response.data.last_page || 1;
        load.value = true;
    } catch (error) {
        console.error('Error al cargar inventarios:', error);
    }
};

const deleteInventarios = (id, nombrevideojuego, genero, clasificacion, estudio, precio) => {
    confirmation(
        `Nombre del videojuego: ${nombrevideojuego}\nGénero: ${genero}\nClasificación: ${clasificacion}\nEstudio: ${estudio}\nPrecio: ${precio}`,
        ('/api/inventarios/' + id),
        '/inventarios'
    );
};

onMounted(() => {
    loadInventarios();
});
</script>

<template>
<div class="container mt-5">
    <div class="row mb-3">
        <div class="col-md-4 offset-md-4 text-center">
            <router-link :to="{ path: '/inventarios/create' }" class="btn btn-dark btn-lg" style="background: linear-gradient(90deg, #6b0f1a, #b91372); color: white; font-weight: bold;">
                <i class="fa-solid fa-circle-plus"></i> Añadir Videojuego
            </router-link>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <!-- Loader -->
            <div class="card text-center border-0" v-if="!load" style="background-color: #212529; color: #fff;">
                <div class="card-body">
                    <img src="/loading.gif" alt="Cargando..." />
                    <p class="mt-3">Cargando inventarios...</p>
                </div>
            </div>
            <!-- Tabla -->
            <div class="table-responsive" v-else>
                <table class="table text-center table-bordered shadow-sm" style="background: #212529; color: #fff; border-radius: 10px;">
                    <thead style="background-color: #6b0f1a; color: #ffc107;">
                        <tr>
                            <th>#</th>
                            <th>Nombre del Videojuego</th>
                            <th>Género</th>
                            <th>Clasificación</th>
                            <th>Estudio</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Ver</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in inventarios" :key="item.id" style="background: #343a40;">
                            <td class="align-middle">{{ (i+1) + (currentPage - 1) * 10 }}</td>
                            <td class="align-middle">{{ item.nombrevideojuego }}</td>
                            <td class="align-middle">{{ item.genero }}</td>
                            <td class="align-middle">{{ item.clasificacion }}</td>
                            <td class="align-middle">{{ item.estudio }}</td>
                            <td class="align-middle">{{ item.precio }}</td>
                            <td class="align-middle">
                                <img :src="`https://apig.miguelangel.istigen23.com/${item.imagen}`" alt="Imagen" class="img-thumbnail" style="width: 80px; height: auto; border: 2px solid #ffc107; border-radius: 5px;">
                            </td>
                            <td class="align-middle">
                                <router-link :to="{ path: '/inventarios/edit/' + item.id }" class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                            </td>
                            <td class="align-middle">
                                <router-link :to="{ path: '/inventarios/view/' + item.id }" class="btn btn-info btn-sm">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td class="align-middle">
                                <button class="btn btn-danger btn-sm" @click="deleteInventarios(item.id, item.nombrevideojuego, item.genero, item.clasificacion, item.estudio, item.precio)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- Paginación -->
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <button class="btn btn-secondary" :disabled="currentPage === 1" @click="loadInventarios(currentPage - 1)">
                        Anterior
                    </button>
                    <span>Página {{ currentPage }} de {{ lastPage }}</span>
                    <button class="btn btn-secondary" :disabled="currentPage === lastPage" @click="loadInventarios(currentPage + 1)">
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.table thead th {
    font-size: 1.1rem;
    font-weight: bold;
}

.table tbody tr:hover {
    background-color: #495057 !important;
    color: #ffc107;
    transition: background-color 0.3s;
}

.btn-warning,
.btn-info,
.btn-danger {
    transition: 0.3s;
}

.btn-warning:hover {
    background-color: #e0a800;
    color: #fff;
}

.btn-info:hover {
    background-color: #17a2b8;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c82333;
    color: #fff;
}
</style>
