<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { show_alerta } from '../../functions'; // Importamos la función show_alerta

const router = useRouter();
const form = ref({
    nombrevideojuego: '',
    genero: '',
    clasificacion: '',
    estudio: '',
    precio: '',
    imagen: null,
});
const previewImage = ref(null);

// Manejar vista previa de la imagen
const handleFileChange = (event) => {
    const file = event.target.files[0];
    form.value.imagen = file;
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => (previewImage.value = e.target.result);
        reader.readAsDataURL(file);
    } else {
        previewImage.value = null;
    }
};

// Crear un nuevo inventario
const createInventario = async () => {
    const formData = new FormData();
    Object.keys(form.value).forEach((key) => {
        formData.append(key, form.value[key]);
    });

    try {
        await axios.post('/api/inventarios', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        show_alerta('Inventario creado exitosamente', 'success');
        router.push('/inventarios'); // Redirigir al listado
    } catch (error) {
        console.error('Error al crear el inventario:', error);
    }
};
</script>

<template>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <!-- Tarjeta con temática de videojuegos -->
            <div class="card border-0 shadow-lg" style="background: linear-gradient(135deg, #6b0f1a, #b91372); color: white;">
                <div class="card-header text-center bg-dark text-white">
                    <h3 class="mb-0">Nuevo Inventario - Videojuego</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="createInventario">
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
                        <!-- Vista previa -->
                        <div v-if="previewImage" class="text-center mb-3">
                            <h5>Vista Previa</h5>
                            <img :src="previewImage" alt="Vista previa" class="img-thumbnail border border-warning" style="max-width: 200px;" />
                        </div>
                        <!-- Botones -->
                        <button type="submit" class="btn btn-success w-100 fw-bold">Guardar</button>
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

.btn-success {
    background-color: #28a745;
    border: none;
    transition: 0.3s;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-light {
    color: #333;
    border: 1px solid #ccc;
}

.img-thumbnail {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
