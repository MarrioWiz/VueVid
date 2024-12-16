<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { show_alerta } from '../../functions'; // Función para mostrar alertas

const router = useRouter();

// Estructura del formulario
const form = ref({
    venta_id: '',
    motivo: '',
    estadodeljuego: '',
    juego_id: '',
});

const ventas = ref([]);          // Lista de ventas para el dropdown
const inventarios = ref([]);     // Lista de juegos para el dropdown
const errors = ref([]);          // Errores de validación

const loadDropdownData = async () => {
    try {
        // Obtener ventas e inventarios en paralelo
        const [ventasResponse, inventariosResponse] = await Promise.all([
            axios.get('/api/ventas'),
            axios.get('/api/inventarios'),
        ]);

        // Asignar los datos correctamente
        ventas.value = ventasResponse.data.data || ventasResponse.data;
        inventarios.value = inventariosResponse.data.data || inventariosResponse.data;
    } catch (error) {
        console.error('Error al cargar ventas o juegos:', error);
    }
};

// Función para crear una devolución
const createDevolucion = async () => {
    errors.value = []; // Reiniciar errores
    try {
        // Enviar datos del formulario a la API
        await axios.post('/api/devolucions', form.value);
        show_alerta('Devolución creada exitosamente', 'success');
        router.push('/devolucions'); // Redirigir al listado de devoluciones
    } catch (error) {
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
        } else {
            console.error('Error al crear la devolución:', error);
        }
    }
};

// Cargar los datos de ventas e inventarios al montar el componente
onMounted(() => {
    loadDropdownData();
});
</script>

<template>
<div class="container mt-5">
    <div class="row">
        <!-- Formulario para crear una devolución -->
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header text-center bg-success text-white">
                    <h4>Crear Devolución</h4>
                </div>
                <div class="card-body">
                    <!-- Mostrar errores de validación -->
                    <div v-if="errors.length" class="alert alert-danger">
                        <ul>
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>

                    <!-- Formulario -->
                    <form @submit.prevent="createDevolucion">
                        <div class="mb-3">
                            <label for="venta_id" class="form-label">Venta</label>
                            <select id="venta_id" v-model="form.venta_id" class="form-select" required>
                                <option value="" disabled>Seleccione una venta</option>
                                <option v-for="venta in ventas" :key="venta.id" :value="venta.id">
                                    Venta #{{ venta.id }} - {{ venta.formadepago }} - {{ venta.fecha_de_compra }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="motivo" class="form-label">Motivo</label>
                            <textarea id="motivo" v-model="form.motivo" class="form-control" rows="3" required></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="estadodeljuego" class="form-label">Estado del Juego</label>
                            <input type="text" id="estadodeljuego" v-model="form.estadodeljuego" class="form-control" placeholder="Ejemplo: nuevo, usado, defectuoso" required />
                        </div>

                        <div class="mb-3">
                            <label for="juego_id" class="form-label">Juego</label>
                            <select id="juego_id" v-model="form.juego_id" class="form-select" required>
                                <option value="" disabled>Seleccione un juego</option>
                                <option v-for="juego in inventarios" :key="juego.id" :value="juego.id">
                                    {{ juego.nombrevideojuego }} - {{ juego.precio }} USD
                                </option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary w-100">Guardar</button>
                        <router-link to="/devolucions" class="btn btn-secondary w-100 mt-2">Cancelar</router-link>
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
    font-weight: bold;
}
</style>
