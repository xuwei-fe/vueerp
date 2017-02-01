<style lang="less" scoped>
.full-calendar-body{
    margin-top: 20px;
    .weekend .day-number {
        color: red;
    }
    .weeks{
        display: flex;
        border-top:1px solid #e0e0e0;
        border-bottom:1px solid #e0e0e0;
        border-left:1px solid #e0e0e0;
        .week{
            flex:1;
            text-align: center;
            border-right:1px solid #e0e0e0;
            padding: 5px 0;
        }
        .week:first-child,
        .week:last-child {
            color: red;
        }
    }
    .dates {
        position: relative;
        .week-row {
            border-left:1px solid #e0e0e0;
            display: flex;
            .day-cell {
                flex:1;
                min-height: 100px;
                padding:4px;
                border-right:1px solid #e0e0e0;
                border-bottom:1px solid #e0e0e0;
            }
        }
        /* dates-events begin */
        .dates-events {
            position:absolute;
            top:0;
            left:0;
            z-index:1;
            width: 100%;
            .events-week {
                display: flex;
                .events-day{
                    cursor: pointer;
                    flex:1;
                    min-height: 109px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    position: relative;
                    .day-number {
                        position: absolute;
                        text-align: right;
                        padding:4px 5px 4px 4px;
                        bottom: 0;
                        right: 0;
                    }
                    &.not-cur-month {
                        .day-number {
                            color:rgba(0,0,0,.24);
                        }
                    }
                    .event-box {
                        .event-item {
                            cursor: pointer;
                            font-size:12px;
                            background-color:#C7E6FD;
                            margin-bottom:2px;
                            color: rgba(0,0,0,.87);
                            padding:0 0 0 4px;
                            height: 18px;
                            line-height: 18px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &.is-start {
                                margin-left: 4px;
                            }
                            &.is-end {
                                margin-right: 4px;
                            }
                            &.is-opacity {
                                opacity: 0;
                            }
                        }
                    }
                }
            }
        }
        /* more-events begin */
        .more-events{
            position:absolute;
            right: 0;
            top: 0;
            width: 300px;
            z-index: 1000;
            border:1px solid #eee;
            box-shadow: 0 2px 6px rgba(0,0,0,.15);
            .more-header {
                background-color: #eee;
                padding: 5px;
                display: flex;
                align-items : center;
                font-size: 14px;
                .title {
                    flex:1;
                }
                .close{
                    margin-right: 2px;
                    cursor: pointer;
                    font-size: 16px;
                }
            }
            .more-body{
                overflow: hidden;
                background-color:#fff;
                .body-list{
                    padding: 5px;
                    overflow: auto;
                    background-color:#fff;
                    .body-item {
                        cursor: pointer;
                        font-size:12px;
                        margin-bottom:2px;
                        color: rgba(0,0,0,.87);
                        padding:0 0 0 4px;
                        line-height: 18px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div>

        <div class="full-calendar-body">
            <!--显示日历星期 -->
            <div class="weeks">
                <strong class="week" v-for="week in weekNames">{{week}}</strong>
            </div>

            <!-- 显示所有日期 -->
            <div class="dates" ref="dates">
                <div class="dates-bg">
                    <!-- 每行的日期 -->
                    <div class="week-row" v-for="week in currentDates">
                        <div class="day-cell" v-for="day in week"
                            :class="{'today' : day.isToday, 'not-cur-month' : !day.isCurMonth, 'weekend' : day.isWeekend}">
                            <!--<p class="day-number">{{day.monthDay}}</p>-->
                        </div>
                    </div>
                </div>
                
                <!-- 显示日历上的信息absolute so we can make dynamic td -->
                <div class="dates-events">
                    <div class="events-week" v-for="week in currentDates">
                        <div class="events-day" 
                        v-for="day in week" 
                        track-by="$index"
                        :class="{'today' : day.isToday, 'not-cur-month' : !day.isCurMonth, 'weekend' : day.isWeekend}" 
                        @click.stop="dayClick(day, $event)">
                            <p class="day-number">{{day.monthDay}}</p>
                            <div class="event-box">
                                <p class="event-item" v-for="event in day.events"
                                    :class="[classNames(event.cssClass), {
                                    'is-start'   : isStart(event.start, day.date),
                                    'is-end'     : isEnd(event.end,day.date),
                                    'is-opacity' : !event.isShow
                                    }]">
                                    {{isBegin(event, day.date, day.weekDay)}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 点击day展示更多信息-->
                <div class="more-events" v-show="showMore">
                    <div class="more-header">
                        <span class="title">{{moreTitle(selectDay.date)}}</span>
                        <span class="close" @click.stop="showMore = false">x</span>
                    </div>
                    <div class="more-body">
                        <ul class="body-list">
                            <li v-for="event in selectDay.events" v-show="event.isShow" class="body-item">
                                <p v-for="item in event.detail">
                                    <span>打卡时间：{{ item.RecordTime }}</span>
                                    <span>{{ item.Direction | formatDirection}} 口</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
    import langSets from '../dataMap/langSets'
    import dateFunc from './dateFunc'
    export default {
        props: {
            currentDate: {},
            events : { // events will be displayed on calendar
                type : Array,
                default : []
            },
            lang : {
                type : String,
                default : 'en'
            },
            firstDay : {
                type : Number | String,
                validator (val) {
                    let res = parseInt(val)
                    return res >= 0 && res <= 6
                },
                default : 0
            },
            titleFormat : {
                type : String,
                default () {
                    return langSets[this.lang].titleFormat
                }
            },
            monthNames : {
                type : Array,
                default () {
                    return langSets[this.lang].monthNames
                } 
            },
            weekNames : {
                type : Array,
                default () {
                    let arr = langSets[this.lang].weekNames
                    return arr.slice(this.firstDay).concat(arr.slice(0, this.firstDay))
                }
            },
        },
        data () {
            return {
                weekMask : [1,2,3,4,5,6,7],
                selectDay : {},
                showMore : false,
                moreList: []
            }
        },
        filters: {
			formatDirection: function(value){
				if (!value) return ''
				if(value === 'I'){
					return '进'
				}
				if(value === 'O'){
					return '出'
				}
			}
		},
        computed : {
            currentDates () {
                return this.getCalendar()
            }
        },
        methods : {
            getCalendar () {
                // calculate 2d-array of each month
                // first day of this month
                let now = new Date() // today
                let current = new Date(this.currentDate)

                let startDate = dateFunc.getStartDate(current) // 1st day of this month

                let curWeekDay = startDate.getDay()

                // begin date of this table may be some day of last month
                let diff = parseInt(this.firstDay) - curWeekDay
                diff = diff > 0 ? (diff - 7) : diff

                startDate.setDate(startDate.getDate() + diff)
                let calendar = []

                for(let perWeek = 0 ; perWeek < 6 ; perWeek++) {

                    let week = []
                    let weekend = false
                    for(let perDay = 0 ; perDay < 7 ; perDay++) {
                        if(perDay == 0 || perDay == 6){
                            weekend = true
                        }else{
                            weekend = false
                        }
                        week.push({
                            monthDay : startDate.getDate(),
                            isToday : now.toDateString() == startDate.toDateString(),
                            isCurMonth : startDate.getMonth() == current.getMonth(),
                            weekDay : perDay,
                            date : new Date(startDate),
                            events : this.slotEvents(startDate),
                            isWeekend: weekend
                        })

                        startDate.setDate(startDate.getDate() + 1)
                    }
                    calendar.push(week)
               
                }
                return calendar
            },
            slotEvents (date) {
                // find all events start from this date
                let cellIndexArr = []
                let thisDayEvents = this.events.filter(day => {
                    let dt = new Date(day.start)
                    let st = new Date(dt.getFullYear(),dt.getMonth(),dt.getDate())
                    let ed = day.end ? new Date(day.end) : st
                    // console.log('slotEvt', st, ed, date)
                    return date>=st && date<=ed
                })

                // sort by duration
                thisDayEvents.sort((a,b)=>{
                    if(!a.cellIndex) return 1
                    if (!b.cellIndex) return -1
                    return a.cellIndex - b.cellIndex
                })

                // mark cellIndex and place holder
                for (let i = 0;i<thisDayEvents.length;i++) {
                    thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
                    thisDayEvents[i].isShow = true
                    if (thisDayEvents[i].cellIndex == i+1 || i>2) continue
                    thisDayEvents.splice(i,0,{
                        title : 'holder',
                        cellIndex : i+1,
                        start : dateFunc.format(date,'yyyy-MM-dd'),
                        end : dateFunc.format(date,'yyyy-MM-dd'),
                        isShow : false
                    })
                }

                return thisDayEvents
            },
            isStart (eventDate, date) {
                let st = new Date(eventDate)
                return st.toDateString() == date.toDateString()
            },
            isEnd (eventDate,date) {
                let ed = new Date(eventDate)
                return ed.toDateString() == date.toDateString()
            },
            isBegin (event, date, index) {
                let st = new Date(event.start)

                if (index == 0 || st.toDateString() == date.toDateString()) {
                    return event.title
                }
                return '　'
            },
            classNames (cssClass) {
                if(!cssClass) return ''
                // string  
                if (typeof cssClass == 'string') return cssClass

                // Array
                if (Array.isArray(cssClass)) return cssClass.join(' ')
                
                // else
                return ''
            },
            dayClick(day, jsEvent) {
                this.selectDay = day
                this.showMore = true
                let events = day.events.filter(item =>{
                    return item.isShow == true
                })
                this.moreList = events.detail
                this.$emit('dayClick', day, jsEvent)
            },
            moreTitle (date) {
                let dt = new Date(date)
                console.log('dt'+dt)
                return dt.getFullYear() + '年' + this.monthNames[dt.getMonth()] + dt.getDate() + '日' + ' 考勤记录'
            },
        },
    }
  
</script>
<style lang="less" scoped>

</style>