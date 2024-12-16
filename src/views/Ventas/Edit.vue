<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { show_alerta } from '../../functions';

const router = useRouter();
const route = useRoute();

// Variables reactivas
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

// Cargar dropdowns (clientes, vendedores, juegos)
const loadDropdownData = async () => {
    try {
        const [clientesResponse, vendedorsResponse, juegosResponse] = await Promise.all([
            axios.get('/api/clientes'),
            axios.get('/api/vendedors'),
            axios.get('/api/inventarios'),
        ]);

        clientes.value = clientesResponse.data.data || clientesResponse.data || [];
        vendedors.value = vendedorsResponse.data.data || vendedorsResponse.data || [];
        juegos.value = juegosResponse.data.data || juegosResponse.data || [];
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

// Cargar datos de la venta específica
const loadVentaData = async () => {
    try {
        const response = await axios.get(`/api/ventas/${route.params.id}`);
        const data = response.data.data;

        // Asignar valores al formulario
        form.value = {
            cliente_id: data.cliente_id,
            vendedor_id: data.vendedor_id,
            juego_id: data.juego_id,
            formadepago: data.formadepago,
            fecha_de_compra: data.fecha_de_compra,
        };
    } catch (error) {
        console.error('Error al cargar la venta:', error);
    }
};

// Actualizar la venta
const updateVenta = async () => {
    errors.value = [];
    try {
        await axios.put(`/api/ventas/${route.params.id}`, form.value);
        show_alerta('Venta actualizada exitosamente', 'success');
        router.push('/ventas');
    } catch (error) {
        errors.value = error.response.data.errors || [];
        console.error('Error al actualizar la venta:', error);
    }
};

// Cargar datos al montar el componente
onMounted(() => {
    loadDropdownData();
    loadVentaData();
});
</script>

---

## **Template de `Edit.vue`**

```vue
<template>
<div class="container mt-5">
    <div class="card">
        <div class="card-header bg-warning text-white text-center">
            <h4>Editar Venta</h4>
        </div>
        <div class="card-body">
            <!-- Mostrar errores si existen -->
            <div v-if="errors.length" class="alert alert-danger">
                <ul>
                    <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
            </div>

            <!-- Formulario de edición -->
            <form @submit.prevent="updateVenta">
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

                <!-- Botón de Actualización -->
                <button type="submit" class="btn btn-warning w-100">Actualizar</button>
            </form>
        </div>
    </div>
</div>
</template>
