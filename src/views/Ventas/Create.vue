<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { show_alerta } from '../../functions';

const router = useRouter();
const form = ref({
    cliente_id: '',
    vendedor_id: '',
    juego_id: '',
    formadepago: '',
    fecha_de_compra: '',
});

const clientes = ref([]);
const vendedors = ref([]);
const juegos = ref([]);
const errors = ref([]);

// Función para cargar los dropdowns de clientes, vendedores y juegos
const loadDropdownData = async () => {
    try {
        const [clientesResponse, vendedorsResponse, juegosResponse] = await Promise.all([
            axios.get('/api/clientes'),
            axios.get('/api/vendedors'),
            axios.get('/api/inventarios'),
        ]);

        // Verifica si existen datos y los asigna correctamente
        clientes.value = clientesResponse.data.data || clientesResponse.data || [];
        vendedors.value = vendedorsResponse.data.data || vendedorsResponse.data || [];
        juegos.value = juegosResponse.data.data || juegosResponse.data || [];
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
};

// Función para crear una venta
const createVenta = async () => {
    errors.value = [];
    try {
        await axios.post('/api/ventas', form.value);
        show_alerta('Venta creada exitosamente', 'success');
        router.push('/ventas');
    } catch (error) {
        errors.value = error.response.data.errors || [];
        console.error('Error al crear la venta:', error);
    }
};

onMounted(() => {
    loadDropdownData();
});
</script>

<template>
<div class="container mt-5">
    <div class="card">
        <div class="card-header bg-success text-white text-center">
            <h4>Crear Venta</h4>
        </div>
        <div class="card-body">
            <!-- Mostrar errores si existen -->
            <div v-if="errors.length" class="alert alert-danger">
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </div>

            <!-- Formulario para crear venta -->
            <form @submit.prevent="createVenta">
                <!-- Dropdown de Cliente -->
                <div class="mb-3">
                    <label>Cliente</label>
                    <select v-model="form.cliente_id" class="form-select" required>
                        <option value="" disabled>Seleccione un cliente</option>
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                            {{ cliente.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Dropdown de Vendedor -->
                <div class="mb-3">
                    <label>Vendedor</label>
                    <select v-model="form.vendedor_id" class="form-select" required>
                        <option value="" disabled>Seleccione un vendedor</option>
                        <option v-for="vendedor in vendedors" :key="vendedor.id" :value="vendedor.id">
                            {{ vendedor.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Dropdown de Juego -->
                <div class="mb-3">
                    <label>Juego</label>
                    <select v-model="form.juego_id" class="form-select" required>
                        <option value="" disabled>Seleccione un juego</option>
                        <option v-for="juego in juegos" :key="juego.id" :value="juego.id">
                            {{ juego.nombrevideojuego }}
                        </option>
                    </select>
                </div>

                <!-- Forma de Pago -->
                <div class="mb-3">
                    <label>Forma de Pago</label>
                    <input v-model="form.formadepago" type="text" class="form-control" required />
                </div>

                <!-- Fecha de Compra -->
                <div class="mb-3">
                    <label>Fecha de Compra</label>
                    <input v-model="form.fecha_de_compra" type="datetime-local" class="form-control" required />
                </div>

                <!-- Botón Guardar -->
                <button type="submit" class="btn btn-primary w-100">
                    Guardar
                </button>
            </form>
        </div>
    </div>
</div>
</template>
