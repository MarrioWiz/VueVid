<script setup>
import { ref, nextTick } from 'vue';
import { show_alerta, sendRequest } from '../../functions';
import { useAuthStore } from '../../stores/auth';
import axios from 'axios';

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

const form = ref({ nombre: '', correo: '', telefono: '' });
const nombreInput = ref('');
const correoInput = ref(null);
const telefonoInput = ref(null);

const save = () => {
    sendRequest('POST', form.value, '/api/vendedors', '/vendedors');
    form.value.nombre = '';
    form.value.correo = '';
    form.value.telefono = '';
    nextTick(() => nombreInput.value.focus());
    nextTick(() => correoInput.value.focus());
    nextTick(() => telefonoInput.value.focus());
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg border-0" style="background: linear-gradient(135deg, #ff6b6b, #ff9f43); color: white;">
                <div class="card-header text-center bg-danger text-white">
                    <h3>Registrar Vendedor</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="save">
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark text-white"><i class="fa-solid fa-user"></i></span>
                            <input autofocus type="text" v-model="form.nombre" placeholder="Nombre" class="form-control border-0" style="background: #f8a5c2;" required ref="nombreInput">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark text-white"><i class="fa-solid fa-envelope"></i></span>
                            <input type="email" v-model="form.correo" placeholder="Correo" class="form-control border-0" style="background: #f8a5c2;" required ref="correoInput">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text bg-dark text-white"><i class="fa-solid fa-phone"></i></span>
                            <input type="tel" v-model="form.telefono" placeholder="Teléfono" class="form-control border-0" style="background: #f8a5c2;" required ref="telefonoInput">
                        </div>
                        <div class="d-grid mx-auto">
                            <button class="btn btn-danger text-white shadow-sm"><i class="fa-solid fa-save"></i> Guardar</button>
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
.btn-danger {
    background-color: #e74c3c;
    border: none;
    color: white;
    font-weight: bold;
    transition: 0.3s;
}

.btn-danger:hover {
    background-color: #c0392b;
}

/* Campos de entrada */
.input-group-text {
    border-radius: 5px 0 0 5px;
}

.input-group input {
    border-radius: 0 5px 5px 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Fondo del formulario */
.card-body {
    background: linear-gradient(135deg, #f6e58d, #ffbe76);
    padding: 20px;
    border-radius: 10px;
}
</style>
