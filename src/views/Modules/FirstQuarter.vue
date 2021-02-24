<!--
/**
 * @description: 子组件-第一季度情况
 * @author: lemon
 * @date: 2021-1-28
 */
-->
<template>
    <div class="group-total-risk">
        <div class="first-title">（一）第一季度资金分布</div>
        <div class="second-title">1、资金分布主要集中在{{firstQuarter.mainArea}}领域</div>
        <p class="paragraph">
            管理创效步步登高。全年各项收入共计完成{{firstQuarter.totalNum}}万元，同比减少{{firstQuarter.decreaseNum}}万元；
            全年成本费用支出{{firstQuarter.expend}}万元；收支相抵赢利{{firstQuarter.profit}}万元
        </p>
        <BarStackChart id="barChart" ref="barChart" class="bar-chart"
            :option="barChartOption" width="100%" height="100%"></BarStackChart>
        <!-- 表格随便怼一个吧。。。 -->
        <a-table :data-source="tableData" :pagination="false" :bordered="true">
            <a-table-column key="firstName"  title="First Name" data-index="firstName" />
            <a-table-column key="lastName" title="Last Name" data-index="lastName" />
            <a-table-column key="age" title="Age" data-index="age" />
            <a-table-column key="address" title="Address" data-index="address" />
        </a-table>
    </div>
</template>
<script lang="ts">
    import { Table } from 'ant-design-vue'
    import BarStackChart from '../../components/BarStack.vue'
    export default {
        components: {
            BarStackChart,
            [Table.name]: Table,
            [Table.Column.name]: Table.Column
        },
        data() {
            return {
                firstQuarter: {
                    mainArea: '财政',
                    totalNum: 100,
                    decreaseNum: 8,
                    expend: 80,
                    profit: 10
                },
                barChartOption: {
                    grid: {
                        left: '5%',
                        right: '5%',
                        top: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['x1', 'x2', 'x3', 'x4'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    series: [
                        {
                            name: 'AA',
                            type: 'bar',
                            stack: 'total',
                            barWidth: '30%',
                            label: {
                                show: true,
                                color: '#fff',
                                fontSize: 24
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [30, 30, 31, 34],
                            itemStyle: {
                                color: '#FD6060'
                            },
                            animation: false
                        },
                        {
                            name: 'BB',
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                color: '#fff',
                                fontSize: 24
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [10, 12, 10, 13],
                            itemStyle: {
                                color: '#F8D823'
                            },
                            animation: false
                        },
                        {
                            name: 'CC',
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                color: '#fff',
                                fontSize: 24
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: [22, 12, 11, 20],
                            itemStyle: {
                                color: '#7ACF5F'
                            },
                            animation: false
                        }
                    ]
                },
                tableData: [],
            }
        },
        methods: {
            dealTable () {
                // 模拟获取数据
                this.tableData = [{
                    key: '1',
                    firstName: 'John',
                    lastName: 'Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    key: '2',
                    firstName: 'Jim',
                    lastName: 'Green',
                    age: 42,
                    address: 'London No. 1 Lake Park'
                },
                {
                    key: '3',
                    firstName: 'Joe',
                    lastName: 'Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park'
                }]
                // 通过xml代码修改word文档的样式 (不需要可以忽略)
                this.tableData.forEach(item => {
                    item.wordLastName = `<w:p>
                        <w:r><w:rPr><w:color w:val="${item.lastName}"/><w:highlight w:val="white"/></w:rPr><w:t>${item.lastName}</w:t></w:r>
                    </w:p>` // 这段代码是给lastName加上字体颜色跟背景颜色。可以新建个word文档弄上自己想要的样式，将word文档保存成xml文件,研究里面代码
                })
            }
        },
        created () {
            this.dealTable()
        },
        mounted () {
            let _this = this
            this.$emit('returnData', {
                firstQuarter: _this.firstQuarter,
                barChart: _this.$refs.barChart.getDataURL(),
                tableData: _this.tableData
            })
        }
    }
</script>
<style lang="less" scoped>
    .bar-chart {
        height: 400px;
        width: 90%;
    }
</style>