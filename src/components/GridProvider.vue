<script setup lang="ts">
import { ref } from 'vue';
import LineChart from './LineChart.vue';

const data = ref([])

const fakeDb = {
  lineChart: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  sankey: [
    ['Solar', 'Electricity & Heat', 0.48],
    ['Nuclear', 'Electricity & Heat', 8.42],
    ['Hydro', 'Electricity & Heat', 2.75],
    ['Wind', 'Electricity & Heat', 2.35],
    ['Geothermal', 'Electricity & Heat', 0.15],
    ['Natural Gas', 'Electricity & Heat', 9.54],
    ['Coal', 'Electricity & Heat', 12.7],
    ['Biomass', 'Electricity & Heat', 0.52],
    ['Petroleum', 'Electricity & Heat', 0.21],

    ['Electricity & Heat', 'Residential', 4.7],
    ['Solar', 'Residential', 0.19],
    ['Geothermal', 'Residential', 0.04],
    ['Natural Gas', 'Residential', 4.58],
    ['Biomass', 'Residential', 0.33],
    ['Petroleum', 'Residential', 0.88],

    ['Electricity & Heat', 'Commercial', 4.6],
    ['Solar', 'Commercial', 0.08],
    ['Geothermal', 'Commercial', 0.02],
    ['Natural Gas', 'Commercial', 3.29],
    ['Coal', 'Commercial', 0.02],
    ['Biomass', 'Commercial', 0.16],
    ['Petroleum', 'Commercial', 0.83],

    ['Electricity & Heat', 'Industrial', 3.23],
    ['Solar', 'Industrial', 0.02],
    ['Hydro', 'Industrial', 0.01],
    ['Natural Gas', 'Industrial', 9.84],
    ['Coal', 'Industrial', 1.24],
    ['Biomass', 'Industrial', 2.48],
    ['Petroleum', 'Industrial', 8.38],

    ['Electricity & Heat', 'Transportation', 0.03],
    ['Natural Gas', 'Transportation', 0.76],
    ['Biomass', 'Transportation', 1.43],
    ['Petroleum', 'Transportation', 25.9],

    ['Electricity & Heat', 'Rejected Energy', 24.7],
    ['Residential', 'Rejected Energy', 3.75],
    ['Commercial', 'Rejected Energy', 3.15],
    ['Industrial', 'Rejected Energy', 12.9],
    ['Transportation', 'Rejected Energy', 22.2],

    ['Residential', 'Energy Services', 6.97],
    ['Commercial', 'Energy Services', 5.84],
    ['Industrial', 'Energy Services', 12.4],
    ['Transportation', 'Energy Services', 5.91]]
}

const fakeFetch = (chart: 'lineChart' | 'sankey') => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(fakeDb[chart])    
    }, 1000)
  })
}

  // @ts-ignore
  fakeFetch('lineChart')
    // @ts-ignore
    .then(res => { 
      console.log('here');
      console.log(res);
      
      // @ts-ignore
      data.value = res
     })
    .catch(() => { console.log('lol')})

</script>

<template>
  <div>
    <line-chart
      :data="data" 
    />
  </div>
</template>
