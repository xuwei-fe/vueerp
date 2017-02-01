<style lang="less" scoped>
.portlet-title {
	border-bottom: 1px solid #ddd;
	color: #333;
	font-size: 14px;
	font-weight: bold;
	padding-bottom: 15px;
	margin-bottom: 15px;
}
.el-table {
	margin-bottom: 10px;
}
.search-box {
	font-family: 'Microsoft YaHei';
	.el-input,
	.el-button {
		font-family: 'Microsoft YaHei';
	}
	.el-input {
		font-size: 13px;
	}
}
.search-result {
	margin-bottom: 30px;
	display: -moz-box; 
    display: -webkit-box; 
    display: box;
	.search-result-l {
		width: 200px;
		margin-right: 20px;
		.worktype-list {
			margin: 0;
			padding: 0;
			list-style: none;
			line-height: 30px;
			margin-left: -15px;
			margin-right: -15px;
			li {
				position: relative;
				font-family: 'Microsoft YaHei';
				font-size: 14px;
				cursor: pointer;
				display: block;
				padding: 6px 15px;
				text-align: left;
				padding-right: 60px;
				.name {
					display: block;
					overflow: hidden; 
					text-overflow: ellipsis; 
					-webkit-text-overflow: ellipsis; 
					-o-text-overflow: ellipsis; 
					white-space: nowrap;
					color: #20a0ff;
				}
				.count {
					position: absolute;
					right: 15px;
					top: 6px;
					i {
						font-style: normal;
					}
				}
			}
			li:hover {
				background-color: #ddd;
			}
		}
	}
	.search-result-r {
		-moz-box-flex: 1; 
		-webkit-box-flex: 1; 
		box-flex: 1;
	}
	
}
.chart-wrap {
	position: relative;
	.legend-title {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 12px;
	}
}
</style>
<template>
	<div>
		<div class="portlet-title">务工人员列表</div>

		<!-- 搜索条件 -->
		<div class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select :loading="projDataLoading" v-model="param.params.parameter.PrjName" placeholder="所属项目">
					    <el-option 
					    	v-for="item in projData" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item><el-form-item>
					<el-input placeholder="姓名" v-model="param.params.parameter.EmployeeName"></el-input>
				</el-form-item><el-form-item>
					<el-input placeholder="身份证号" v-model="param.params.parameter.Idcardno"></el-input>
				</el-form-item><el-form-item>
					<el-button type="primary" @click="getEmployee">搜索</el-button>
				</el-form-item>
			</el-form>
		</div>

		<!-- 搜索结果 -->
		<div class="search-result">
			<div class="search-result-l">
				<el-tabs type="border-card">
					<el-tab-pane label="工种">
						<div class="loading" v-if="isWorkTypesLoading">数据正在加载中...</div>
						<ul class="worktype-list" v-else>
							<li v-for="item in workTypes" @click="getWorkTypeEmployee(item.Worktype)">
								<span class="name">{{ item.Worktype }}</span>
								<span class="count"><i>{{ item.EmployeeCount }}</i>人</span>
							</li>
						</ul>
					</el-tab-pane>
  					<el-tab-pane label="班组">
						<ul class="worktype-list">
							<li v-for="item in userGroups" @click="getWorkTypeEmployee(item.Worktype)">
								{{ item.Worktype }}：<span>{{ item.EmployeeCount }}</span>人
							</li>
						</ul>	  
					</el-tab-pane>
				</el-tabs>
			</div>

			<div class="search-result-r">
				<!--列表数据-->
				<template>
					<el-table :data="employeeData" highlight-current-row>
						<el-table-column prop="EmployeeName" label="姓名">
						</el-table-column>
						<el-table-column prop="Sex" label="性别">
						</el-table-column>
						<el-table-column prop="PrjName" label="所属项目">
						</el-table-column>
						<el-table-column prop="Idcardno" label="身份证号">
						</el-table-column>
						<el-table-column prop="Worktype" label="工种">
						</el-table-column>
						<el-table-column prop="Usergroup" label="班组">
						</el-table-column>
						<el-table-column inline-template :context="_self" label="操作">
					      	<span>
					        	<el-button @click="viewUserDetail(row)" type="text" size="small">查看</el-button>
					      	</span>
    					</el-table-column>
					</el-table>

					<!--分页-->
					<el-pagination
				     	@size-change="handleSizeChange"
				      	@current-change="handleCurrentChange"
				      	:current-page="param.params.parameter.pageindex"
				      	:page-sizes="[10, 20, 30, 40]"
				      	:page-size="param.params.parameter.pagesize"
				      	layout="total, sizes, prev, pager, next, jumper"
				      	:total="EmployeeTotal">
				    </el-pagination>
				</template>
			</div>
		</div>

		<!-- echarts -->

		<div class="portlet-title">工种分布</div>
		<div class="chart-wrap">
			<template>
				<div id="chartWorkTypes" style="width:100%;height:400px;"></div>
				<div class="legend-title">总计 <span style="color: #FF4949">{{ EmployeeTotal }}</span> 人,<span style="color: #FF4949">{{ workTypes.length }}</span>个工种</div>
			</template>
		</div>
		<div class="portlet-title">考勤统计</div>
		<div class="chart-wrap">
			<template>
				<div id="chartDutyList" style="width:100%;height:400px;"></div>
				<div class="legend-title">
					<h4>最近1个月有 {{ dutylastDayCount }} 条考勤记录</h4>
					<p>{{ dutyMaxDay }}的考勤记录最多，有 {{ dutyMaxCount }} 条</p>
					<p>{{ dutyMinDay }}的考勤记录最少，有 {{ dutyMinCount }} 条</p>
					<p>平均每天考勤记录为 {{ dutyAvgCount }} 条</p>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	import echarts from 'echarts'
	export default {
		data: function(){
			return {
				projDataLoading: true,
				isWorkTypesLoading: true,
				projData: [],
				userGroups: [],
				employeeData: [],
				EmployeeTotal: 0,
				workTypes: [],
				dutyList: [],
				dutylastDayCount: 0,
				dutyMaxDay: '',
				dutyMaxCount: 0,
				dutyMinDay: '',
				dutyMinCount: 0,
				dutyAvgCount: 0,
				workTypesUrl: global.host + 'Personal/GetListGroupByWorkType',
				personalUrl: global.host + 'Personal/GetPersonalModel',
				dutyListUrl: global.host + 'Personal/GetDutyList',
				param: {
					'params': {
						token: '',
						pagesize: 10,
						pageindex: 1,
						parameter: {
							PrjName: '',
							Usergroup: '',
							EmployeeName: '',
							Idcardno: '',
							Worktype: ''
						}
					}
				},
				chartWorkTypes: null,
				chartWorkTypesOption: null,
				chartDutyList: null,
				chartDutyListOption: null
			}
		},
		created() {
			this.getWorkTypes(),
			this.getEmployee(),
			this.getDutyList(),
			this.getProjData()
		},
		computed: mapState({ user: state => state.user }),
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': ''
		},
		methods: {
			getProjData: function(){
				var vm = this
				vm.$http.get(global.host + 'Personal/GetProjectList',{
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}
					vm.projDataLoading = false
					vm.projData = response.body.data
					
					vm.param.params.parameter.PrjName = vm.projData[0].name
				})
			},
			getWorkTypes: function() {
				var vm = this
				vm.$http.get(vm.workTypesUrl,{
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}
					vm.isWorkTypesLoading = false
					vm.workTypes = response.body.data
					vm.EmployeeTotal = response.body.data[0].EmployeeTotal
					var type = [], count = []
					for(var i=0; i<vm.workTypes.length; i++){
						type[i] = vm.workTypes[i].Worktype
						count[i] = vm.workTypes[i].EmployeeCount
					}

					for(var i=0; i<type.length; i++){
						vm.chartWorkTypesOption.legend.data.push({
							name: type[i],
							icon: 'circle'
						})

						vm.chartWorkTypesOption.xAxis.data.push(type[i])
						vm.chartWorkTypesOption.series.push({
							name: type[i],
							type: "bar",
							itemStyle: {
								normal: {
									label: {
										show: true,
										position: 'top',
										formatter: (function(){
											return type[i]+'\n{c}'
										})()
									}
								}
							},
							barWidth: 50,
							data: [count[i]]
						})
					}

					vm.chartWorkTypes.setOption(vm.chartWorkTypesOption)
						

				})
				.catch(function(response){
					console.log(response)
				})
			},
			getWorkTypeEmployee: function(type) {
				var vm = this
				vm.param.params.parameter.Worktype = type
				vm.getEmployee()
			},
			getEmployee: function() {
				var vm = this
				vm.param.params.token = vm.user.token
				vm.$http.get(vm.personalUrl,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.employeeData = response.body.data
					})
					.catch(function(response) {
						console.log(response)
					})
			},
			getDutyList: function() {
				var vm = this
				vm.$http.get(vm.dutyListUrl,{
					'params': {
						token: vm.user.token
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}

					vm.dutyList = response.body.data
					vm.dutylastDayCount = vm.dutyList[0].EndDateCount
					vm.dutyMaxDay = vm.dutyList[0].MaxRecDuty[0].Day
					vm.dutyMaxCount = vm.dutyList[0].MaxRecDuty[0].DayCount
					vm.dutyMinDay = vm.dutyList[0].MinRecDuty[0].Day
					vm.dutyMinCount = vm.dutyList[0].MinRecDuty[0].DayCount
					vm.dutyAvgCount = vm.dutyList[0].DutyAvgCount

					var dutyDay = [],dutyData = []
					for(var i=0; i<vm.dutyList.length; i++){
						dutyDay[i] = vm.dutyList[i].RecDutyDay.slice(5,10)
						dutyData[i] = vm.dutyList[i].RecDutyCount
					}
					
					vm.chartDutyList.setOption({
						xAxis: {
							data: dutyDay
						},
						series: [{
							name: '考勤',
							type: 'line',
							smooth: true,
							data: dutyData
						}]
					})
				})
				.catch(function(response) {
					console.log(response)
				})
			},
		    handleSizeChange: function(val){
		    	this.param.params.pagesize = val
		    	this.getEmployee()
		    },
		    handleCurrentChange: function(val){
		    	this.param.params.pageindex = val
		    	this.getEmployee()
		    },
			viewUserDetail: function(val)	{
				this.$router.push({ 
					name: 'employee-detail',
					params: {
						id: val.EmployeeId
					}
					
				})
			}
		},
		mounted: function(){
			var vm = this
			window.onresize = function(){
				vm.chartWorkTypes.resize()
				vm.chartDutyList.resize()
			}
			vm.chartWorkTypes = echarts.init(document.getElementById('chartWorkTypes'))
			vm.chartDutyList = echarts.init(document.getElementById('chartDutyList'))
			vm.chartWorkTypesOption = {
				title: {
                    text: '',
                    subtext: '',
                    padding: [0, 10],
                    textStyle: {
                    	fontSize: 12
                    },
                    left: 0
                },
                legend: {
                	data: [],
                	top: 30,
                	left: 5,
                	orient: 'vertical',
                	align: 'left'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    	shadowStyle: {
                    		opacity: 0
                    	}
                    },
                },
                grid: {
                    left: '260px',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                	name: '工种',
                    type: 'category',
                    show: false,
                    data: []
                },
                yAxis: {
                	name: '',
                    type: 'value'
                },
				series: [
					{
						name: '',
						type: "bar",
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'top',
									formatter: '{b}\n{c}'
								}
							}
						},
						barWidth: 50,
						data: []
					}
				]
			}

			vm.chartDutyListOption = {
				title: {
                    text: '',
                    subtext: '',
                    padding: [0, 10],
                    textStyle: {
                    	fontSize: 12
                    },
                    left: 0
                },
                legend: {
                	data: [],
                	top: 30,
                	left: 5,
                	orient: 'vertical',
                	align: 'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '260px',
                    top: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    show: true,
					boundaryGap: true,
                    data:[]
                },
                yAxis: {
                	name: '',
                    type: 'value'
                },
				series: []
			}

			vm.chartWorkTypes.setOption(vm.chartWorkTypesOption)
			vm.chartDutyList.setOption(vm.chartDutyListOption)
		}
	}
</script>