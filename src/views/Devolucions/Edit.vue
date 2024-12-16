<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { show_alerta } from '../../functions';

const router = useRouter();
const route = useRoute();

// Formulario de edición
const form = ref({
    venta_id: '',
    motivo: '',
    estadodeljuego: '',
    juego_id: '',
});

const ventas = ref([]);        // Lista de ventas para dropdown
const inventarios = ref([]);   // Lista de juegos para dropdown
const errors = ref([]);        // Errores de validación

// Cargar datos para los dropdowns
const loadDropdownData = async () => {
    try {
        const [ventasResponse, inventariosResponse] = await Promise.all([
            axios.get('/api/ventas'),
            axios.get('/api/inventarios'),
        ]);

        ventas.value = ventasResponse.data.data || ventasResponse.data;
        inventarios.value = inventariosResponse.data.data || inventariosResponse.data;
    } catch (error) {
        console.error('Error al cargar ventas o inventarios:', error);
    }
};

// Cargar datos existentes de la devolución
const loadDevolucionData = async () => {
    try {
        const response = await axios.get(`/api/devolucions/${route.params.id}`);
        const data = response.data.data;

        form.value = {
            venta_id: data.venta_id || '',
            motivo: data.motivo || '',
            estadodeljuego: data.estadodeljuego || '',
            juego_id: data.juego_id || '',
        };
    } catch (error) {
        console.error('Error al cargar la devolución:', error);
    }
};

// Actualizar devolución
const updateDevolucion = async () => {
    errors.value = []; // Reiniciar errores
    try {
        await axios.put(`/api/devolucions/${route.params.id}`, form.value);
        show_alerta('Devolución actualizada exitosamente', 'success');
        router.push('/devolucions'); // Redirigir al listado
    } catch (error) {
        if (error.response && error.response.data.errors) {
            errors.value = error.response.data.errors;
        } else {
            console.error('Error al actualizar la devolución:', error);
        }
    }
};

// Cargar datos al montar el componente
onMounted(() => {
    loadDropdownData();
    loadDevolucionData();
});
</script>

<template>
<div class="container mt-5">
    <div class="row">
        <!-- Formulario de edición -->
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header text-center bg-warning text-white">
                    <h4>Editar Devolución</h4>
                </div>
                <div class="card-body">
                    <!-- Mostrar errores de validación -->
                    <div v-if="errors.length" class="alert alert-danger">
                        <ul>
                            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>

                    <!-- Formulario -->
                    <form @submit.prevent="updateDevolucion">
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

                        <button type="submit" class="btn btn-warning w-100">Actualizar</button>
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
