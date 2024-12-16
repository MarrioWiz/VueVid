<script setup>
import { ref, onMounted } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const authStore = useAuthStore();
axios.defaults.headers.common['Authorization'] = 'Bearer ' + authStore.authToken;

// Gráfica de barras
const vendedorLabels = ref([]); // Etiquetas para vendedores
const ventasCounts = ref([]); // Cantidad de ventas por vendedor
const chartDataBar = ref([]);
const chartOptionsBar = ref([]);

// Gráfica circular
const productoLabels = ref([]); // Etiquetas para productos
const productoVentas = ref([]); // Cantidad de ventas por producto
const chartDataPie = ref([]);
const chartOptionsPie = ref([]);

const loadedBar = ref(false);
const loadedPie = ref(false);

onMounted(async () => {
    try {
        // Obtén datos de ventas
        const response = await axios.get('/api/ventas');
        const ventas = response.data.data;

        // Gráfica de barras: Agrupa ventas por vendedor
        const vendedorVentas = {};
        const productoAggregates = {};

        ventas.forEach((venta) => {
            const vendedor = venta.vendedor;
            const producto = venta.producto;

            // Agrupación por vendedor
            vendedorVentas[vendedor] = (vendedorVentas[vendedor] || 0) + 1;

            // Agrupación por producto
            productoAggregates[producto] = (productoAggregates[producto] || 0) + 1;
        });

        // Prepara datos para la gráfica de barras
        Object.entries(vendedorVentas).forEach(([vendedor, count]) => {
            vendedorLabels.value.push(vendedor);
            ventasCounts.value.push(count);
        });

        chartOptionsBar.value = { responsive: true };
        chartDataBar.value = {
            labels: vendedorLabels.value,
            datasets: [
                {
                    label: 'Cantidad de Ventas por Vendedor',
                    data: ventasCounts.value,
                    backgroundColor: vendedorLabels.value.map(() =>
                        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
                    ),
                },
            ],
        };
        loadedBar.value = true;

        // Prepara datos para la gráfica circular
        Object.entries(productoAggregates).forEach(([producto, count]) => {
            productoLabels.value.push(producto);
            productoVentas.value.push(count);
        });

        chartOptionsPie.value = { responsive: true };
        chartDataPie.value = {
            labels: productoLabels.value,
            datasets: [
                {
                    label: 'Productos Más Vendidos',
                    data: productoVentas.value,
                    backgroundColor: productoLabels.value.map(() =>
                        `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
                    ),
                },
            ],
        };
        loadedPie.value = true;

    } catch (error) {
        console.error('Error cargando datos de ventas:', error);
    }
});
</script>

<template>
    <div class="row">
        <!-- Gráfica de barras -->
        <div class="col-md-6 offset-md-3">
            <div style="height: 300px; width: 100%;">
                <Bar v-if="loadedBar" :data="chartDataBar" :options="chartOptionsBar"></Bar>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <!-- Gráfica circular -->
        <div class="col-md-4 offset-md-4">
            <div style="height: 400px; width: 400px; margin: auto;">
                <Pie v-if="loadedPie" :data="chartDataPie" :options="chartOptionsPie"></Pie>
            </div>
        </div>
    </div>
</template>
