<script setup lang="ts">
import Highcharts from '@noction/vue-highcharts'
import { reactive } from 'vue'

const options = reactive({
  series: [{
    data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
  }]
})
</script>

<template>
  <div class="page">
    <highcharts
      :options="options" 
    />
  </div>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
