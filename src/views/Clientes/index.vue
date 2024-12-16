<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { confirmation } from '../../functions';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

onMounted(() => {
    getClientes();
});

const clientes = ref([]);
const load = ref(false);

const getClientes = async () => {
    await axios.get('/api/clientes').then(
        response => (clientes.value = response.data)
    );
    load.value = true;
};

const deleteCliente = (id, nombre, correo, telefono, edad) => {
    confirmation(
        `Nombre: ${nombre}\nCorreo: ${correo}\nTeléfono: ${telefono}\nEdad: ${edad}`,
        ('/api/clientes/' + id),
        '/clientes'
    );
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6 text-center mb-4">
            <router-link :to="{ path: '/clientes/create' }" class="btn btn-dark shadow-lg" style="background: linear-gradient(90deg, #6b0f1a, #b91372); color: white; font-weight: bold; border: none;">
                <i class="fa-solid fa-circle-plus"></i> Añadir Cliente
            </router-link>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-10">
            <!-- Loading -->
            <div class="card border-0 shadow text-center" v-if="!load" style="background: linear-gradient(180deg, #2c2c54, #40407a); color: white;">
                <div class="card-body">
                    <img src="/loading.gif" alt="Cargando..." style="max-width: 100px;" />
                </div>
            </div>
            <div class="table-responsive" v-else>
                <table class="table shadow" style="background: linear-gradient(135deg, #40407a, #706fd3); color: white; border-radius: 10px; overflow: hidden;">
                    <thead style="background-color: #2c2c54; color: #f7d794;">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Edad</th>
                            <th>Editar</th>
                            <th>Ver</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cliente, i) in clientes" :key="cliente.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ cliente.nombre }}</td>
                            <td>{{ cliente.correo }}</td>
                            <td>{{ cliente.telefono }}</td>
                            <td>{{ cliente.edad }}</td>
                            <td>
                                <router-link :to="{ path: '/clientes/edit/' + cliente.id }" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="{ path: '/clientes/view/' + cliente.id }" class="btn btn-info">
                                    <i class="fa-solid fa-eye"></i>
                                </router-link>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deleteCliente(cliente.id, cliente.nombre, cliente.correo, cliente.telefono, cliente.edad)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
/* Botón añadir cliente */
.btn-dark {
    background-color: #6b0f1a;
    border: none;
    transition: transform 0.3s;
}

.btn-dark:hover {
    transform: scale(1.1);
    background-color: #b91372;
}

/* Tabla */
.table {
    margin-top: 20px;
    border-collapse: separate;
    border-spacing: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.table th {
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 15px;
}

.table td {
    padding: 15px;
    text-align: center;
    vertical-align: middle;
}

.table tbody tr:hover {
    background-color: #706fd3;
    color: white;
    cursor: pointer;
}

/* Botones */
.btn-warning {
    background-color: #f39c12;
    color: white;
    border: none;
    transition: 0.3s;
}

.btn-warning:hover {
    background-color: #e67e22;
}

.btn-info {
    background-color: #3498db;
    color: white;
    border: none;
    transition: 0.3s;
}

.btn-info:hover {
    background-color: #2980b9;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
    border: none;
    transition: 0.3s;
}

.btn-danger:hover {
    background-color: #c0392b;
}
</style>
