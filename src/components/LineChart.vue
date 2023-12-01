<script setup lang="ts">
import Highcharts from '@noction/vue-highcharts'
import { reactive, watch } from 'vue';

type Props = {
  data: any[] 
}

const props = defineProps<Props>()

const options = reactive({
  chart: {
    width: 600,
    height: 400,
    animation: false,
    events: {
      load: () => {
        console.log('loaded');
      },
      redraw: () => {
        console.log('redrawn');
      },
      render: () => {
        console.log('render')
      }
    }
  },
  plotOptions: {
    series: {
      animation: false
    }
  },
  title: {
      text: 'Logarithmic axis demo'
  },
  xAxis: {
      tickInterval: 1,
      type: 'logarithmic',
  },
  yAxis: {
      type: 'logarithmic',
      minorTickInterval: 0.1,
  },
  series: [{
      data: [],
      pointStart: 1
  }]
})


watch(props, () => {
  console.log('changed');

  // @ts-ignore
  options.series[0].data = props.data 
})

</script>

<template>
  <div>
    <Highcharts
      :options="options" 
    />
  </div>
</template>
