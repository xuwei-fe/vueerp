<style lang="less" scoped>
	.duty-title span {
		margin-right: 30px;
	}
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			考勤月报表
		</div>

		<!-- 搜索条件 -->
		<div class="tipbox tipbox-primary">
			<p>请先选择月份和项目</p>
		</div>
		<el-row class="search-box">

			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-date-picker
					v-model="selectDate"
					type="month"
					placeholder="选择月">
				</el-date-picker>
				</el-form-item>

				<el-form-item>
					<el-select :loading="projDataLoading" v-model="selectProject" placeholder="所属项目">
					    <el-option 
					    	v-for="item in projData" 
					    	:label="item.name" 
					    	:value="item.id">
					    </el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="姓名" v-model="param.params.parameter.EmployeeName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" icon="search" @click="getRecord">搜索</el-button>
				</el-form-item>

			</el-form>
		</el-row>

		<!-- 搜索结果 -->
		<template>
			<el-table v-loading.body="loading" width="100%" :data="recordData" highlight-current-row @selection-change="handleSelectionChange" @row-click="showCalendar">

				<el-table-column prop="EmployeeName" label="姓名">
				</el-table-column>
				<el-table-column prop="IdCardNo" label="身份证号">
				</el-table-column>
				<el-table-column prop="ProjectName" label="所属项目">
				</el-table-column>
				<el-table-column prop="WorkType" label="工种">
				</el-table-column>
				<el-table-column prop="UserGroup" label="班组">
				</el-table-column>
				<el-table-column prop="WorkHours" label="总工时" :formatter="hourFormat">
				</el-table-column>
				<el-table-column prop="HourSalary" label="总工资" :formatter="salaryFormat">
				</el-table-column>
			</el-table>

			<!--分页-->
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="currentSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="dataTotal">
			</el-pagination>
		</template>

		<!-- 当月考勤日历展示 -->
		<el-dialog title="月考勤记录" v-model="dialogDutyVisible" size="small">
			<div class="duty-title">
				<span>姓名：{{ dialogDutyName }}</span>
				<span>日期：{{ currentDate }}</span>
			</div>
			<xld-calendar 
				:current-date="currentDate"
				:events="fcEvents"
				first-day="0"
				lang="zh"
				@dayClick="dayClick"
			>
			</xld-calendar>
		</el-dialog>
	</div>
</template>
<script>
    import global from '../../config/global'
	import { mapState } from 'vuex'
    export default {
    	data: function (){
		    return {
				loading: false,
				selectDate: '',
				currentDate: '',
				selectProject: '',
				projData: [],
				projDataLoading: true,
				recordData: [],
				recordSelection: [],
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				url: global.host + 'Personal/GetDutyMonthReport',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							EmployeeName: '',
							IdCardNo: '',
							WorkType: '',
							WorkHours: '',
							UserGroup: '',
							HourSalary: '',
							ProjectId: '',
							RecDutyDay: ''
						}
					}
				},
				//考勤控件
				dialogDutyVisible: false,
				fcEvents: [],
				dutyData: [],
				dialogDutyVisible: false,
				dialogDutyTitle: ''
		    }
    	},
		created() {
			this.getProject()
		},
		computed: mapState({ user: state => state.user }),
		methods: {
			getProject: function(){
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
				}).catch(function(response){
					console.log(response)
				})
			},
			getRecord: function(){
				var vm = this
				if(vm.selectProject == '' || vm.selectDate == ''){
					this.$message({
						message: '请先选择月份和项目',
						type: 'warning'
					});
					return
				}
				vm.param.params.token = vm.user.token
				vm.param.params.pagesize = vm.currentSize
				vm.param.params.pageindex = vm.currentPage

				var d = new Date(vm.selectDate)
				d = d.getFullYear() + '-' + (d.getMonth()+1) + '-01'
				vm.param.params.parameter.RecDutyDay = d

				vm.param.params.parameter.ProjectId = vm.selectProject
				vm.loading = true
				vm.$http.get(vm.url,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return
						}
						vm.recordData = response.body.data
						vm.dataTotal = response.body.total	
						vm.loading = false					
					})
					.catch(function(response){
						console.log(response)
					})
			},
			handleSelectionChange(val) {
				this.recordSelection = val;
			},
			handleSizeChange: function(val){
				this.currentSize = val
				this.getRecord()
			},
			handleCurrentChange: function(val){
				this.currentPage = val
				this.getRecord()
			},
			hoursFormat: function(row,column){
				return row.WorkHours.toFixed(2)
			},
			salaryFormat: function(row,column){
				return row.HourSalary.toFixed(2)
			},
			showCalendar: function(row, event, column){
				console.log(row)
				var vm = this
				var d = new Date(vm.selectDate)
				d = d.getFullYear() + '-' + (d.getMonth()+1) + '-01'
				vm.$http.get(global.host + 'Personal/GetDutyMonthByEmpId',{
					'params': {
						token: vm.user.token,
						parameter: {
							EmployeeId: row.EmployeeId,
							ProjectId: row.ProjectId,
							RecDutyDay: d
						}
					}
				}).then((response) => {
					if(response.body.ret !== 0){
						alert(response.body.msg)
						return false
					}
					vm.dutyData = response.body.data
					vm.fcEvents = []
					for(var i=0; i<vm.dutyData.length; i++){
						var _duty = vm.dutyData[i]
						var _event = {
							title: _duty.WorkHours.toFixed(1) + '时',
							start: _duty.TodayTime.replace(/\//g,'-'),
							end: _duty.TodayTime.replace(/\//g,'-'),
							detail: _duty.RecordList
						}
						vm.fcEvents.push(_event)
					}
				}).catch(function(response){
					console.log(response)
				})
				this.currentDate = this.selectDate.getFullYear() + '-' + (this.selectDate.getMonth()+1)
				this.dialogDutyName = row.EmployeeName 
				this.dialogDutyVisible = true
			},
			'dayClick' (day, jsEvent) {
				console.log('dayClick', day, jsEvent)
			},
			hourFormat: function(row, column){
				return row.WorkHours.toFixed(1)
			},
			salaryFormat: function(row, column){
				return row.HourSalary.toFixed(1)
			}
		},
		components : {
			'xld-calendar': require('../../components/xldCalendar'),
		}
    }
</script>