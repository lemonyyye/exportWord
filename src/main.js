import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入echarts基本模板
let echarts = require('echarts/lib/echarts')
Vue.prototype.$echarts = echarts
    // 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/gauge')
require('echarts/lib/chart/pie')
require('echarts/lib/component/grid')

new Vue({
    render: h => h(App),
}).$mount('#app')