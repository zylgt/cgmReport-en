<template>
    <div id='report' ref='report'>
        <div v-if='!empty' >
         
        </div>
        <!-- 第一页 -->
        <div class='reports-box'>
            <div class='report-main-title-infos' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >动态葡萄糖监测报告</div>
                <div class='report-main-date' >
                    {{info.start_date}}<div class='repart-main-dirver-box'><span class='repart-main-dirver' ></span></div>{{info.end_date}}({{info.total_day}})
                </div>
            </div>
            <div v-if='!empty' >
                <!-- 基本信息 -->
                <div class='report-main-base-info report-main' ref='test'>
                    <div class='report-module-title'  >
                        <div class='report-module-title-text' >基本信息</div>
                    </div>
                    <div class='report-base-user' >
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>姓名：</div>
                            <div class='report-base-user-value'>{{info.nickname?info.nickname:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>年龄：</div>
                            <div class='report-base-user-value'>{{info.age?info.age:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>糖尿病类型：</div>
                            <div class='report-base-user-value'>{{info.diabetes_type?info.diabetes_type:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>病程：</div>
                            <div class='report-base-user-value'>{{info.diabetes_year?info.diabetes_year:'--'}}</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>葡萄糖目标范围：</div>
                            <div class='report-base-user-value'>{{info.glucose_range_lower_limit}}-{{info.glucose_range_lupper_limit}}{{unit}}</div>
                        </div>  
                    </div>
                    <div class='report-data-source'>
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>监测仪序列号：</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>数据来源：</div>
                        </div>  
                        <div class='report-base-user-item' >
                            <div class='report-base-user-label'>生成时间：</div>
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
                            <div class='report-base-user-value'>{{nowdate}}</div>
                        </div>  
                    </div>
                </div>
                <!-- 血糖数据、TIR -->
                <div class='report-main-data-tir-box' >
                    <div class='report-main-data-tir report-main' >
                        <div class='report-module-title' >
                            <div class='report-module-title-text' >血糖数据</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >CGM佩戴天数：</div>
                            </div>
                            <div class='report-main-data-val'>{{info.total_day}}</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >CGM有效记录的时间占比：</div>
                                <div class='report-main-data-label-tip' >目标值>70%才可得到有效数据分析</div>
                            </div>
                            <div :class='[bgInfo.effective>70?"":"active","report-main-data-val"]'>{{bgInfo.effective}}%</div>
                        </div>
                        <div class='report-main-data-list' v-if='unit=="mg/dL"' >
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >MG 平均葡萄糖值：</div>
                                <div class='report-main-data-label-tip' >目标值＜118 mg/dL</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.mean}}mg/dL</div>
                        </div>
                        <div class='report-main-data-list' v-else>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >MG 平均葡萄糖值：</div>
                                <div class='report-main-data-label-tip' >目标值＜6.6mmol/L</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.mean}}mmol/L</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >GMI 葡萄糖管理指标:</div>
                                <div class='report-main-data-label-tip' >目标值＜7%</div>
                            </div>
                            <div class='report-main-data-val'>{{resultDay>=10?bgInfo.GMI+'%':'无足够数据'}}</div>
                        </div>
                        <div class='report-main-data-list'>
                            <div class='report-main-data-label'>
                                <div class='report-main-data-label-text' >CV 变异系数：</div>
                                <div class='report-main-data-label-tip' >目标值＜33%</div>
                            </div>
                            <div class='report-main-data-val'>{{bgInfo.CV}}%</div>
                        </div>
                    </div>
                    <div class='report-main-data-tir report-main' >
                        <div class='report-module-title' >
                            <div class='report-module-title-border' ></div>
                            <div class='report-module-title-text' >葡萄糖目标范围内时间</div>
                        </div>
                        <div class='report-module-tips report-module-tips-only' >
                            葡萄糖目标范围内占比越高，代表血糖控制的越好。
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
                        <div class='report-module-title-text' >AGP图谱</div>
                    </div>
                    <div class='report-module-tips' >
                            <div class='report-module-tips' >
                            中位数葡萄糖曲位于目标范围内，且越平坦，表示血糖稳定性越好。25%-75%区间（图中深蓝色区域）与5%-95%区间（图中浅蓝色区域）均显示日间血糖波动情况，区间越宽提示相应时间段血糖波动越大。其中影响 25%-75%区间的因素主要是是生理状态(如胰岛素抵抗等)和药物治疗等。影响5%-95%区间的因素主要是饮食，运动等。
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
                        <div class='report-module-title-text' >每日血糖简图</div>
                    </div>
                    <div class='report-module-tips' >
                        <div class='report-module-tips' >
                        每日血糖展示了15天中每天的血糖变化情况。
                        </div>
                    </div>
                    <div class='day-chart-box'>
                        <DayChart :dataList='agpdayList'/>
                    </div>
                </div>
            </div>
            <!-- 参数解释 -->
            <div class='report-main-params' >
                <div class='report-main-params-title' >参数解释</div>
                <div class='report-main-params-item' >
                    1.平均葡萄糖值（MG）：CGM 监测期间所有葡萄糖值的平均值，用于评价整体血糖水平。<br/>
                    2.葡萄糖管理指标（GMI）：预估糖化血红蛋白(eHbA1c)，根据 CGM 葡萄糖读数估算 HbA1c，用于评价整体血糖水平<br/>
                    3.变异系数(CV)：葡萄糖标准差与平均葡萄糖比值所得百分数，用于评价血糖波动。<br/>
                    4.葡萄糖目标范围内百分比(TIR)：指葡萄糖在目标范围内的时间或其所占的百分比，<br/>
                    5.葡萄糖高于目标范围百分比(TAR)：指葡萄糖高于目标范围的时间或其所占的百分比<br/>
                    6.葡萄糖低于目标范围百分比(TBR):指葡萄糖低于目标范围的时间或其所占的百分比。<br/>
                </div>
                <div class='report-main-params-title' >参考文献</div>
                <div class='report-main-params-item' >
                    动态葡萄糖图谱报告临床应用专家共识（2023版）
                </div>
            </div>
        </div>
        <!-- 第二页 -->
        <div class='reports-box' >
            <div class='report-main-title-infos' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >动态葡萄糖监测报告</div>
                <div class='report-main-date' >
                    {{info.start_date}}<div class='repart-main-dirver-box'><span class='repart-main-dirver' ></span></div>{{info.end_date}}({{info.total_day}})
                </div>
            </div>
            <div v-if='!empty' >
                <!--血糖总结  -->
                <div class='report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-text' >每日血糖总结</div>
                    </div>
                    <DaySummary :dataList='agpdayList'/>
                </div>
                <!-- 每日血糖图表 -->
                <div class='report-main' >
                    <div class='report-module-title' >
                        <div class='report-module-title-text' >每日血糖图表</div>
                    </div>
                    <div class='event-type' ref='eventTypes' >
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon0.png" alt="" class='event-icon' >
                            <p class='event-type-label' >饮食记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon1.png" alt="" class='event-icon' >
                            <p class='event-type-label' >运动记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon2.png" alt="" class='event-icon' >
                            <p class='event-type-label' >胰岛素记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon3.png" alt="" class='event-icon' >
                            <p class='event-type-label' >用药记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon4.png" alt="" class='event-icon' >
                            <p class='event-type-label' >睡眠记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon5.png" alt="" class='event-icon' >
                            <p class='event-type-label' >指尖血记录</p>
                        </div>
                        <div class='event-type-item' >
                            <img src="~@/assets/image/event-icon6.png" alt="" class='event-icon' >
                            <p class='event-type-label' >其他事件</p>
                        </div>
                    </div>
                    <div v-for='(item,index) in pageTwoList' :key='index'   > 
                        <DayAnalysis :dataList='item' :eventList='item.events'  />
                    </div>
                </div>
            </div>
        </div>
         <!-- 第三页 -->
        <div class='reports-box' v-for='(item,indexs) in pdfDayData' :key='item.height'>
            <div class='report-main-title-infos breakPage' >
                <img src="~@/assets/image/report-logo.png" alt="" class='report-logo' >
                <div class='report-main-title' >动态葡萄糖监测报告</div>
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
            <div class='report-main-params' v-if='indexs==pdfDayData.length-1'>
                <div class='report-main-params-title' >参数解释</div>
                <div class='report-main-params-item' >
                    1.平均葡萄糖值（MG）：CGM 监测期间所有葡萄糖值的平均值，用于评价整体血糖水平。<br/>
                    2.葡萄糖管理指标（GMI）：预估糖化血红蛋白(eHbA1c)，根据 CGM 葡萄糖读数估算 HbA1c，用于评价整体血糖水平<br/>
                    3.变异系数(CV)：葡萄糖标准差与平均葡萄糖比值所得百分数，用于评价血糖波动。<br/>
                    4.葡萄糖目标范围内百分比(TIR)：指葡萄糖在目标范围内的时间或其所占的百分比，<br/>
                    5.葡萄糖高于目标范围百分比(TAR)：指葡萄糖高于目标范围的时间或其所占的百分比<br/>
                    6.葡萄糖低于目标范围百分比(TBR):指葡萄糖低于目标范围的时间或其所占的百分比。<br/>
                </div>
                <div class='report-main-params-title' >参考文献</div>
                <div class='report-main-params-item' >
                    动态葡萄糖图谱报告临床应用专家共识（2023版）
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
import {formatDate,formatTime} from '@/utils/formatTime'
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

                                    this.nowdate =  formatDate(new Date() ,'YYYY年mm月dd日') 

                                    let arrayData = response.data.datas
                                    if(arrayData.length>0){
                                        this.empty = false
                                    }else{
                                        this.empty = true
                                    }
                                    let s_n = response.data.start_date.replace(/[年月]/g,"-");
                                    let s_t = s_n.replace(/[日]/g,"");
                                    let e_n = response.data.end_date.replace(/[年月]/g,"-");
                                    let e_t = e_n.replace(/[日]/g,"");
                                    let s = response.data.start_date.indexOf('年')==-1?this.getZoneTime(response.data.timezone,response.data.start_date):this.getZoneTime(response.data.timezone,s_t)
                                    let e = response.data.end_date.indexOf('年')==-1?this.getZoneTime(response.data.timezone,response.data.end_date):this.getZoneTime(response.data.timezone,e_t)
                                    let s_date = s.setHours(0,0,0)/1000
                                    let e_date = e.setHours(23,59,59)/1000
                                    if(arrayData.length>0){
                                        this.handelTemplateDay(this.handleData(arrayData,s_date,e_date),this.handelEventDay(response.data.events),this.handelWarningDay(response.data.bg_events))
                                        
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
            let levelLowInvalidMg = 36
            let levelHighInvalidMg = 540
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
                    week: formatDate(item[0].DataTs*1000,'WW'),
                    value:value,
                    resultValue:_.compact(originValue),
                    max:max,
                    tir:this.handelRoundTir(result).normalRate,
                    height:720+event_length*55,
                    events:all_events
                })
            })
            this.agpdayList =  dayList
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
                        pageTwoHeight = pageTwoHeight-item.height
                }else{  //剩余的进行分页处理
                    if(pdfHeight-item.height>0){
                        pdfDayData[page].push(item)
                    }else{
                        pdfHeight = 2375
                        page++
                        pdfDayData.push([item])
                    }
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
            let filteredArray = BdatArray.filter(item => item.Value >= 36 && item.Value <= 540);
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
                    let zeroTs = this.getZoneTime(this.$timezone,key).setHours(0,0,0)/1000
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
        // cgm有效时间占比
        handel(dataArray){
            let filteredArray = dataArray.filter(val => val >= 36 && val <= 540);
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
        width:158px;
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
