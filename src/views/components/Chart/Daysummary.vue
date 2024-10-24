<template>
    <div class='bg-summary agp-cont-main'>
        <div class='summary-charts' >
            <t-chart
                style="width: 100%;height:200px;"
                :option="options"
                :init-options="initOptions"
                theme="tduck-echarts-theme"
            />
        </div>
         <div class='summary-chart' >
            <t-chart
                style="width: 100%;height:200px;"
                :option="option"
                :init-options="initOptions"
                theme="tduck-echarts-theme"
            />
        </div>
    </div>
</template>
<script>
import TChart from '@/views/components/TChart'
import { GlucoseUtils } from "@/utils/algorithm/Glucose";
export default {
    data(){
        return{
            initOptions: {
                renderer: 'svg'
            },
            options:{
                axisPointer:{
                    triggerEmphasis:false
                },
                grid:[{
                    left:145,
                    top:40,
                    bottom:20,
                    right:90,
                    show:false,
                    containLabel :false
                },{
                    left:100,
                    top:40,
                    bottom:20,
                    right:50,
                    show:false,
                    containLabel :false
                }],
                xAxis: [
                    {
                        type: 'category',
                        gridIndex:0,
                        name:'{a|TIR}',
                        nameLocation:'start',
                        nameTextStyle:{
                            color:'#666',
                            fontSize:18,
                            padding:[30,0,0,0],
                            rich:{
                                a:{
                                    color:'#666',
                                    fontSize:18,
                                    padding:[30,0,0,0]
                                }
                            }
                        },
                        nameGap:86,
                        position:'top',
                        data: [],
                        boundaryGap:false,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine:{
                            show:false,
                            onZero:false
                        },
                        axisLabel:{
                            show:false
                        },
                        axisTick:{
                             show:false
                        }
                    },
                    {
                        type: 'category',
                        gridIndex:1,
                        data: [],
                        boundaryGap:false,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine:{
                            show:false,
                            onZero:false
                        },
                        axisLabel:{
                            show:false
                        },
                        axisTick:{
                             show:false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex:0,
                        name: 'TIR',
                        nameLocation:'start',
                        show:false,
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                    {
                        type: 'value',
                        gridIndex:1,
                        name: 'TIR',
                        nameLocation:'start',
                        show:false,
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    }
                ],
                series: [
                    {
                        name: 'TIR',
                        type: 'line',
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + ' %';
                            }
                        },
                        lineStyle:{
                            color:'#ccc',
                        },
                        itemStyle:{
                            color:(val)=>{
                                return val.value>=70?"#48A0DC":"#F43F31"
                            }
                        },
                        symbolSize:13,
                        data: [],
                        emphasis:{
                            disabled:true
                        }, 
                    },{
                        name: 'TIR',
                        type: 'line',
                        xAxisIndex:1,
                        yAxisIndex:1,
                        emphasis:{
                            disabled:true
                        }, 
                        markArea:{
                            data:[
                                [{
                                yAxis:70
                                },
                                {   
                                yAxis:100
                                }]
                            ],
                            itemStyle:{
                                    color:'rgba(72, 160, 220, 0.2)'
                            }
                        },
                        markLine:{
                            symbol: 'none',
                            data:[{
                                yAxis:70,
                                lineStyle: {
                                    width: 0,
                                },
                                label:{
                                    show:true,
                                    formatter:'{c}%',
                                    position:'end',
                                    distance:10,
                                    fontSize:16,
                                    color:'#666',

                                }
                            } ,
                            {
                                yAxis:100,
                                lineStyle: {
                                    width: 0,
                                },
                                label:{
                                    show:true,
                                    formatter:'{c}%',
                                    position:'end',
                                    fontSize:16,
                                    distance:10,
                                    color:'#666'
                                }
                            }]
                        }
                    },
                ]
            },
            option:{
                axisPointer:{
                    triggerEmphasis:false
                },
                grid:[{
                    left:145,
                    top:10,
                    bottom:30,
                    right:90,
                    show:false,
                    containLabel :false
                }],
                xAxis: [
                    {
                        type: 'category',
                        name:'Mean   \nGlucose',
                        nameLocation:'start',
                        nameTruncate:{
                            maxWidth:80
                        },
                        nameTextStyle:{
                            color:'#666',
                            fontSize:20,
                            width:80,
                            overflow:'breakAll',
                            verticalAlign:'bottom',
                        },
                        nameGap:56,
                        data: [],
                        boundaryGap:false,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel:{
                            fontSize:20,
                            color:'#666',
                        },
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                             show:false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Mean Glucose',
                        nameLocation:'end',
                        nameGap:40,
                        min: 0,
                        max:18 ,
                        show:false,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Mean Glucose',
                        type: 'bar',
                        barMaxWidth:30,
                        legendHoverLine:false,
                        tooltip: {
                            valueFormatter: function (value) {
                            return value + '份';
                            }
                        },
                        itemStyle:{
                            color:'#e5e5e5'
                        },
                        label:{
                            show:true,
                            distance:1,
                            color:'#000',
                            fontWeight:600,
                            fontSize:20,
                            position:'top'
                        },
                        data: [],
                        emphasis:{
                            disabled:true
                        }
                    }
                ]
            },
        }
    },
    props:{
        dataList:{
            type:Array
        }
    },
    computed:{
    },
    components: {
        TChart
    },
     mounted(){
        this.readerIng(this.dataList)
      
    },
    methods:{
         // 渲染血糖总结图表
        readerIng(data){
            let list =  _.cloneDeep(data)
            let unit = list[0].unit
            let avgList = []
            let xData = []
            let tir = []
            let max = null
            list.forEach(item=>{
                let avg =_.compact(item.resultValue).length>0?GlucoseUtils.calculateMeanCvGmi(_.compact(item.resultValue)).mean:null
                xData.push(item.day)
                avgList.push(unit=='mg/dL'? Math.round(avg):GlucoseUtils.mgdlToMmol(avg)) //平均值
                tir.push({value:item.tir,label:{
                    'show':true,
                    'distance':5,
                    'color':'#000',
                    'fontSize':20,
                    'fontWeight':600,
                    'formatter':'{c}%',
                    'position':'top'
                }})
                max = item.max
            })
            // this.option.tooltip = {
            //         show:true,
            //         trigger:'axis',
            //         confine:true,
            //         axisPointer:{
            //             type:'none',
            //             shadowStyle:{
            //                 color:'rgba(0,0,0,0)'
            //             },
            //             axis:'x'
            //         },
            //         formatter(params){
            //             let html =  "<div class='tooltip-box' >"+
            //               " <div class='tooltips-date'>"+
            //                    "<span class='tooltips-val-tir'>"+params[1].value+"%</span>"+'  '+ params[0].axisValue+
            //                " </div>"+
            //                " <div class='tooltips-val'>"+
            //                    " <span class='tooltips-val-num'>"+params[0].value+"</span>"+unit+
            //                 "</div>"+
            //            " </div>"
                       
            //             return params[0].value?html:''
            //         },
            //         extraCssText: 'box-shadow: 0px 2px 10px 0px rgba(72, 160, 220, 0.5);'
            // }
            this.option.xAxis[0].data = xData
            this.option.yAxis[0].max = unit == 'mg/dL'?max+5:GlucoseUtils.mgdlToMmol(max)+3
            this.option.series[0].data = avgList
            this.option.series[0].label.show = avgList.length>30?false:true
            this.options.xAxis[0].data = xData
            this.options.series[0].data = tir
            this.options.series[0].label.show = avgList.length>30?false:true
        },
    }
}
</script>
<style scoped>
.summary-chart{
    height:200px;
}
.summary-charts{
    height:200px;
}
</style>