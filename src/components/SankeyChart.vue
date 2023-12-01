<script setup lang="ts">
import Highcharts from '@noction/vue-highcharts'

type Props = {
  data: number[]
}

const { data } = defineProps<Props>()

const options = {
  chart: {
    width: 600,
    height: 400,
    animation: false
  },
  title: {
      text: 'Estimated US Energy Consumption in 2017'
  },
  plotOptions: {
    series: {
      animation: false
    }
  },
  series: [{
      keys: ['from', 'to', 'weight'],

      nodes: [
          {
              id: 'Electricity & Heat',
              color: '#ffa500',
              offset: -110
          },
          {
              id: 'Residential',
              color: '#74ffe7',
              column: 2,
              offset: 50
          },
          {
              id: 'Commercial',
              color: '#8cff74',
              column: 2,
              offset: 50
          },
          {
              id: 'Industrial',
              color: '#ff8da1',
              column: 2,
              offset: 50
          },
          {
              id: 'Transportation',
              color: '#f4c0ff',
              column: 2,
              offset: 50
          },
          {
              id: 'Rejected Energy',
              color: '#e6e6e6',
              column: 3,
              offset: -30
          },
          {
              id: 'Energy Services',
              color: '#F9E79F',
              column: 3
          },
          {
              id: 'Solar',
              color: '#009c00'
          },
          {
              id: 'Nuclear',
              color: '#1a8dff'
          },
          {
              id: 'Hydro',
              color: '#009c00'
          },
          {
              id: 'Wind',
              color: '#009c00'
          },
          {
              id: 'Geothermal',
              color: '#009c00'
          },
          {
              id: 'Natural Gas',
              color: '#1a8dff'
          },
          {
              id: 'Biomass',
              color: '#009c00'
          },
          {
              id: 'Coal',
              color: '#989898'
          },
          {
              id: 'Petroleum',
              color: '#989898',
              offset: -1
          }
      ],

      data: data,
      type: 'sankey',
      name: 'Sankey demo series'
  }]
}
</script>

<template>
  <div>
    <Highcharts
      :options="options" 
    />
    <slot/>
  </div>
</template>
