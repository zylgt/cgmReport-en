<template>
    <div id='report' ref='report'>
        <div v-if='!empty' >
         
        </div>
        <!-- 第一页 -->
        <div class='reports-box'>
            <div class='report-main-title-infos' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >AGP Report</div>
                <div class='report-main-date' >
                    {{info.start_date}}<div class='repart-main-dirver-box'><span class='repart-main-dirver' ></span></div>{{info.end_date}}({{info.total_day}})
                </div>
            </div>
            <div v-if='!empty' >
                <!-- 基本信息 -->
                <div class='report-main-base-info report-main' ref='test'>
                    <div class='report-module-title'  >
                        <div class='report-module-title-text' >Basic Information</div>
                    </div>
                    <div class='report-base-user' >
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Name：</div>
                            <div class='report-base-user-value'>{{info.nickname?info.nickname:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Age：</div>
                            <div class='report-base-user-value'>{{info.age?info.age:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Type of Diabetes：</div>
                            <div class='report-base-user-value'>{{info.diabetes_type?info.diabetes_type:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Course of the Disease：</div>
                            <div class='report-base-user-value'>{{info.diabetes_year?info.diabetes_year:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Target Range：</div>
                            <div class='report-base-user-value'>{{info.glucose_range_lower_limit}}-{{info.glucose_range_lupper_limit}}{{unit}}</div>
                        </div>  
                    </div>
                    <div class='report-data-source'>
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Sensor Code</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Data Source</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>Sync Time</div>
                        </div>  
                    </div>
                    <div class='report-data-sources'>
                        <div class='report-base-user-item' >
                            <div class='report-base-user-value'>{{info.device_mac}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-value'>{{info.phone_model?info.phone_model:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-value'>{{info.end_date}}</div>
                        </div>  
                    </div>
                </div>
                <!-- 血糖数据、TIR -->
                <div class='report-main-data-tir-box' >
                    <div class='report-main-data-tir report-main' >
                        <div class='report-module-title' >
                            <div class='report-module-title-text' >Glucose Statistics</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >Wearing Days</div>
                            </div>
                            <div class='report-main-data-val'>{{info.total_day}}</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >Time CGM Active</div>
                                <div class='report-main-data-label-tip' >Target > 70%</div>
                            </div>
                            <div :class='[bgInfo.effective>70?"":"active","report-main-data-val"]'>{{bgInfo.effective}}%</div>
                        </div>
                        <div class='report-main-data-list' v-if='unit=="mg/dL"' >
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >Mean Glucose (MG)</div>
                                <div class='report-main-data-label-tip' >Target ＜ 154mg/dL</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.mean}}mg/dL</div>
                        </div>
                        <div class='report-main-data-list' v-else>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >Mean Glucose (MG)</div>
                                <div class='report-main-data-label-tip' >Target ＜6.6mmol/L</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.mean}}mmol/L</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >GMI</div>
                                <div class='report-main-data-label-tip' >Target＜7%</div>
                            </div>
                            <div class='report-main-data-val'>{{resultDay>=10?bgInfo.GMI+'%':'Not Enough Data'}}</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >CV Coefficient of Variation</div>
                                <div class='report-main-data-label-tip' >Target＜36%</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.CV}}%</div>
                        </div>
                    </div>
                    <div class='report-main-data-tir report-main' >
                        <div class='report-module-title' >
                            <div class='report-module-title-border' ></div>
                            <div class='report-module-title-text' >Time in Ranges</div>
                        </div>
                        <div class='report-module-tips report-module-tips-only' >
                            The higher the percentage of time within the TIR, the better the blood sugar control.
                        </div>
                        <div class='tir-box' >
                            <TIR :dataList='tir'/>
                        </div>
                    </div>
                </div>
                <!-- AGP图谱 -->
                <div class='report-main-agp report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-border' ></div>
                        <div class='report-module-title-text' >Ambulatory Glucose Profile (AGP)</div>
                    </div>
                    <div class='report-module-tips' >
                            <div class='report-module-tips' >
                            The median glucose curve is within the target range, and the flatter it is, the better the blood glucose stability. The 25%-75% range (the dark blue area in the chart) and the 5%-95% range (the light blue area in the chart) both display daytime blood glucose fluctuations. A wider range indicates greater fluctuation in blood glucose during the corresponding period.
                        </div>
                    </div>
                    <div class='agp-box' >
                        <AGP  :dataList='agpList' :height='370'/>
                    </div>
                </div>
                <!-- 每日血糖 -->
                <div class='report-main-day report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-border' ></div>
                        <div class='report-module-title-text' >Daily Glucose Profiles</div>
                    </div>
                    <div class='report-module-tips' >
                        <div class='report-module-tips' >
                        Daily blood glucose shows the daily fluctuations over the 15-day period.
                        </div>
                    </div>
                    <div class='day-chart-box'>
                        <DayChart :dataList='agpdayList'/>
                    </div>
                </div>
            </div>
            <!-- 参数解释 -->
            <div class='report-main-params' >
                <div class='report-main-params-title' >Parameter Explanation</div>
                <div class='report-main-params-item' >
                    1. Mean Glucose (MG): The average of glucose level during CGM wearing period. It is used to assess the effectiveness of diabetes management strategies. <br/>
                    2.Glucose Management Indicator (GMI): GMI has a strong correlation with HbA1c when wearing CGM for long time. It is used to evaluate overall blood sugar standards. <br/>
                    3.Coefficient of Variation (CV): It is calculated as the standard deviation divided by the mean glucose level，it is used to reflects blood glucose fluctuations. <br/>
                    4.Time In Range (TIR): The time or percentage of time when glucose levels are within the target range.<br/>
                    5.Time Above Range (TAR): The time or percentage of time when glucose levels are above the target range. <br/>
                    6.Time Below Range (TBR): The time or percentage of time when glucose levels are below the target range.<br/>
                </div>
                <div class='report-main-params-title' >References</div>
                <div class='report-main-params-item' >
                    Continuous glucose monitoring and metrics for clinical trials: an international consensus statement
                </div>
            </div>
        </div>
        <!-- 第二页 -->
        <div class='reports-box' :style='{height:pageTwoResultHeight*2375+"px"}'>
            <div class='report-main-title-infos' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >Daily Blood Glucose</div>
                <div class='report-main-date' >
                    {{info.start_date}}<div class='repart-main-dirver-box'><span class='repart-main-dirver' ></span></div>{{info.end_date}}({{info.total_day}})
                </div>
            </div>
            <div v-if='!empty' >
                <!--血糖总结  -->
                <div class='report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-text' >Daily Blood Glucose Summary</div>
                    </div>
                    <DaySummary :dataList='agpdayList'/>
                </div>
                <!-- 每日血糖图表 -->
                <div class='report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-text' >Daily Trend</div>
                    </div>
                    <div class='event-type' ref='eventTypes' >
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon0.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Meal</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon1.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Exercise</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon2.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Insulin</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon3.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Medicine</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon4.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Sleep</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon5.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Blood Glucose</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon6.png" alt="" class='event-icon' >
                            <p class='event-type-label' >Others</p>
                        </div>
                    </div>
                    <div v-for='(item,index) in pageTwoList' :key='index'   > 
                        <DayAnalysis :dataList='item' :eventList='item.events'  />
                    </div>
                </div>
            </div>
        </div>
         <!-- 第三页 -->
        <div v-if='pdfDayData.length>0&&pdfDayData[0].length>0' >
        <div class='reports-box' v-for='(item,indexs) in pdfDayData' :key='indexs' :style='{height:pageThreePage*2375+"px"}'>
            <div class='report-main-title-infos breakPage' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >Daily Blood Glucose</div>
                <div class='report-main-date' >
                    {{info.start_date}}<div class='repart-main-dirver-box'><span class='repart-main-dirver' ></span></div>{{info.end_date}}({{info.total_day}})
                </div>
            </div>
            <div v-if='!empty' >
                <!-- 每日血糖图表 -->
                <div class='report-main' >
                    <div v-for='(items,index) in item' :key='index'   > 
                        <DayAnalysis :dataList='items' :eventList='items.events' />
                    </div>
                </div>
            </div>
             <!-- 参数解释 -->
            <div class='report-main-params' v-if='indexs==pdfDayData.length-1' style='margin-top:30px;'>
                <div class='report-main-params-title' >Parameter Explanation</div>
                <div class='report-main-params-item' >
                    1. Mean Glucose (MG): The average of glucose level during CGM wearing period. It is used to assess the effectiveness of diabetes management strategies. <br/>
                    2.Glucose Management Indicator (GMI): GMI has a strong correlation with HbA1c when wearing CGM for long time. It is used to evaluate overall blood sugar standards. <br/>
                    3.Coefficient of Variation (CV): It is calculated as the standard deviation divided by the mean glucose level，it is used to reflects blood glucose fluctuations. <br/>
                    4.Time In Range (TIR): The time or percentage of time when glucose levels are within the target range.<br/>
                    5.Time Above Range (TAR): The time or percentage of time when glucose levels are above the target range. <br/>
                    6.Time Below Range (TBR): The time or percentage of time when glucose levels are below the target range.<br/>
                </div>
                <div class='report-main-params-title' >References</div>
                <div class='report-main-params-item' >
                    Continuous glucose monitoring and metrics for clinical trials: an international consensus statement
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import TIR from '@/views/components/Chart/TIR'
import AGP from '@/views/components/Chart/AGPchart'
import DayChart from '@/views/components/Chart/DayChart'
import DaySummary from '@/views/components/Chart/Daysummary'
import DayAnalysis from '@/views/components/Chart/dayAnalysis'
import { AGPUtils } from "@/utils/algorithm/AGP";
import { TIRUtils } from "@/utils/algorithm/TIR";
import { GlucoseUtils } from "@/utils/algorithm/Glucose";
import {getReportData} from '@/api/api'
import {formatDate,formatTime, formatEn,formatWeekEn} from '@/utils/formatTime'
export default {
    data(){
        return{
            bgInfo:'',
            info:{datas:[]},
            resultDay:'',
            unit:'',
            nowdate:'',
            target:[],
            originTarget:[],
            tir:{},
            agpList:{},
            agpdayList:[],
            empty:true,
            page:0,  //pdf页数，
            pageTwoList:[],
            pdfDayData:[],
            eventList:[],
            pageTwoResultHeight:1,
            pageThreePage:1
        }
    },
     components: {
        TIR,AGP,DayChart,DaySummary,DayAnalysis
    },
    mounted(){
        console.log(this.paramsValue('token'))
        this.getData(this.paramsValue('token'))
    },
    methods:{
       // 从云拉取数据
        getData(token){
            console.log(formatTime(new Date()),'请求数据')   
            this.loading = true
            getReportData({token:token}).then(response => {
							if(response.code == 1000){
                                this.loading = false
                                if(response.data.datas.length>0){
                                    console.log(formatTime(new Date()),'得到数据') 

                                    this.$timezone = response.data.timezone
                                    localStorage.setItem('timezone',response.data.timezone)
                                    let target = null
                                    if(response.data.glucose_unit==0){
                                        target = [GlucoseUtils.mgdlToMmol(response.data.glucose_range_lower_limit),GlucoseUtils.mgdlToMmol(response.data.glucose_range_lupper_limit)]
                                    }else{
                                        target = [response.data.glucose_range_lower_limit,response.data.glucose_range_lupper_limit]
                                    }
                                    this.target = target
                                    this.originTarget = [response.data.glucose_range_lower_limit,response.data.glucose_range_lupper_limit]
                                    let params = {
                                        nickname:response.data.nickname,
                                        diabetes_type:response.data.diabetes_type,
                                        age:response.data.age,
                                        diabetes_year:response.data.diabetes_year,
                                        glucose_range_lower_limit:target[0],
                                        glucose_range_lupper_limit:target[1],
                                        device_mac:response.data.device_mac,
                                        start_date:response.data.start_date,
                                        end_date:response.data.end_date,
                                        phone_model:response.data.phone_model,
                                        total_day:response.data.total_day
                                    }
                                    this.info =  params

                                    let unit = response.data.glucose_unit == 1?'mg/dL':'mmol/L'
                                    this.unit = unit

                                    this.nowdate = formatEn(new Date())

                                    let arrayData = response.data.datas
                                    let arrayDatas = _.uniqBy(_.orderBy(arrayData,'DataIndex','asc'),'DataTs')
                                    if(arrayData.length>0){
                                        this.empty = false
                                    }else{
                                        this.empty = true

                                    }
                                    let s = this.getZoneTime(response.data.timezone,response.data.start_date*1000)
                                    let e = this.getZoneTime(response.data.timezone,response.data.end_date*1000)
                                    this.info.start_date = formatEn(s)
                                    this.info.end_date = formatEn(e)
                                    if(arrayDatas.length>0){
                                        this.handelTemplateDay(this.handleData(arrayDatas,response.data.start_date,response.data.end_date),this.handelEventDay(response.data.events),this.handelWarningDay(response.data.bg_events))
                                        
                                    }
                                  
                                }
							}else{
                                this.loading = false
								this.$message({
                                    type: 'error',
                                    message: response.msg
								});
							}
            }).catch((res) => {
                console.log(res)
            })
        },

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
            let levelTooLowMg = 40
            let levelTooHighMg = 400
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
                } else if (item.Value < levelLowInvalidMg) {
                    result.push({
                    ...item,
                    value: null,
                    });
                } else if (item.Value > levelHighInvalidMg) {
                    result.push({
                    ...item,
                    value: null,
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
            let that = this
            let startTs = objects[0].DataTs;
            while (startTs - measuringInterval >= s_ts) {
                objects.unshift({
                DataTs: startTs - measuringInterval,
                value: undefined,
                Value:undefined
                });
                startTs = startTs - measuringInterval;
            }

            let endTs = objects[objects.length - 1].DataTs;
            while (endTs + measuringInterval < e_ts) {
                objects.push({
                DataTs: endTs + measuringInterval,
                value: undefined,
                Value:undefined
                });
                endTs = endTs + measuringInterval;
            }
            return objects;
        },
        // 自组件需要的数据
        handelTemplateDay(data,events,bg_events){
            this.handelAgp(data)
            this.handelTir(data)
            this.handelDay(data,events,bg_events)
            this.handelBg(data)
        },
        // agp图谱
        handelAgp(data){
            let datArray = _.cloneDeep(data)
            let newArr = []
            datArray.forEach((item,index)=>{
                if(index == index%1440){
                    newArr.push([datArray[index].Value])
                }else{
                    newArr[index%1440].push(datArray[index].Value)
                }
            })
            function momentAgp05(val){
                val = _.compact(val)
                return AGPUtils.calculateYValue(val)?AGPUtils.calculateYValue(val).p05:AGPUtils.calculateYValue(val)
            }
            function momentAgp25(val){
                val = _.compact(val)
                return AGPUtils.calculateYValue(val)?AGPUtils.calculateYValue(val).p25:AGPUtils.calculateYValue(val)
            }
            function momentAgp50(val){
                val = _.compact(val)
                return AGPUtils.calculateYValue(val)?AGPUtils.calculateYValue(val).p50:AGPUtils.calculateYValue(val)
            }
            function momentAgp75(val){
                val = _.compact(val)
                return AGPUtils.calculateYValue(val)?AGPUtils.calculateYValue(val).p75:AGPUtils.calculateYValue(val)
            }
            function momentAgp95(val){
                val = _.compact(val)
                return AGPUtils.calculateYValue(val)?AGPUtils.calculateYValue(val).p95:AGPUtils.calculateYValue(val)
            }
            let xData =  Array.from({length:60*24},(item, index) => index)
            let agp05 = _.map(newArr,momentAgp05)
            let agp25 = _.map(newArr,momentAgp25)
            let agp50 = _.map(newArr,momentAgp50)
            let agp75 = _.map(newArr,momentAgp75)
            let agp95 = _.map(newArr,momentAgp95)

            let params = {
                    xData:xData,
                    agp05:agp05,
                    agp25:agp25,
                    agp50:agp50,
                    agp75:agp75,
                    agp95:agp95,
                    target:this.target,
                    unit:this.unit
                }
            this.agpList = params
        },
        // tir
        handelTir(data){
            let tirTarget =  this.originTarget
            let datArrays = _.cloneDeep(data)
            let new_data = _.uniqBy(datArrays,'DataTs')
            let v_data = _.map(new_data,'Value')
            let result = TIRUtils.getTIRResult(_.compact(v_data),tirTarget[1],tirTarget[0])
            this.tir = result
            this.tir.unit = this.unit
            this.tir.target = this.target
        },
         // 计算总值为100
        handelRoundTir(result){
            let veryHighRate = (result.veryHighRate * 100).toFixed(1);
            let highRate = (result.highRate * 100).toFixed(1);
            let normalRate = (result.normalRate * 100).toFixed(1);
            let lowRate = (result.lowRate * 100).toFixed(1);
            let veryLowRate = (result.veryLowRate * 100).toFixed(1);

            var rateObjs = [
                {origV: result.veryHighRate * 100, resultV: veryHighRate},
                {origV: result.highRate * 100, resultV: highRate},
                {origV: result.normalRate * 100, resultV: normalRate},
                {origV: result.lowRate * 100, resultV: lowRate},
                {origV: result.veryLowRate * 100, resultV: veryLowRate},
            ];

            // 求和
            let rateSumMax = 100;
            let rateSum = rateObjs.reduce(function (total, rateObj) {
                return total + parseFloat(rateObj.resultV);
            }, 0);
            if (rateSum !== rateSumMax) {
                const changeValue = 0.1;
                let changeCount = 0;
                if (rateSum > rateSumMax) {
                // >100，5入的需减
                const changeRateCount =
                    parseFloat((rateSum - rateSumMax).toFixed(1)) / changeValue;
                rateObjs.forEach((rateObj, i) => {
                    if (
                    rateObj.resultV > changeValue &&
                    rateObj.resultV > rateObj.origV &&
                    changeCount < changeRateCount
                    ) {
                    rateObjs[i] = {
                        origV: rateObj.origV,
                        resultV: (parseFloat(rateObj.resultV) - changeValue).toFixed(1),
                    };
                    changeCount++;
                    }
                });
                } else {
                // <100，4舍的需加
                const changeRateCount =
                    parseFloat((rateSumMax - rateSum).toFixed(1)) / changeValue;
                rateObjs.forEach((rateObj, i) => {
                    if (
                    rateObj.resultV < rateObj.origV &&
                    changeCount < changeRateCount
                    ) {
                    rateObjs[i] = {
                        origV: rateObj.origV,
                        resultV: (parseFloat(rateObj.resultV) + changeValue).toFixed(1),
                    };
                    changeCount++;
                    }
                });
                }
                veryHighRate = rateObjs[0].resultV;
                highRate = rateObjs[1].resultV;
                normalRate = rateObjs[2].resultV;
                lowRate = rateObjs[3].resultV;
                veryLowRate = rateObjs[4].resultV;
            }
            return {
                veryHighRate,
                highRate,
                normalRate,
                lowRate,
                veryLowRate
            }
        },
        // 每日血糖
        handelDay(data,events,bg_events){
            let tirTarget =   this.originTarget
            let DdatArray = _.cloneDeep(data)
            let singleDay  = _.chunk(DdatArray,60*24) ;
            let max = _.maxBy(DdatArray,'Value').Value>540?540:_.maxBy(DdatArray,'Value').Value
            let dayList = new Array()
            let event_length = 0 //事件条数用来计算高度
            singleDay.forEach((item,index)=>{
                let value = _.map(item, 'value');
                let originValue = _.map(item, 'Value');
                let handelValue = _.compact(value)
                let eventArray = events[formatDate(item[0].DataTs*1000,'YYYY-mm-dd')]
                let bgEventsArray =bg_events?bg_events[formatDate(item[0].DataTs*1000,'YYYY-mm-dd')]:[]
                let e_l = eventArray==undefined?0:eventArray.length
                let b_e_l =  bgEventsArray==undefined?0:bgEventsArray.length
                event_length = e_l + b_e_l
                let all_events = null
                if(eventArray&&bgEventsArray){
                    all_events = _.concat(eventArray,bgEventsArray)
                }else if(eventArray){
                    all_events = eventArray
                }else{
                    all_events = bgEventsArray
                }
                let result = TIRUtils.getTIRResult(_.compact(originValue),tirTarget[1],tirTarget[0])?TIRUtils.getTIRResult(_.compact(originValue),tirTarget[1],tirTarget[0]):''
                dayList.push({
                    unit:this.unit,
                    target:this.target,
                    date:formatDate(item[0].DataTs*1000,'YYYY-mm-dd'),
                    day: formatDate(item[0].DataTs*1000,'mm-dd'),
                    week: formatWeekEn(item[0].DataTs*1000),
                    value:value,
                    resultValue:_.compact(originValue),
                    max:max,
                    tir:this.handelRoundTir(result).normalRate,
                    allTir:this.handelRoundTir(result),
                    pdfPage:Math.ceil((720+event_length*55)/2375),
                    height:720+event_length*55,
                    events:all_events
                })
            })
            this.agpdayList =  dayList
            console.log(dayList)
            this.padPage(dayList)
            this.resultDay = _.filter(dayList,function(o){return o.resultValue.length>0}).length
        },
        // pdf分页
        padPage(dayList){
           let pageTwoHeight = 1605 //剩余高度
           let pdfHeight = 2375
           let pdfDayData = [[]]
           let page = 0;
            dayList.forEach((item,index)=>{
                if(pageTwoHeight-item.height>0){
                        this.pageTwoList.push(item) //第二页的内容
                        this.pageTwoResultHeight = this.pageTwoList[0].pdfPage
                        pageTwoHeight = pageTwoHeight-item.height
                }else{  //剩余的进行分页处理
                    if(pdfHeight-item.height>0){
                        pdfDayData[page].push(item)
                    }else{
                        pdfHeight = 2375
                        page++
                        pdfDayData.push([item])
                    }
                    this.pageThreePage = pdfDayData.length>0?pdfDayData[0][0].pdfPage:1
                    pdfHeight = pdfHeight-item.height
                }
            
            })
            this.pdfDayData = pdfDayData
        },
        // 血糖数据
        handelBg(data){
            let BdatArray = _.cloneDeep(data)
            let originList = _.compact(_.map(BdatArray,'Value'))
            let bgInfo = GlucoseUtils.calculateMeanCvGmi(_.compact(_.map(BdatArray,'Value')))
            bgInfo.mean = Math.round(bgInfo.mean)
            let unit = this.unit
            if(unit=='mmol/L'){
                bgInfo.mean = GlucoseUtils.mgdlToMmol(bgInfo.mean)
            }
            let filteredArray = BdatArray.filter(item => item.Value >= 40 && item.Value <= 400);
            bgInfo.effective = _.round((filteredArray.length/originList.length)*100,1)
            bgInfo.allData = filteredArray
            this.bgInfo = bgInfo
        },
        // 全部事件分割为每天事件
        handelEventDay(datas){
           let data = _.clone(datas)
            let unit = this.unit
            let eventList ={};
            // let sameList = {}
            let sameList = []
            let repeatNum = 1
            let repeatTs = 0
            data.forEach((item,index)=>{
                let key = formatDate(item.event_ts*1000,'YYYY-mm-dd')
                let zeroTs = this.getZoneTime(this.$timezone,key).setHours(0,0,0)/1000
                item.xIndex = (item.event_ts-zeroTs)/60
                if(Math.abs(repeatTs-item.event_ts)<900){
                    repeatNum++
                }else{
                    repeatNum = 1
                }
                repeatTs = item.event_ts
                item.yPosition = unit=='mmol/L'?2*repeatNum:36*repeatNum
                item.type = 1 //普通事件
                if(eventList[key]){
                    eventList[key].push(item)
                }else{
                    eventList[key] = [item]
                }
            })
            return eventList
        },
        // 警告信息分割为每天事件
        handelWarningDay(datas){
            if(datas&&datas.length>0){
                let data = _.clone(datas)
                let unit = this.unit
                let warningList ={};
                let sameList = {}
                let repeatNum = 1
                data.forEach(item=>{
                    item.event_ts = item.message_ts
                    let key = formatDate(item.event_ts*1000,'YYYY-mm-dd')
                    if(sameList[item.event_ts]){
                        repeatNum++
                        sameList[item.event_ts].push(item)
                    }else{
                        repeatNum = 1
                        sameList[item.event_ts] = [item]
                    }
                    if(warningList[key]){
                        warningList[key].push(item)
                    }else{
                        warningList[key] = [item]
                    }
                    item.type = 2 //报警事件
                })
                return warningList
            }else{
                return []
            }
            
        },
        // 根据时区获取当前时间
        // 北京是getZoneTime(8),纽约是getZoneTime(-5),班加罗尔是getZoneTime(5.5). 偏移值是本时区相对于格林尼治所在时区的时区差值
        getZoneTime(offset,date){
            // 取本地时间
            var localtime = new Date(date)||new Date();  
            // 取本地毫秒数
            var localmesc = localtime.getTime(); 
            // 取本地时区与格林尼治所在时区的偏差毫秒数
            var localOffset = localtime.getTimezoneOffset() * 60000; 
            // 反推得到格林尼治时间
            var utc = localOffset + localmesc; 
            // 得到指定时区时间
            var calctime = utc + (3600000*offset);  
            var nd = new Date(calctime);  
            return nd
        },
        // 获取指定时区的零点

        getMidnightInTimeZone(offset) {
            const now = new Date();
            const timezoneOffset = now.getTimezoneOffset() * 60000; // 转换为毫秒
            const timezoneOffsetInMs = timezone === '+8' ? timezoneOffset : timezoneOffset - now.getTimezoneOffset() * 60000;
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
            const midnightInTimezone = new Date(midnight.getTime() - midnight.getTimezoneOffset() * 60000 + timezoneOffsetInMs);
            return midnightInTimezone;
        },
        // cgm有效时间占比
        handel(dataArray){
            let filteredArray = dataArray.filter(val => val >= 40 && val <= 400);
            this.bgInfo.effective = _.round((filteredArray.length/dataArray.length)*100,1)
        },
        // 获取地址栏参数
        paramsValue(paramName){
            const searchUrl =  window.location.hash.split("?")[1];
            const searchParams = searchUrl.split('&');
            const paramsObj = {};
            searchParams.forEach(param => {
                const [key, value] = param.split('=');
                paramsObj[key] = value;
            });
            const paramValue = paramsObj[paramName];
            return paramValue
        }
    }
}
</script>
<style scoped>
.test{
    margin:0 auto;
    display: block;
    position: absolute;
    opacity: 0;
    left:0;
    top:0;
}
 @media print {
        #report {
            /* transform: scale(0.35);
            transform-origin: top center; */
            -webkit-print-color-adjuset:exact;
            color-adjust: exact;
        }
    }
/* 内容框设置 */
    #report{
        width:1680px;
        /* height:2375px; */
        background:#fff;
        margin:0 auto; 
        overflow: hidden;
        box-sizing: border-box;
        padding:0 80px 0 80px;
        position: relative;
       
    }
    .reports-box{
        height:2375px;
        overflow: hidden;
        position: relative;
    }
    .report-main{
        box-sizing: border-box;
        padding:24px 20px 0 20px;
    }
/* 头部信息 */
    .report-main-title-infos{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom:20px;
        margin-top:73px;
        height:66px;
        position: relative;
    }
    .report-logo{
        width:194px;
        height:50px;
        display: block;
    }
    .report-main-title{
        font-size:50px;
        color:var(--color-primary);
        /* font-family:MiLan-Medium; */
        font-weight: 440;
        text-align: center;
        position: absolute;
        left:0;
        top:0;
        width:100%;
    }
    .report-main-date{
        font-size:20px;
        color:var(--color-black-100);
        display: flex;
        align-items: center;
    }
    .repart-main-dirver-box{
        width:20px;
        height:20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin:0 2px;
    }
    .repart-main-dirver{
        width:16px;
        height:1px;
        background:var(--color-black-100);
    }
/* 模块标题 */
    .report-module-title{
        width:100%;
        height:50px;
        border-radius:4px;
        background:var(--color-primary);
        display: flex;
        align-items: center;
    }
    .report-module-title-border{
        width:3px;
        height:24px;
        background:var(--color-primary);
        margin-left:10px;
    }
    .report-module-title-text{
        font-size:20px;
        color:#fff;
        /* font-family:MiLan-Medium; */
        margin-left:20px;
        font-weight: 700;
    }
    .report-module-tips{
        font-size:16px;
        color:var(--color-black-60);
        padding:5px 0 0 10px;
    }
    .report-module-tips-only{
        padding:10px 0 0 10px;
    }
/* 基本信息 */
    .report-main-base-info{
        width:100%;
    }
    .report-base-user{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:20px 0;
        height:35px;
        box-sizing: border-box;
        padding:0px 20px 0px 10px;
    }
    .report-base-user-item{
        display: flex;
        align-items: center;
        font-size:20px;
    }
    .report-base-user-label{
        color:var(--color-black-60);
    }
    .report-base-user-value{
        color:var(--color-black-100);
         font-family:MiLan-Medium;
    }
    .report-data-source{
        width:100%;
        height:52px;
        padding-left:20px;
        padding-right:60px;
        background:#f7f7f7;
        display: grid;
        grid-template-rows:1;
        grid-template-columns:2fr 2fr 1fr;

    }
    .report-data-sources{
        width:100%;
        height:52px;
        padding-left:20px;
        padding-right:60px;
        display: grid;
        grid-template-rows:1;
        grid-template-columns:2fr 2fr 1fr;
    }
/* 血糖数据、TIR */
    .report-main-data-tir-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .report-main-data-tir{
        width:750px;
        height:446px;
    }
    .report-main-data-list{
        width:690px;
        height:75px;
        box-sizing: border-box;
        margin:0 auto;
        border-bottom:1px solid rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .report-main-data-list:last-child{
        border: none;
    }
    .report-main-data-label-text{
        font-size:20px;
        color:var(--color-black-100);
        height:27px;
        line-height: 27px;
        font-family:MiLan-Medium;
    }
    .report-main-data-label-tip{
        font-size:16px;
        color:var(--color-black-60);
        height:18px;
        line-height: 18px;
    }
    .report-main-data-val{
        font-size:24px;
        color:var(--color-black-100);
        font-weight: 440;
        font-family:MiLan-Medium;
    }
    .report-main-data-val.active{
        color: var(--color-error);
    }
    .tir-box{
        padding:20px 0 0 20px;
    }
/* agp图谱 */
    .report-main-agp{
        width:100%;
        height:567px;
    }
    .agp-box{
        margin-top:20px;
    }
/* 每日血糖曲线 */
    .report-main-day{
        width:100%;
        height:691px;
        overflow: hidden;
    }
    .day-chart-box{
        margin-top:16px;
    }
/* 参数解释 */
    .report-main-params{
        width:1480px;
        height:239px;
        background:#f7f7f7;
        border-radius:10px;
        padding:26px 20px 20px 20px;
        margin:0 auto;
    }
    .report-main-params-title{
        font-size:16px;
        color:var(--color-black-100);
        line-height: 21px;
    }
     .report-main-params-item{
        font-size:16px;
        color:var(--color-black-60);
        line-height: 21px;
        margin-bottom:8px;
     }
/* 事件图标 */
    .event-type{
        display: flex;
        align-items: center;
        margin-top:20px;
    }
    .event-type-item{
        display: flex;
        align-items: center;
        margin-right:30px;
    }
    .event-icon{
        width:30px;
        height:30px;
    }
    .event-type-label{
        font-size:var(--fontSize-default);
        color: var(--color-black-60);
        margin-left:6px;
    }
    .breakPage{
        /* break-before: page; */
    }
</style>
