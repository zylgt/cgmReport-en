<template>
    <div>
        <div class='day-box' ref='day' id='day-box'>
            <div class='day-item-box' v-if='dayList.length>0'>
                <div class='day-item'  v-for='(item,index) in dayList' :key='index' :style="{width:gridW+'px'}" >
                    <div class='day-week' v-if='index<7'>{{item.week}}</div>
                    <div class='day-grid-border'></div>
                </div>
            </div>
            <t-chart
                style="width: 100%;height:510px;"
                :option="option"
                :init-options="initOptions"
                theme="tduck-echarts-theme"
            />
        </div>
    </div>
</template>
<script>
import TChart from '@/views/components/TChart'
import { hasEventListener } from "@/utils/utils";
import {formatDate,formatTime} from '@/utils/formatTime'
import { TIRUtils } from "@/utils/algorithm/TIR";
import { GlucoseUtils } from "@/utils/algorithm/Glucose";
import { Divider } from 'element-ui';
export default {
    data(){
        return{
            initOptions: {
                renderer: 'svg'
            },
            option: {
                tooltip:{
                    show:true,
                    trigger:'axis',
                    confine:true

                },
                title:[],
                grid:[],
                xAxis: [],
                yAxis: [],
                visualMap:[],
                series: [],
            },
            dayList:[],
            week:[],
            gridW:0,
            unit:'mg/dL',
            target:[]
        }
    },
    components: {
        TChart
    },
    created(){
        
    },
    mounted(){
        // 监听云数据 
        this.$bus.$on('getDatas',(data)=>{
            console.log(formatTime(new Date()),'每日血糖开始计算')
            this.handelDay(data)
            // this.handelIng(data)
        })
    },
    methods:{
        
        processArray(arr, interval) {
            let result = [];

            for (let i = 0; i < arr.length - 1; i++) {
                result.push(arr[i]);

                let diff = arr[i + 1].DataTs - arr[i].DataTs;
                let addTs = arr[i].DataTs + interval;
                while (diff > interval) {
                result.push({DataTs: addTs, value: undefined});
                diff = arr[i + 1].DataTs - addTs;
                addTs += interval;
                }
            }
            result.push(arr[arr.length - 1]);

            return result;
        },

        filterArray  (data) {
            const result = [];

            const seenTimes = new Set();
            let levelLowInvalidMg = 20
            let levelHighInvalidMg = 800
            let levelTooLowMg = 36
            let levelTooHighMg = 540
            data.forEach(item => {
                const timeStr = formatDate(item.DataTs*1000,'YYYY-mm-dd HH:MM')
                if (!seenTimes.has(timeStr)) {
                seenTimes.add(timeStr);
                if (item.Value < levelTooLowMg) {
                    result.push({
                    ...item,
                    value: levelTooLowMg,
                    });
                } else if (item.Value > levelTooHighMg) {
                    result.push({
                    ...item,
                    value: levelTooHighMg,
                    });
                } else {
                    result.push({
                    ...item,
                    value: item.Value,
                    });
                }
                }
            });
            return result;
        },

        handleData (objects, s_ts, e_ts)  {
           
            let measuringInterval = 60
            objects = this.processArray(objects, measuringInterval);
            objects = this.filterArray(objects);

            let startTs = objects[0].DataTs;
            while (startTs - measuringInterval >= s_ts) {
                objects.unshift({
                DataTs: startTs - measuringInterval,
                value: undefined,
                });
                startTs = startTs - measuringInterval;
            }

            let endTs = objects[objects.length - 1].DataTs;
            while (endTs + measuringInterval < e_ts) {
                objects.push({
                DataTs: endTs + measuringInterval,
                value: undefined,
                });
                endTs = endTs + measuringInterval;
            }
            return objects;
        },
        // 分割成每日血糖所需要的
        handelDay(data){
            data = _.cloneDeep(data)
            this.unit = data.unit
            this.target = data.target
            let s_n = data.start_ts.replace(/[年月]/g,"-");
            let s_t = s_n.replace(/[日]/g,"");
            let e_n = data.end_ts.replace(/[年月]/g,"-");
            let e_t = e_n.replace(/[日]/g,"");
            let s = data.start_ts.indexOf('年')==-1?new Date(data.start_ts):new Date(s_t)
            let e = data.end_ts.indexOf('年')==-1?new Date(data.end_ts):new Date(e_t)
            let s_date = s.setHours(0,0,0)/1000
            let e_date = e.setHours(23,59,59)/1000
            let tirTarget =  data.unit=='mmol/L'?[_.round(GlucoseUtils.mmolToMgdl(data.target[0]),1),_.round(GlucoseUtils.mmolToMgdl(data.target[1]),1)]:data.target
            let datArray = this.handleData(data.arrayData,s_date,e_date)
            let singleDay  = _.chunk(datArray,60*24) ;
            let max = _.maxBy(datArray,'Value').Value>540?558:_.maxBy(datArray,'Value').Value
            let dayList = new Array()
            singleDay.forEach(item=>{
                let value = _.map(item, 'value');
                let originValue = _.map(item, 'Value');
                let handelValue = _.compact(value)
                dayList.push({
                    day: formatDate(item[0].DataTs*1000,'mm.dd'),
                    week: formatDate(item[0].DataTs*1000,'WW'),
                    value:value,
                    resultValue:handelValue,
                    max:max,
                    tir:TIRUtils.getTIRResult(_.compact(originValue),tirTarget[1],tirTarget[0])?(Number(TIRUtils.getTIRResult(_.compact(originValue),tirTarget[1],tirTarget[0]).normalRate)*100).toFixed(1):''
                })
            })
            this.dayList = dayList
            console.log(formatTime(new Date()),'每日血糖计算完成')
            this.$nextTick(()=>{
                this.getOption(this.dayList)
            })
        },
        handelIng(data){
            this.unit = data[2]
            let s_date = data[0].split('/')[0]
            let e_date = data[0].split('/')[1]
            let arrays = _.uniqBy(data[1],'DataTs') //去重
            let array = _.filter(arrays,function(val){  //过滤掉无效数据
                return val.Value>=20&&val.Value<=800
            })
            let tirTarget =  data.unit=='mmol/L'?[_.round(GlucoseUtils.mmolToMgdl(data.target[0]),1),_.round(GlucoseUtils.mmolToMgdl(data.target[0]),1)]:data.target
            let currentDate = new Date(s_date); 
            let dayList = [] 
            while (currentDate <= new Date(e_date)) {
                let dayArray =  new Array(24*60)
                let dayArrays = new Array(24*60)
                 array.forEach(item=>{
                    let moment = Number(formatDate(item.DataTs*1000,'HH'))*60+Number(formatDate(item.DataTs*1000,'MM'))
                    let value = item.Value
                    if(item.Value>540&&item.Value<=800)value = 540
                    if(item.Value>=20&&item.Value<36)value = 36
                    if(formatDate(item.DataTs*1000,'mm.dd') == formatDate(currentDate,'mm.dd')){
                        dayArray[moment] = value?value:null
                        dayArrays[moment] = item.Value
                    }
                })
                let max = _.maxBy(array,'Value').Value>540?540:_.maxBy(array,'Value').Value
                dayList.push({
                    day: formatDate(currentDate,'mm.dd'),
                    week: formatDate(currentDate,'WW'),
                    value:dayArray,
                    max:max,
                    tir:TIRUtils.getTIRResult(dayArrays,tirTarget[1],tirTarget[0])?(Number(TIRUtils.getTIRResult(dayArrays,tirTarget[1],tirTarget[0]).normalRate)*100).toFixed(1):''
                })
                currentDate.setDate( new Date(currentDate).getDate() + 1);
            }
            console.log(formatTime(new Date()),'每日血糖计算完成')
            this.dayList = dayList
            this.$nextTick(()=>{
                this.getOption(this.dayList)
            })
        },
        // 渲染数据
        getOption(data){
            let dayList = _.cloneDeep(data)
            let gridW = Math.floor((this.$refs.day.clientWidth-240)/7)
            this.gridW = gridW
            let xData = Array.from({length:60*24},(item, index) => index)
            let max = data[0].max
            let unit = this.unit
            if(unit != 'mg/dL'){
                max = GlucoseUtils.mgdlToMmol(max)<13.9?13.9: GlucoseUtils.mgdlToMmol(max)
            }
            this.option = {
                tooltip :{
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
                              dayList[params[0].axisIndex].day +' '+ moment+
                           " </div>"+
                       " </div>"
                       
                        return html
                    },
                    extraCssText: 'box-shadow: 0 2px 10px rgba(195,245,247,1);'
                },
                title:[],
                grid:[],
                xAxis: [],
                yAxis: [],
                visualMap:[],
                series: [],
            }
            dayList.forEach((item,index)=>{
                if(unit != 'mg/dL'){
                    item.value = item.value.map(val => GlucoseUtils.mgdlToMmol(val));
                }
                let tirClass = item.tir>70?'tir':'tirs'
                this.option.title.push({
                    text:item.tir?['{date|'+item.day+'}{tirLable|TIR:}{'+tirClass+'|'+item.tir+'%}']:['{date|'+item.day+'}{tir|TIR:--}'],
                    left:index==0?90:index<7&&index>0?index*(gridW+15)+90:(index%7)*(gridW+15)+90,
                    top:index>=7?172*Math.floor(index/7):2,
                    right:10,
                    textStyle:{
                        rich:{
                            date:{
                                fontSize:16,
                                color:'#333',
                                width:(gridW-10)/2-10,
                                align:'left'
                            },
                            tirLable:{
                                fontSize:20,
                                width:30,
                                color:'#333',
                                align:'right'
                            },
                            tir:{
                                fontSize:20,
                                width:70,
                                color:'#333',
                                align:'left'
                            },
                            tirs:{
                                fontSize:20,
                                width:70,
                                color:'#F43F31',
                                align:'left'
                            }
                        }
                    },
                })
                this.option.grid.push({   
                        show:false,
                        left:index==0?90:index<7&&index>0?index*(gridW+15)+90:(index%7)*(gridW+15)+90,
                        right:0,
                        top:index>=7?170*Math.floor(index/7)+30:30,
                        width:gridW,
                        height:90,
                        borderColor:'#666',
                        borderWidth:0.5
                })
                this.option.xAxis.push({   
                        type: 'category',
                        gridIndex:index,
                        show:true,
                        axisLine:{
                            show:false
                        },
                        data:xData,
                        axisLabel:{
                            formatter: function (value, indexs) {
                                if(indexs==0){
                                    return '00:00'
                                }else if(index==dayList.length-1&&indexs==item.value.length-1||index%7==6&&indexs==item.value.length-1){
                                    return '00:00'
                                }else if(indexs==(item.value.length/2)-1){
                                    return '12:00'
                                }
                            },
                            interval:0,
                            color: 'var(--color-black-60)',
                            fontSize: 16, 
                            margin:15
                        },
                        axisTick:{
                            show:false
                        }
                })
                this.option.yAxis.push({   
                        type: 'value',
                        show:false,
                        gridIndex:index,
                        min:0,
                        max:Math.ceil(max / 3) * 3 
                })
                this.option.visualMap.push({
                      type: "piecewise",
                        show: false,
                        pieces: [
                            {
                                gt: 0,
                                lt: this.target[0],
                                color: "var(--color-error)",//大于0小于12为红色
                            },
                            {
                                gt: this.target[1],
                                color: "var(--color-warning",//大于12区间为红色
                            },{
                                gt: this.target[0],
                                lt: this.target[1],
                                color: "var(--color-primary",//大于12区间为红色
                            },
                        ],
                })
                this.option.series.push(  
                        {
                        type: 'line',
                        data:item.value,
                        xAxisIndex:index,
                        yAxisIndex:index,
                        showSymbol:_.compact(item.value).length>1?false:true,
                        symbolSize:1,
                        symbol:'circle',
                        emphasis:{
                            disabled:true
                        },
                        lineStyle: {
                            width: 1,
                        },
                        markPoint:{
                            symbol: 'circle',
                            symbolSize:_.compact(item.value).length==1?5:0,
                            itemStyle:{
                                color:'var(--color-primary)'
                            },
                            emphasis:{
                                disabled:true
                            },
                            data:[{
                                coord:[_.indexOf(item.value,_.compact(item.value)[0]),_.compact(item.value)[0]]
                            }]
                        },
                        markLine:{
                                symbol: 'none',
                                // animation:false,
                                data:[
                                    // {
                                    //     xAxis:xData.length/2-1,
                                    //     lineStyle: {
                                    //         color: 'var(--color-black-10)',
                                    //         width: 1,
                                    //         type:'dashed'
                                    //     },
                                    //     label:{
                                    //         show:false
                                    //     }
                                    // } ,
                                    {
                                        yAxis: this.target[0],
                                        lineStyle: {
                                            width: 0,
                                        },
                                        label:{
                                            show:index%7==0?true:false,
                                            position:'start',
                                            distance:14,
                                            fontSize:16,
                                            color:'#666',

                                        }
                                    } ,
                                    {
                                        yAxis: this.target[1],
                                        lineStyle: {
                                            width: 0,
                                        },
                                        label:{
                                            show:index%7==0?true:false,
                                            position:'start',
                                            fontSize:16,
                                            distance:14,
                                            color:'#666'
                                        }
                                    } ,
                                ]
                        },
                        markArea:{
                            data:[
                                [{
                                    yAxis:  this.target[0]
                                },
                                {   
                                    yAxis:  this.target[1]
                                }]
                            ],
                            itemStyle:{
                                color:'rgba(72, 160, 220, 0.1)'
                            }
                        },

                    }
                )
            })
            this.$nextTick(()=>{
                console.log(formatTime(new Date()),'每日血糖渲染完成')
            })
        },
         // 管理数据
        handelIngs(data){
            let array = data[1]
            // 将数组按天分割
            let dayMap = new Map()
             array.forEach(item=>{
                item.day = formatDate(item.DataTs*1000,'mm.dd')
                item.week = formatDate(item.DataTs*1000,'WW')
                item.moment = Number(formatDate(item.DataTs*1000,'HH'))*60+Number(formatDate(item.DataTs*1000,'MM'))
                item.dayArray = new Array(24*60)
                item.dayArray[item.moment] ==GlucoseUtils.mgdlToMmol(item.Value)
                item.dayArrayCopy = new Array(24*60)
                item.dayArrayCopy[item.moment] =item.Value
                dayMap.has(item.day) ? dayMap.get(item.day).value[item.moment]=GlucoseUtils.mgdlToMmol(item.Value) : dayMap.set(item.day, {value:item.dayArray,week:item.week,tir:TIRUtils.getTIRResult(item.dayArrayCopy)?TIRUtils.getTIRResult(item.dayArrayCopy).normalRate:''});
            })
            // x轴数据
            
            console.log(formatTime(new Date()),'每日血糖计算完成')
            // this.dayList = [...dayMap]
            // this.$nextTick(()=>{
            //     this.getOptions(this.dayList)
            // })
        },
        // 渲染数据
        getOptions(data){
            let dayList = data
            let gridW = Math.floor((this.$refs.day.clientWidth-240)/7)
            this.gridW = gridW
            let xData = Array.from({length:60*24})
            this.option = {
                title:[],
                grid:[],
                xAxis: [],
                yAxis: [],
                visualMap:[],
                series: [],
            }
            dayList.forEach((item,index)=>{
                if(index>13){
                    return ;
                }
                this.option.title.push({
                    text:['{date|'+dayList[index][0]+'}{tir|TIR:'+dayList[index][1].tir+'%}'],
                    left:index==0?90:index<7&&index>0?index*(gridW+15)+90:(index-7)*(gridW+15)+90,
                    top:index>=7?172:2,
                    textStyle:{
                        rich:{
                            date:{
                                fontSize:16,
                                color:'#666',
                                width:(gridW-10)/2,
                                align:'left'
                            },
                            tir:{
                                fontSize:16,
                                color:'#666',
                                width:(gridW-10)/2,
                                align:'right'
                            }
                        }
                    },
                })
                this.option.grid.push({   
                        show:true,
                        borderRadius:14,
                        left:index==0?90:index<7&&index>0?index*(gridW+15)+90:(index-7)*(gridW+15)+90,
                        right:0,
                        top:index>=7?170:0,
                        width:gridW,
                        height:120,
                        borderColor:'#e5e5e5',
                        borderWidth:0.5
                })
                this.option.xAxis.push({   
                        type: 'category',
                        gridIndex:index,
                        show:true,
                        axisLine:{
                            show:false
                        },
                        data:xData,
                        axisLabel:{
                            formatter: function (value, indexs) {
                                if(indexs==0){
                                    return '00:00'
                                }else if(indexs==dayList[index][1].value.length-1&&index==6||indexs==dayList[index][1].value.length-1&&index==13){
                                    return '00:00'
                                }else if(indexs==(dayList[index][1].value.length/2)-1){
                                    return '12:00'
                                }
                            },
                            interval:0,
                            color: 'var(--color-black-40)',
                            fontSize: 16, 
                            margin:15
                        },
                        axisTick:{
                            show:false
                        }
                })
                this.option.yAxis.push({   
                        type: 'value',
                        show:false,
                        gridIndex:index,
                        min:0,
                        max:16
                })
                this.option.visualMap.push({
                      type: "piecewise",
                        show: false,
                        pieces: [
                            {
                                gt: 0,
                                lt: 3.9,
                                color: "var(--color-error)",//大于0小于12为红色
                            },
                            {
                                gt: 10,
                                color: "var(--color-warning",//大于12区间为红色
                            },{
                                gt: 3.9,
                                lt: 10,
                                color: "var(--color-primary",//大于12区间为红色
                            },
                        ],
                })
                this.option.series.push(  
                        {
                        type: 'line',
                        data:dayList[index][1].value,
                        animation:false,
                        xAxisIndex:index,
                        yAxisIndex:index,
                        showSymbol: false,
                        lineStyle: {
                        width: 1,
                        },
                        markLine:{
                                symbol: 'none',
                                animation:false,
                                data:[
                                    {
                                        xAxis:xData.length/2-1,
                                        lineStyle: {
                                            color: 'var(--color-black-10)',
                                            width: 1,
                                            type:'dashed'
                                        },
                                        label:{
                                            show:false
                                        }
                                    } ,
                                    {
                                        yAxis:3.9,
                                        lineStyle: {
                                            width: 0,
                                        },
                                        label:{
                                            show:index==0||index==7?true:false,
                                            position:'start',
                                            distance:14,
                                            fontSize:16,
                                            color:'#666',

                                        }
                                    } ,
                                    {
                                        yAxis:10,
                                        lineStyle: {
                                            width: 0,
                                        },
                                        label:{
                                            show:index==0||index==7?true:false,
                                            position:'start',
                                            fontSize:16,
                                            distance:14,
                                            color:'#666'
                                        }
                                    } ,
                                ]
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
                                color:'rgba(50, 186, 192, 0.08)'
                            }
                        }
                    }
                )
            })
        }
    },
    
    beforeDestroy(){
        this.$bus.$off('getDatas')
        this.$bus.$off('getVuexTag')
    }
}
</script>
<style >
    .day-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        padding-top:20px;
    }
    #day-box .day-item-box{
        overflow: hidden;
        padding:0 0 0 90px;
        width:100%;
        height:510px;
        position: absolute;
        left:0;
        top:-11px;
    }
    #day-box .day-item{
        position: relative;
        margin-right:15px;
        margin-bottom:49px;
        float: left;
    }
    #day-box .day-week{
        text-align: center;
        font-size:var(--fontSize-big);
        color:var(--color-black-80);
        margin-bottom:10px;
    }
    #day-box .day-grid-border{
        height:120px;
        border:1px solid #666;
        border-radius:10px;
        width:100%;
    }
    #day-box .day-main{
        width:180px;
        height:120px;
        position: relative;
    }
    #day-box .day-date-tir{
        width:100%;
        padding:2px 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left:0;
        top:0;
        color:var(--color-black-60);
        font-size: var(--fontSize-big);
    }
    #day-box .day-target{
        height: 66px;
        display: flex;
        flex-direction: column;
        align-items:center ;
        justify-content: space-between;
        position: absolute;
        top:35px;
        left:-30px;
        font-size:var(--fontSize-big);
        color:var(--color-black-60);
    }
    #day-box .chart-box{
        width:180px;
        height:120px;
        border:1px solid var(--color-black-10);
        border-radius:10px;
    }
    #day-box .chart-x{
        width:130px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom:0;
        left:-20px;
        font-size:var(--fontSize-big);
        color:var(--color-black-40);
    }
    #day-box .chart-x-end{
        width:220px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom:0;
        left:-20px;
        font-size:var(--fontSize-big);
        color:var(--color-black-40);
    }
    #day-box .tooltip-box{
        font-size:var(--fontSize-default);
        color:var(--color-black-40);
    }
    #day-box .tooltips-val{
        margin-bottom:4px;
    }
    #day-box .tooltips-val-num{
        font-size:var(--fontSize-big);
        color:var(--color-black-80);
        padding-right:4px;
    }
</style>