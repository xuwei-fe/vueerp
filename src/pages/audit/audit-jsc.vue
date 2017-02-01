<style scoped>
.m_fl{
	float: left;
}
.m_fr{
	float: right;
}
.main_box{
	position: absolute;
	width:1200px;
	height:736px;
	left:50%;
	top:50%; 
	margin-left:-600px;
	margin-top:-368px;
	background: #0D2D53;
	} 
.main_box .toptitle{
	width: 1200px;
	height: 74px;
	background: #1A6DCD;
}
.main_box .main-center{
	width: 1200px;
}
.main_box .main-left{
	width: 458px;
	height: 660px;
	padding-left: 20px;
}
.main_box .main-left .nowinfo{
	width: 458px;
	height: 428px;
	margin-bottom: 10px;
	background: #38B8E7;
}
.main_box .main-left .otherinfo{
	width: 458px;
}
.main_box .main-left .otherinfo .infoc{
	width: 222px; 
	height: 208px;
	border: 1px solid #1E4D77;
}
.main_box .main-right{
	width: 706px;
	height: 660px;
	padding-right: 12px;
}
.main_box .main-right .infoc{
	width: 222px; 
	height: 208px;
	border: 1px solid #1E4D77;
	margin: 0 5px 9px 5px;
}
</style>
<template>
	<div class="main_box">
		<div class="toptitle"></div>
		<div class="main-center">
			<div class="main-left m_fl">
				<div class="nowinfo">
				</div>
				<div class="otherinfo">
					<div class="infoc m_fl" id="GroupByAreas"></div>
					<div class="infoc m_fr" id="LabourPostResult"></div>
				</div>
			</div>
			<div class="main-right m_fr">
				<div class="infoc m_fl"></div>
				<div class="infoc m_fl"></div>
				<div class="infoc m_fl" id="PerRateByWorkType"></div>
				<div class="infoc m_fl" id="AttendanceList"></div>
				<div class="infoc m_fl" id="ListGroupBySexAge"></div>
				<div class="infoc m_fl" id="ListGroupByNative"></div>
				<div class="infoc m_fl" id="DutyListMonth"></div>
				<div class="infoc m_fl" id="GdpPostResult"></div>
				<div class="infoc m_fl" id="GetWailaiWResult"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	import echarts from 'echarts'
	export default {
		data: function () {
			return {
				GroupByAreasUrl: global.host + 'Cockpit/GetListGroupByArea',
				LabourPostResultUrl: global.host + 'Cockpit/GetLabourPostResult',
				DutyListMonthUrl: global.host + 'Cockpit/GetDutyListMonth',
				GdpPostResultUrl: global.host + 'Cockpit/GetGdpPostResult',
				GetWailaiWResultUrl: global.host + 'Cockpit/GetWailaiWResult',
				ListGroupByNativeUrl: global.host + 'Cockpit/GetListGroupByNative',
				ListGroupBySexAgeUrl: global.host + 'Cockpit/GetListGroupBySexAge',
				AttendanceListUrl: global.host + 'Cockpit/GetAttendanceList',
				PerRateByWorkTypeUrl: global.host + 'Cockpit/GetPerRateByWorkType',
				GroupByAreas: null,
				GroupByAreasOption: null,
				LabourPostResult: null,
				LabourPostResultOption: null,
				DutyListMonth: null,
				DutyListMonthOption: null,
				GdpPostResult: null,
				GdpPostResultOption: null,
				WailaiWResult: null,
				WailaiWResultOption: null,
				ListGroupByNative: null,
				ListGroupByNativeOption: null,
				ListGroupBySexAge: null,
				ListGroupBySexAgeOption: null,
				AttendanceList: null,
				AttendanceListOption: null,
				PerRateByWorkType: null,
				PerRateByWorkTypeOption: null
			}
		},
		computed: mapState({ user: state => state.user }),
		created() {
			this.GroupByAreasinfo()
			this.LabourPostResultinfo()
			this.DutyListMonthinfo()
			this.GdpPostResultinfo()
			this.WailaiWResultinfo()
			this.ListGroupByNativeinfo()
			this.ListGroupBySexAgeinfo()
			this.AttendanceListinfo()
			this.PerRateByWorkTypeinfo()
		},
		methods: {
			GroupByAreasinfo: function () {
				var vm = this
				vm.$http.get(vm.GroupByAreasUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var Area = [], count = [], resdata = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						Area[i] = vm.workinfo[i].Area
						count[i] = vm.workinfo[i].EmployeeCount
						resdata[i] = { 'name': Area[i], 'value': count[i] }
					}
					vm.GroupByAreasOption.series.push({
						name: '根据区域分析',
						type: "pie",
						radius: '35%',
						center: ['50%', '60%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									color: '#fff',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontFamily: 'sans-serif',
									fontSize: 12,
								}
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 10
							}
						},
						itemStyle: {
							normal: {
								label: {
									show: true,
									//formatter: '{b}:{d}%'
									formatter: '{d}%'
								}
							},
						},
						data: resdata
					})
					vm.GroupByAreas.setOption(vm.GroupByAreasOption)
				}).catch(function (response) {
					console.log(response)
				})
			},
			LabourPostResultinfo: function () {
				var vm = this
				vm.$http.get(vm.LabourPostResultUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var oldcity = ['全国'], newcity = [], oldcountry = [], newcountry = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						newcity = vm.workinfo[i].City
						oldcountry[0] = vm.workinfo[i].LastYearValue
						newcountry = vm.workinfo[i].WholeEmployeeValue
						oldcity.push(newcity)
						oldcountry.push(newcountry)
					}
					vm.LabourPostResult.setOption({
						yAxis: {
							data: oldcity
						},
						series: [{
							name: '',
							type: 'bar',
							barWidth: '40%',
							data: oldcountry,
							itemStyle: {
								normal: {
									color: function (params) {
										var colorList = [
											'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
											'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
											'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
										];
										return colorList[params.dataIndex]
									}
								}
							},
							label: {
								normal: {
									show: true,
									position: 'right',
									textStyle: {
										color: '#fff',
										fontSize: 12
									}
								}
							}
						}]
					})
				}).catch(function (response) {
					console.log(response)
				})
			},
			DutyListMonthinfo: function () {
				var vm = this
				vm.$http.get(vm.DutyListMonthUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var mday = [], count = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						mday[i] = vm.workinfo[i].RecDutyDay.slice(5, 10)
						count[i] = vm.workinfo[i].RecDutyCount
					}
					vm.DutyListMonth.setOption({
						xAxis: {
							data: mday
						},
						series: [{
							name: '当天考勤人数',
							type: 'line',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							itemStyle: {
								normal: {
									color: '#CCC'
								}
							},
							areaStyle: {
								normal: {}
							},
							data: count
						}]
					})
				}).catch(function (response) {
					console.log(response)
				})
			},
			GdpPostResultinfo: function () {
				var vm = this
				vm.$http.get(vm.GdpPostResultUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var Area = [], count = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						Area[i] = vm.workinfo[i].Area
						count[i] = vm.workinfo[i].WholeEmployeeValue
					}
					vm.GdpPostResult.setOption({
						xAxis: {
							show: false,
							type: 'category',
							boundaryGap: false,
							axisLine: {
								lineStyle: {
									color: '#fff',
									width: 1,
								}
							},
							data: Area
						},
						series: [{
							name: '人均产值',
							type: 'line',
							data: count
						}]
					})
				}).catch(function (response) {
					console.log(response)
				})
			},
			WailaiWResultinfo: function () {
				var vm = this
				vm.$http.get(vm.GetWailaiWResultUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var Area = [], count = [], resdata = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						Area[i] = vm.workinfo[i].Area
						count[i] = vm.workinfo[i].EmployeeCount
						resdata[i] = { 'name': Area[i], 'value': count[i] }
					}
					vm.GetWailaiWResultOption.series.push({
						name: '根据外来务工人员分析',
						type: "pie",
						radius: '35%',
						center: ['50%', '60%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									color: '#fff',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontFamily: 'sans-serif',
									fontSize: 12,
								}
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 10
							}
						},
						itemStyle: {
							normal: {
								label: {
									show: true,
									formatter: '{d}%'
								}
							},
						},
						data: resdata
					})
					vm.GetWailaiWResult.setOption(vm.GetWailaiWResultOption)
				}).catch(function (response) {
					console.log(response)
				})
			},
			ListGroupByNativeinfo: function () {
				var vm = this
				vm.$http.get(vm.ListGroupByNativeUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var Native = [], count = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						Native[i] = vm.workinfo[i].Native
						count[i] = vm.workinfo[i].EmployeeCount
					}
					vm.ListGroupByNative.setOption({
						xAxis: {
							show: false,
							data: Native
						},
						series: [{
							name: '根据籍贯分析',
							type: 'line',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							itemStyle: {
								normal: {
									color: '#36B6E7'
								}
							},
							data: count
						}]
					})
				}).catch(function (response) {
					console.log(response)
				})
			},
			ListGroupBySexAgeinfo: function () {
				var vm = this
				vm.$http.get(vm.ListGroupBySexAgeUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var agesex = [], count = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						agesex[i] = vm.workinfo[i].AgeSpanName + vm.workinfo[i].Sex
						count[i] = vm.workinfo[i].EmployeeCount
					}
					vm.ListGroupBySexAge.setOption({
						xAxis: {
							data: agesex
						},
						series: [{
							name: '根据年龄性别分析',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'top',
									textStyle: {
										color: '#fff',
										fontSize: 12
									}
								}
							},
							data: count
						}]
					})
				}).catch(function (response) {
					console.log(response)
				})
			},
			AttendanceListinfo: function () {
				var vm = this
				vm.$http.get(vm.AttendanceListUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var resdata = [{ 'name': '总人数', 'value': vm.workinfo.EmployeeTotal }, { 'name': '已签到人数', 'value': vm.workinfo.EmployeeCount }]
					vm.AttendanceListOption.series.push({
						name: '根据今日考勤分析',
						type: 'pie',
						radius: ['30%', '40%'],
						center: ['50%', '60%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									color: '#fff',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontFamily: 'sans-serif',
									fontSize: 12,
								}
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 10
							}
						},
						itemStyle: {
							normal: {
								label: {
									show: true,
									//formatter: '{b}:{d}%'
									formatter: '{d}%'
								}
							},
						},
						data: resdata
					})
					vm.AttendanceList.setOption(vm.AttendanceListOption)
				}).catch(function (response) {
					console.log(response)
				})
			},
			PerRateByWorkTypeinfo: function () {
				var vm = this
				vm.$http.get(vm.PerRateByWorkTypeUrl, {
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if (response.body.ret !== 0) {
						alert(response.body.msg)
						return false
					}
					vm.workinfo = response.body.data
					var Worktype = [], count = [], resdata = []
					for (var i = 0; i < vm.workinfo.length; i++) {
						Worktype[i] = vm.workinfo[i].Worktype
						count[i] = vm.workinfo[i].EmployeeCount
						resdata[i] = { 'name': Worktype[i], 'value': count[i] }
					}
					vm.PerRateByWorkTypeOption.series.push({
						name: '根据工种分析',
						type: "pie",
						radius: '35%',
						center: ['50%', '60%'],
						label: {
							normal: {
								show: true,
								position: 'outside',
								textStyle: {
									color: '#fff',
									fontStyle: 'normal',
									fontWeight: 'normal',
									fontFamily: 'sans-serif',
									fontSize: 12,
								}
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 10
							}
						},
						itemStyle: {
							normal: {
								label: {
									show: true,
									//formatter: '{b}:{d}%'
									formatter: '{d}%'
								}
							},
						},
						data: resdata
					})
					vm.PerRateByWorkType.setOption(vm.PerRateByWorkTypeOption)
				}).catch(function (response) {
					console.log(response)
				})
			}	
		},
		mounted: function () {
			var vm = this
			window.onresize = function () {
				vm.GroupByAreas.resize()
				vm.LabourPostResult.resize()
				vm.DutyListMonth.resize()
				vm.GdpPostResult.resize()
				vm.GetWailaiWResult.resize()
				vm.ListGroupByNative.resize()
				vm.ListGroupBySexAge.resize()
				vm.AttendanceList.resize()
				vm.PerRateByWorkType.resize()
			}
			vm.GroupByAreas = echarts.init(document.getElementById('GroupByAreas'))
			vm.LabourPostResult = echarts.init(document.getElementById('LabourPostResult'))
			vm.DutyListMonth = echarts.init(document.getElementById('DutyListMonth'))
			vm.GdpPostResult = echarts.init(document.getElementById('GdpPostResult'))
			vm.GetWailaiWResult = echarts.init(document.getElementById('GetWailaiWResult'))
			vm.ListGroupByNative = echarts.init(document.getElementById('ListGroupByNative'))
			vm.ListGroupBySexAge = echarts.init(document.getElementById('ListGroupBySexAge'))
			vm.AttendanceList = echarts.init(document.getElementById('AttendanceList'))
			vm.PerRateByWorkType = echarts.init(document.getElementById('PerRateByWorkType'))
			vm.GroupByAreasOption = {
				//color:['#35B5E6','#CDCBCC','#7D827E','#0571B1','#8fc31f','#f35833','#00ccff','#ffcc00'],
				title: {
					text: '根据区域分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				roseType: 'angle',
				series: []
			}
			vm.LabourPostResultOption = {
				title: {
					text: '劳动生产率分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '1%',
					right: '15%',
					bottom: '3%',
					containLabel: true
				},
				yAxis: [{
					type: 'category',
					data: [],
					axisTick: {
						alignWithLabel: true
					},
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					}
				}],
				xAxis: [{
					type: 'value',
					splitNumber: 3,
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
				}],
				series: []
			}
			vm.DutyListMonthOption = {
				title: {
					text: '根据月考勤分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'axis',
					formatter: "{a} <br/>{b} : {c}"
				},
				grid: {
					left: '3%',
					right: '6%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
					data: []
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					}
				}],
				series: []
			}
			vm.GdpPostResultOption = {
				title: {
					text: '按人均产值分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				color: '#fff',
				tooltip: {
					trigger: 'axis',
					formatter: "{a} <br/>{b} : {c}"
				},
				grid: {
					left: '3%',
					right: '6%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
					axisLabel: {
						formatter: '{value}'
					}
				},
				series: []
			}
			vm.GetWailaiWResultOption = {
				color: ['#35B5E6', '#CDCBCC', '#7D827E', '#0571B1', '#8fc31f', '#f35833', '#00ccff', '#ffcc00'],
				title: {
					text: '外来务工人员分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				series: []
			}
			vm.ListGroupByNativeOption = {
				title: {
					text: '根据籍贯分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'axis',
					formatter: "{a} <br/>{b} : {c}"
				},
				grid: {
					left: '3%',
					right: '6%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
					data: []
				}],
				yAxis: [{
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					}
				}],
				series: []
			}
			vm.ListGroupBySexAgeOption = {
				title: {
					text: '根据年龄性别分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '6%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					show: false,
					data: []
				},
				yAxis: {
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 1,
						}
					},
				},
				itemStyle: {
					normal: {
						color: function (params) {
							var colorList = [
								'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
								'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
								'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
							];
							return colorList[params.dataIndex]
						}
					}
				},
				series: []
			}
			vm.AttendanceListOption = {
				color: ['#35B5E6', '#CDCBCC', '#7D827E', '#0571B1', '#8fc31f', '#f35833', '#00ccff', '#ffcc00'],
				title: {
					text: '根据今日考勤分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				series: []
			}
			vm.PerRateByWorkTypeOption = {
				title: {
					text: '根据工种分析',
					subtext: '',
					x: 'center',
					textStyle: {
						color: '#fff',
						fontStyle: 'normal',
						fontWeight: 400,
						fontFamily: '微软雅黑',
						fontSize: 16,
					},
					top: 8
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				roseType: 'angle',
				series: []
			}
			vm.GroupByAreas.setOption(vm.GroupByAreasOption)
			vm.LabourPostResult.setOption(vm.LabourPostResultOption)
			vm.DutyListMonth.setOption(vm.DutyListMonthOption)
			vm.GdpPostResult.setOption(vm.GdpPostResultOption)
			vm.GetWailaiWResult.setOption(vm.GetWailaiWResultOption)
			vm.ListGroupByNative.setOption(vm.ListGroupByNativeOption)
			vm.ListGroupBySexAge.setOption(vm.ListGroupBySexAgeOption)
			vm.AttendanceList.setOption(vm.AttendanceListOption)
			vm.PerRateByWorkType.setOption(vm.PerRateByWorkTypeOption)
		}
	}
</script>