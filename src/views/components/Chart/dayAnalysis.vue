<template>
    <div class='dayAnalysis' id='dayAnalysis' >
        <div class='dayAnalysis-box' >
            <div class='overview-compliance-border' v-if='dayInfo.tir>=70'></div>
            <div class='overview-nocompliance-border'  v-if='dayInfo.tir<70'></div>
            <div class='analysis-header' >
                <div class='analysis-date' >{{dayInfo.day}},{{dayInfo.week}}</div>
            </div>
            <div class='empty'  v-show='dayInfo.resultValue.length<=0' >
                <img src="~@/assets/image/empty-icon.png" alt="" class='empty-icon' >
                <div class='empty-text' >NO Date</div>
            </div>
            <div class='analysis-box'  v-show='dayInfo.resultValue.length>0' >
                <div class='chart-box'>
                    <div class='analysis-info' >
                        <div class='analysis-info-item' >
                            <div  :class='[dayInfo.avg>154?"active":"","analysis-info-value"]' v-if='unit=="mg/dL"'>{{dayInfo.avg}} <span class='analysis-info-value-unit' >mg/dL</span>  </div>
                            <div  :class='[dayInfo.avg>6.6?"active":"","analysis-info-value"]' v-else>{{dayInfo.avg}} <span class='analysis-info-value-unit' >mmol/L</span>  </div>
                            <div class='analysis-info-label' >Mean Glucose (MG)</div>
                        </div>
                        <div class='analysis-info-item' >
                            
                            <div  :class='[dayInfo.fluctate>79.2?"active":"","analysis-info-value"]'  v-if='unit=="mg/dL"'>{{dayInfo.fluctate}} <span class='analysis-info-value-unit' >mg/dL</span></div>
                            <div  :class='[dayInfo.fluctate>4.4?"active":"","analysis-info-value"]'  v-else>{{dayInfo.fluctate}} <span class='analysis-info-value-unit' >mmol/L</span></div>
                            <div class='analysis-info-label' >Max Fluctuation</div>
                        </div>
                        <div class='analysis-info-item' >
                            
                            <div :class='[dayInfo.tir<=70?"active":"","analysis-info-value"]' >{{dayInfo.tir}} <span class='analysis-info-value-unit' >%</span></div>
                            <div class='analysis-info-label' >Time In Range</div>
                        </div>
                        <div class='analysis-info-item' >
                            
                            <div :class='[dayInfo.lowTir>5?"active":"","analysis-info-value"]' >{{dayInfo.lowTir}} <span class='analysis-info-value-unit' >%</span></div>
                            <div class='analysis-info-label' >Time Below Range</div>
                        </div>
                        <div class='analysis-info-item' >
                        
                            <div :class='[dayInfo.hightTir>25?"active":"","analysis-info-value"]' >{{dayInfo.hightTir}} <span class='analysis-info-value-unit' >%</span></div>
                            <div class='analysis-info-label' >Time Above Range</div>
                        </div>
                    </div>
                    <t-chart
                            style="flex-grow:1;height:360px;"
                            :option="option"
                            :init-options="initOptions"
                            theme="tduck-echarts-theme"
                            ref='chart'
                    />
                </div>
            </div>
         </div>
        <div class='event-box' ref='events' v-if='tableData.length>0' >
            <el-table :data="tableData" style="width: 100%;border:none;"
            header-row-class-name='table-header' highlight-current-row ref="singleTable">
                <el-table-column  prop="ts"  label="Time"></el-table-column>
                <el-table-column  prop="event"  label="Event">
                    <template slot-scope="scope"> 
                        <div class='table-event-type' >
                            <img src="~@/assets/image/event-icon0.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==0'>
                            <img src="~@/assets/image/event-icon1.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==1'>
                            <img src="~@/assets/image/event-icon2.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==3'>
                            <img src="~@/assets/image/event-icon3.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==2'>
                            <img src="~@/assets/image/event-icon4.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==4'>
                            <img src="~@/assets/image/event-icon5.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==5'>
                            <img src="~@/assets/image/event-icon6.png" alt="" class='table-event-icon'  v-if='scope.row.event_type==6'>
                            <img src="~@/assets/image/event-icon7.png" alt="" class='table-event-icon'  v-if='scope.row.message_type=="high"'>
                            <img src="~@/assets/image/event-icon8.png" alt="" class='table-event-icon'  v-if='scope.row.message_type=="low"'>
                            <img src="~@/assets/image/event-icon8.png" alt="" class='table-event-icon'  v-if='scope.row.message_type=="elow"'>
                            <span v-if='scope.row.event_type==0'>{{scope.row.event_body.eat_name}}</span>
                            <span v-if='scope.row.event_type==1'>{{scope.row.event_body.sport_name}}</span>
                            <span v-if='scope.row.event_type==2'>{{scope.row.event_body.medicine_name}}</span>
                            <span v-if='scope.row.event_type==3'>{{scope.row.event_body.insulin_name}}</span>
                            <span v-if='scope.row.event_type==4'>{{scope.row.event_body.sleep_name}}</span>
                            <span v-if='scope.row.event_type==5'>Blood Glucose</span>
                            <span v-if='scope.row.event_type==6'>{{scope.row.event_body.custom_name}}</span>
                            <span v-if='scope.row.message_type=="high"'>High</span>
                            <span v-if='scope.row.message_type=="low"'>Low</span>
                            <span v-if='scope.row.message_type=="elow"'>Urgent low</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="event"  label="Record Details">
                    <template slot-scope="scope"> 
                        <div class='table-event-type' >
                            <span v-if='scope.row.event_type==0'>{{scope.row.event_body.remark}}</span>
                            <span v-if='scope.row.event_type==1'>{{scope.row.event_body.total_minute}} minutes</span>
                            <span v-if='scope.row.event_type==2'>{{scope.row.event_body.medicine_time_name}}</span>
                            <span v-if='scope.row.event_type==3'>{{scope.row.event_body.insulin_value}}IU</span>
                            <span v-if='scope.row.event_type==4'>{{scope.row.event_body.total_minute}} minutes</span>
                            <span v-if='scope.row.event_type==5'>{{scope.row.event_body.fingertipblood_name}}</span>
                            <span v-if='scope.row.event_type==6'>{{scope.row.event_body.remark}}</span>
                            <span v-if='scope.row.message_type=="high"'>--</span>
                            <span v-if='scope.row.message_type=="low"'>--</span>
                            <span v-if='scope.row.message_type=="elow"'>--</span>
                             <span v-if='scope.row.break' style='height:60px;' ></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="value"  label="Glucose Level">
                    <template slot-scope="scope"> 
                        <div v-if='scope.row.value&&scope.row.event_type!=5' >{{scope.row.value}}{{unit}}</div>
                        <div v-if='scope.row.event_type==5' >{{scope.row.event_body.bg}}{{unit}}</div>
                        <div v-if='scope.row.bgValue' >{{scope.row.bgValue}}{{unit}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
import TChart from '@/views/components/TChart'
import {formatDate,formatTime,formatDayEn,format12Date} from '@/utils/formatTime'
import { TIRUtils } from "@/utils/algorithm/TIR";
import { GlucoseUtils } from "@/utils/algorithm/Glucose";
import img0 from '@/assets/image/event-icon0.png'
import img1 from '@/assets/image/event-icon1.png'
import img2 from '@/assets/image/event-icon3.png'
import img3 from '@/assets/image/event-icon2.png'
import img4 from '@/assets/image/event-icon4.png'
import img5 from '@/assets/image/event-icon5.png'
import img6 from '@/assets/image/event-icon6.png'

export default {
    data(){
        return{
            eventChecked:false, //事件记录开关
            initOptions: {
                renderer: 'svg'
            },
            option: {
                grid:[
                    {   
                        show:true,
                        left:60,
                        right:60,
                        top:10,
                        bottom:50,
                         borderColor:'#666'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        gridIndex:0,
                        boundaryGap:false,
                        axisTick: false,
                        splitLine:{
                            show:false,
                            lineStyle:{
                                color:'var(--color-black-60)'
                            },
                            interval:59
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: 'var(--color-black-60)',
                                width:1,
                            },
                        },
                        data:[],
                        axisLabel: {
                            formatter: function (value, index) {
                                if (index  % 360 === 0) {
                                    let h =  Math.floor(value/60)
                                    let moment = h
                                    if(h>12){
                                        moment = h-12+'PM'
                                    }else if(h==12){
                                        moment = h+'PM'
                                    }else{
                                        if(h==0){h=12}
                                         moment = h+'AM'
                                    }
                                    return moment;
                                }
                                if(index+1===24*60){
                                    return '12AM'
                                }
                            },
                            interval:0,
                            color: 'var(--color-black-40)',
                            fontSize: 20, 
                            margin:20
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex:0,
                        min: 40,
                        max: 400,
                        interval:50,
                        splitLine:{
                            lineStyle:{
                                color:'var(--color-black-20)'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}',
                            color: 'var(--color-black-40)',
                            fontSize: 20,
                            margin:14
                        }
                    }
                ],
                series: [
                    //中位线
                    {
                        type: 'line',
                        data: [],
                        z:9,
                        itemStyle: {
                        color:'var(--color-primary)',
                        },
                        showSymbol:_.compact(this.dataList.value).length>1?false:true,
                        symbolSize:1,
                        symbol:'circle',
                        emphasis:{
                            disabled:true
                        },
                        lineStyle: {
                        width: 2,
                        },
                        animation:false,
                        markPoint:{
                            symbol: 'circle',
                            symbolSize:_.compact(this.dataList.value).length==1?5:0,
                            itemStyle:{
                                color:'var(--color-primary)'
                            },
                            emphasis:{
                                disabled:true
                            },
                            data:[{
                                coord:[_.indexOf(this.dataList.value,_.compact(this.dataList.value)[0]),_.compact(this.dataList.value)[0]]
                            }]
                        },
                        markLine: {
                            silent: true, // 不高亮辅助线
                            symbol: 'none',
                            animation:false,
                            data: [
                                {
                                type: 'min',
                                yAxis:3.9,
                                lineStyle: {
                                    color: 'var(--color-error)',
                                    width: 0,
                                    type:'solid'
                                },
                                label: {
                                    color: 'var(--color-error)',
                                    fontSize: 20,
                                    distance: 14,
                                    position:'end'
                                },
                                },
                                {
                                type: 'max',
                                yAxis:10,
                                lineStyle: {
                                    color: 'var(--color-warning)',
                                    width: 0,
                                    type:'solid'
                                },
                                label: {
                                    color: 'var(--color-warning)',
                                    fontSize: 20,
                                    distance:14,
                                    position:'end'
                                },
                                }
                            ],
                        },
                        markArea:{
                            data:[
                                [{
                                    yAxis: 3.9
                                },
                                {   
                                    yAxis: 10
                                }]
                            ],
                            itemStyle:{
                                color:'rgba(72, 160, 220, 0.2)'
                            }
                        }
                    }
                ],

                
            },
            tableData:[{}],
            dayInfo:{
                resultValue:[]
            },
            unit:"",
            target:''
        }
    },
    props:{
        dataList:{
            type:Object
        },
        eventList:{
            type:Array
        }
    },
    components: {
        TChart
    },
    mounted(){
        this.handelOption(this.dataList)
        this.markEvent(this.eventList)
    },
    methods:{
        // 处理数据
        handelOption(data){
            let dayInfo = _.cloneDeep(data)
            let unit =  dayInfo.unit?dayInfo.unit:'mmol/L'
            this.unit = unit
            if(dayInfo.resultValue.length>0){
                let target =  dayInfo.target
                let resultValue = _.compact(dayInfo.resultValue)
                let fluctate = _.max(dayInfo.value) -  _.min(dayInfo.value) //最大波动
                let avg = GlucoseUtils.calculateMeanCvGmi(resultValue).mean //平均值
                dayInfo.day = formatDayEn(dayInfo.day)
                dayInfo.fluctate = unit=='mg/dL'?fluctate:GlucoseUtils.mgdlToMmol(fluctate);
                dayInfo.avg = unit=='mg/dL'? Math.round(avg):GlucoseUtils.mgdlToMmol(avg);
                dayInfo.hightTir = (Number(dayInfo.allTir.highRate)+Number(dayInfo.allTir.veryHighRate)).toFixed(1);
                dayInfo.lowTir =   (Number(dayInfo.allTir.lowRate)+Number(dayInfo.allTir.veryLowRate)).toFixed(1);
                 
                // 图表数据
                let xData = Array.from({length:60*24},(item, index) => index)
                let max = dayInfo.max > 240 ? 400 : 240
                if(unit != 'mg/dL'){
                    dayInfo.value = dayInfo.value.map(val => GlucoseUtils.mgdlToMmol(val));
                }
                this.option.tooltip = {
                        show:true,
                        trigger:'axis',
                        confine:true,
                        axisPointer:{
                            type:'none',
                            axis:'x'
                        },
                        formatter(params){
                            let h =  Math.floor(Number(params[0].axisValue)/60)<10 ? '0'+ Math.floor(Number(params[0].axisValue)/60) : Math.floor(Number(params[0].axisValue)/60) 
                            let m =  Number(params[0].axisValue)%60 < 10 ? '0' + Number(params[0].axisValue)%60 : Number(params[0].axisValue)%60
                            let moment = h+':'+m
                            let html =  "<div class='tooltip-box' >"+
                            " <div class='tooltips-val'>"+
                                " <span class='tooltips-val-num'>"+params[0].value+"</span>"+unit+
                                "</div>"+
                            " <div class='tooltips-date'>"+
                                dayInfo.day +' '+ moment+
                            " </div>"+
                        " </div>"
                            return params[0].value?html:''
                        },
                        extraCssText: 'box-shadow: 0 2px 10px rgba(195,245,247,1);'
                }
                this.option.series[0].markPoint.data = [{
                                coord:[_.indexOf(dayInfo.value,_.compact(dayInfo.value)[0]),_.compact(dayInfo.value)[0]]
                }]
                this.option.series[0].markLine.data = this.option.series[0].markLine.data.splice(0,2)
                this.option.xAxis[0].data = xData
                this.option.yAxis[0].max = unit == 'mg/dL'?max:Math.ceil(max / 3) * 3
                this.option.yAxis[0].interval =(max-40)/5
                this.option.series[0].data = dayInfo.value
                this.option.series[0].markLine.data[0].yAxis = target[0]
                this.option.series[0].markLine.data[1].yAxis = target[1]
                this.option.series[0].markArea.data[0][0].yAxis = target[0]
                this.option.series[0].markArea.data[0][1].yAxis = target[1]
            }
            this.dayInfo = dayInfo
        },
        // 标记事件
        markEvent(data){
            // console.log(data)
            // console.log(this.unit)
            let unit = this.unit
            let eventData = _.orderBy(_.cloneDeep(data),['event_ts'],['asc'])
            let chartValue = _.cloneDeep(this.dataList.value)
            let tableData = []
            if(unit != 'mg/dL'){
                chartValue = chartValue.map(val => GlucoseUtils.mgdlToMmol(val));
            }
            if(eventData){
                eventData.forEach(item=>{
                    if(item&&item.type==1){
                        let img =[img0,img1,img2,img3,img4,img5,img6]
                        this.option.series[0].markPoint.data.push({
                            coord:[item.xIndex,item.yPosition],
                            symbol:'image://'+img[item.event_type],
                            symbolSize:30
                        })
                        this.option.series[0].markLine.data.push([{
                            lineStyle:{
                                    color: 'var(--color-black-60)',
                                    width: 1,
                                    type:'dashed'
                            },
                            coord:[item.xIndex,chartValue[item.xIndex]],
                        },{
                            coord:[item.xIndex,0],
                        }])
                    }
                    if(unit != 'mg/dL'){
                        item.value = item?GlucoseUtils.mgdlToMmol(item.value):''
                        if(item.event_type==5){
                            item.event_body.bg = GlucoseUtils.mgdlToMmol(item.event_body.bg)
                        }
                    }
                    tableData.push({
                        id:item?item.event_id:'',
                        ts:item?format12Date(item.event_ts*1000):'',
                        event_type:item?item.event_type:'',
                        event_body:item?item.event_body:'',
                        value:item?chartValue[item.xIndex]:'',
                        bgValue:item?item.value:'',
                        message_type:item?item.message_type:''
                    })
                    this.tableData = tableData
                })
                this.$nextTick(()=>{
                    // console.log(this.$refs.events)
                    let eventTop = this.$refs.events.offsetTop
                    let pageHeight = 2375
                    let pageEventHeight = pageHeight - eventTop
                    let resultHeight =  this.$refs.events.clientHeight
                    let eventLength =Math.floor((2375-eventTop-48)/55)
                    if(resultHeight>pageEventHeight){
                        let params= {
                            id:'',
                            ts:'',
                            event_type:'null',
                            event_body:'',
                            value:'',
                            bgValue:'',
                            message_type:'',
                            break:true
                        }
                        this.tableData.splice(eventLength,0,params)
                    }
                })
            }else{
                this.tableData = []
            }
        },
    },
    watch:{
        dataList(n,o){
            this.handelOption(n)
        },
        eventList(n,o){
            this.markEvent(n)
        },
    }
}
</script>
<style >
.empty{
    width:100%;
    height: 250px;
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.empty-icon{
    width:80px;
    height:80px;
    display: block;
    margin:0 auto;
    margin-bottom:30px;
}
.empty-text{
    font-size:var(--fontSize-max);
    color:var(--color-black-40);
    text-align: center;
}
.dayAnalysis{
    margin-bottom:20px;
    margin-top:20px;
}
.dayAnalysis-box{
    position: relative;
    border:1px solid rgba(0,0,0,0.1);
    padding:15px 30px;
    border-radius:10px;
    height:460px;
}
.overview-compliance-border{
        width:10px;
        height:460px;
        background: var(--color-primary);
        position: absolute;
        left:0;
        top:0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
     .overview-nocompliance-border{
        width:10px;
        height:460px;
        background: var(--color-error);
        position: absolute;
        left:0;
        top:0;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
.analysis-header{
    display: flex;
    align-items: center;
    margin-bottom:20px;
}
.analysis-date{
    width:180px;
    font-size:var(--fontSize-smax);
    color: var(--color-black-100);
    font-weight: 700;
    padding-left:10px;
}
.analysis-event{
    font-size:var(--fontSize-smax);
    color: var(--color-black-60);
}
/* 图表血糖信息 */
.chart-box{
    display: flex;
    height:360px;
    margin-bottom:20px;
}
.analysis-info{
    width:180px;
    height:360px;
    box-sizing: border-box;
    padding:10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.analysis-info-label{
    font-size:var(--fontSize-default);
    color: var(--color-black-60);
}
.analysis-info-value{
    font-size:var(--fontSize-max);
    color: var(--color-black-100);
}
.analysis-info-value-unit{
    font-size:var(--fontSize-default);
}
.analysis-info-value.active{
    color:var(--color-error);
}

/* 表格 */
.event-box{
    margin-top:20px;
    margin-bottom:20px;
}
.table-header{
    background:#f7f7f7;
}
.table-event-type{
    display: flex;
    align-items: center;
}
.table-event-icon{
    width:30px;
    height:30px;
    display: block;
}
</style>