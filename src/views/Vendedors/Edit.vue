<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const route = useRoute();
const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const form = ref({ id: '', nombre: '', correo: '', telefono: '' });
const id = ref(route.params.id);

onMounted(() => { getVendedors(); });

const getVendedors = async () => {
    await axios.get('/api/vendedors/' + id.value).then(response => {
        const item = response.data.data; // Accede a la propiedad `data`
        form.value.nombre = item.nombre;
        form.value.correo = item.correo;
        form.value.telefono = item.telefono;
    });
};

const save = () => {
    sendRequest('PUT', form.value, ('/api/vendedors/' + id.value), '/vendedors');
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg border-0" style="background: linear-gradient(135deg, #40407a, #706fd3); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3>Editar Vendedor</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="save">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-secondary text-white"><i class="fa-solid fa-user"></i></span>
                            <input autofocus type="text" v-model="form.nombre" placeholder="Nombre" class="form-control border-0" style="background: #f7d794;" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-secondary text-white"><i class="fa-solid fa-envelope"></i></span>
                            <input type="email" v-model="form.correo" placeholder="Correo" class="form-control border-0" style="background: #f7d794;" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-secondary text-white"><i class="fa-solid fa-phone"></i></span>
                            <input type="tel" v-model="form.telefono" placeholder="Teléfono" class="form-control border-0" style="background: #f7d794;" required>
                        </div>
                        <div class="d-grid mx-auto">
                            <button class="btn btn-warning shadow-sm"><i class="fa-solid fa-save"></i> Guardar</button>
                        </div>
                    </form>
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
}

/* Botón guardar */
.btn-warning {
    background-color: #f39c12;
    border: none;
    color: white;
    font-weight: bold;
    transition: 0.3s;
}

.btn-warning:hover {
    background-color: #e67e22;
}

/* Campos de entrada */
.input-group-text {
    border-radius: 0 5px 5px 0;
}

.input-group input {
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Fondo del formulario */
.card-body {
    background: linear-gradient(135deg, #f1f2f6, #dcdde1);
    padding: 20px;
    border-radius: 10px;
}
</style>
