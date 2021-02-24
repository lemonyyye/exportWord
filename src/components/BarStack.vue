<!--
/**
 * @description: 柱状图
 * @author: lemon
 * @date: 2021-02-22
 */
-->
<template>
  <div class="echarts-wrapper">
    <div :id="id" class="echarts-body" :style="styleObj"></div>
  </div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  export default {
    props: {
      id: {
        type: String,
        default: 'barChart'
      },
      width: {
        default: 300
      },
      height: {
        default: 300
      },
      option: {
        type: Object,
        require: true
      }
    },
    computed :{
      styleObj () {
        return {
          width: typeof (this.width) === 'number' ? this.width + 'px' : this.width,
          height: typeof (this.height) === 'number' ? this.height + 'px' : this.height
        }
      }
    },
    data () {
      return {
        myChart: null

      }
    },
    methods: {
      drawBar () {
        this.myChart.showLoading()
        this.myChart.setOption(this.option, true)
        this.myChart.hideLoading()
        window.addEventListener('resize', () => {
          this.myChart.resize()
        })
      },
      getDataURL () {
        return this.myChart.getDataURL({
          backgroundColor: '#fff'
        })
      }
    },
    mounted () {
      this.myChart = echarts.init(document.getElementById(this.id))
      this.drawBar()
    },
    watch: {
      option: {
        handler () {
          this.drawBar()
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .echarts-wrapper{margin: 0 auto;}
</style> -->
