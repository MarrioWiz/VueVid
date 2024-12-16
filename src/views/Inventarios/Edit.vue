<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { show_alerta } from '../../functions'; // Importamos la función show_alerta

const router = useRouter();
const route = useRoute();

const form = ref({
    nombrevideojuego: '',
    genero: '',
    clasificacion: '',
    estudio: '',
    precio: '',
    imagen: null,
});

const previewImage = ref(null);
const errors = ref([]); // Para errores de validación

// Cargar datos existentes del inventario
const loadInventario = async () => {
    try {
        const response = await axios.get(`/api/inventarios/${route.params.id}`);
        form.value = { ...response.data.data, imagen: null };
    } catch (error) {
        console.error('Error al cargar el inventario:', error);
    }
};

// Manejar vista previa de imagen seleccionada
const handleFileChange = (event) => {
    const file = event.target.files[0];
    form.value.imagen = file;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => (previewImage.value = e.target.result);
        reader.readAsDataURL(file);
    }
};

// Actualizar inventario
const updateInventario = async () => {
    errors.value = [];
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
        if (key !== 'imagen' || form.value.imagen) {
            formData.append(key, form.value[key]);
        }
    });

    try {
        await axios.post(`/api/inventarios/${route.params.id}?_method=PUT`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        show_alerta('Inventario actualizado correctamente', 'success'); // Mensaje de éxito
        router.push('/inventarios'); // Redirigir
    } catch (error) {
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
        } else {
            console.error('Error al actualizar el inventario:', error);
        }
    }
};

onMounted(() => {
    loadInventario();
});
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Tarjeta de edición con temática de videojuegos -->
            <div class="card border-0 shadow-lg" style="background: linear-gradient(135deg, #6b0f1a, #b91372); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3 class="mb-0">Editar Inventario - Videojuego</h3>
                </div>
                <div class="card-body">
                    <!-- Mostrar errores -->
                    <div v-if="errors.length" class="alert alert-danger">
                        <ul>
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>

                    <!-- Formulario -->
                    <form @submit.prevent="updateInventario">
                        <!-- Nombre -->
                        <div class="mb-3">
                            <label for="nombrevideojuego" class="form-label fw-bold">Nombre del Videojuego</label>
                            <input id="nombrevideojuego" v-model="form.nombrevideojuego" type="text" class="form-control" required />
                        </div>
                        <!-- Género -->
                        <div class="mb-3">
                            <label for="genero" class="form-label fw-bold">Género</label>
                            <input id="genero" v-model="form.genero" type="text" class="form-control" required />
                        </div>
                        <!-- Clasificación -->
                        <div class="mb-3">
                            <label for="clasificacion" class="form-label fw-bold">Clasificación</label>
                            <input id="clasificacion" v-model="form.clasificacion" type="text" class="form-control" required />
                        </div>
                        <!-- Estudio -->
                        <div class="mb-3">
                            <label for="estudio" class="form-label fw-bold">Estudio</label>
                            <input id="estudio" v-model="form.estudio" type="text" class="form-control" required />
                        </div>
                        <!-- Precio -->
                        <div class="mb-3">
                            <label for="precio" class="form-label fw-bold">Precio</label>
                            <input id="precio" v-model="form.precio" type="number" class="form-control" required />
                        </div>
                        <!-- Imagen -->
                        <div class="mb-3">
                            <label for="imagen" class="form-label fw-bold">Imagen</label>
                            <input id="imagen" type="file" class="form-control" @change="handleFileChange" />
                        </div>
                        <!-- Vista Previa -->
                        <div v-if="previewImage" class="text-center mb-3">
                            <h5 class="text-warning">Vista Previa</h5>
                            <img :src="previewImage" alt="Vista previa" class="img-thumbnail border border-warning" style="max-width: 200px;" />
                        </div>
                        <!-- Botones -->
                        <button type="submit" class="btn btn-warning w-100 fw-bold">Actualizar</button>
                        <router-link to="/inventarios" class="btn btn-light w-100 mt-2 fw-bold">Cancelar</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.card-header {
    font-size: 1.2rem;
    letter-spacing: 1px;
}

.form-label {
    color: #ffc107; /* Color dorado */
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

.btn-light {
    color: #333;
    border: 1px solid #ccc;
    transition: 0.3s;
}

.btn-light:hover {
    background-color: #f8f9fa;
    border-color: #aaa;
}

.img-thumbnail {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
