<style lang="less" scoped>
	.record-list {
		list-style: none;
		margin: 0;
		padding: 0;
		li {
			text-align: right;
			span {
				margin-left: 40px;
			}
		}
		
	}
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			考勤日报表
		</div>
		<div class="tipbox tipbox-primary">
			<p>请先选择日期和项目</p>
		</div>
		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-date-picker
					v-model="selectDate"
					type="date"
					placeholder="选择日期">
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
			<el-table v-loading.body="loading" width="100%" :data="recordData" highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="expand">
					<template scope="props">
						<ul class="record-list">
							<li v-for="item in props.row.RecordList">
								<span>进场打卡时间: {{ item.SDateTime}}</span>
								<span>离场打卡时间: {{ item.EDateTime }}</span>
								<span>工时: {{ item.WorkHours.toFixed(1)}}</span>
							</li>
						</ul>
					</template>
    			</el-table-column>
				<el-table-column prop="EmployeeName" label="姓名">
				</el-table-column>
				<el-table-column prop="IdCardNo" label="身份证号">
				</el-table-column>
				<el-table-column prop="WorkType" label="工种">
				</el-table-column>
				<el-table-column prop="UserGroup" label="班组">
				</el-table-column>
				<el-table-column prop="WorkHours" label="工时" :formatter="hourFormat">
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
				selectProject: '',
				projData: [],
				projDataLoading: true,
				recordData: [],
				recordSelection: [],
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				url: global.host + 'Personal/GetDutyDayReport',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							EmployeeName: '',
							IdCardNo: '',
							WorkType: '',
							UserGroup: '',
							ProjectId: '',
							RecDutyDay: '',
							DateTimeNow: '',
							WorkHours: ''
						}
					}
				}
		    }
    	},
		created() {
			this.getProject()
		},
		computed: {
			...mapState({ user: state => state.user }),
			dutyList(obj){
				return 'helllo'
			}
		},
		methods: {
			dateFormat: function(row, column){
				return row.DateTimeNow.slice(0,10)
			},
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
						message: '请先选择日期和项目',
						type: 'warning'
					});
					return
				}

				var d = new Date(vm.selectDate)
				d = d.getFullYear() + '-' + (d.getMonth()+1) + '-01'
				vm.param.params.parameter.RecDutyDay = d

				vm.param.params.parameter.ProjectId = vm.selectProject
				
				vm.param.params.token = vm.user.token
				vm.param.params.pagesize = vm.currentSize
				vm.param.params.pageindex = vm.currentPage
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
			hourFormat: function(row, column){
				return row.WorkHours.toFixed(1)
			},
		}
    }
</script>