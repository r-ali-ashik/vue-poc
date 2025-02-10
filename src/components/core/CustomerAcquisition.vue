<template>
  <v-card>
    <v-card-title>Customer Acquisition</v-card-title>
    <v-card-text>
      <canvas ref="chartCanvas" />
    </v-card-text>
    <v-card-actions class="justify-end">
      <div class="text-h6 font-weight-bold">
        5.44%
      </div>
      <v-chip
        color="green"
        class="ml-2"
      >
        +2.6%
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Customer Acquisition',
          data: [90, 60, 40, 70, 50, 90, 45, 50, 55, 65, 60, 70],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            suggestedMin: 40,
            suggestedMax: 100,
          },
        },
      },
    });
  }
});
</script>

<style scoped>
.v-card {
  padding: 16px;
}
canvas {
  width: 100% !important;
  height: 300px !important;
}
</style>
