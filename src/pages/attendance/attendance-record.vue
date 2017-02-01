<style lang="less" scoped>
	.record-list {
		list-style: none;
		margin: 0;
		padding: 0;
		li {
			display: flex;
			border-bottom: 1px dashed #ddd;
			line-height: 45px;
			height: 45px;
			padding: 5px 0;
			label {
				color: #999;
			}
			span {
				flex: 1;
				margin-right: 50px;
			}
		}
	}
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			打卡原始记录
		</div>

		<!-- 搜索条件 -->
		<div class="tipbox tipbox-primary">
			<p>请先选择日期和项目</p>
		</div>
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
							<li v-for="item in props.row.RecDutyList">
								<span><label>打卡时间：</label>{{ item.RecordTime.slice(0,10) }}</span>
								<span><label>考勤机：</label>{{ item.Direction | formatDirection }}</span>
								<span><label>进/出：</label>{{ item.Direction | formatDirection }}</span>
								<span><i v-if="item.PhotoPath"><a :href="item.PhotoPath" target="_blank"><img :src="item.PhotoPath" height="45" width="45"></a></i></span>
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
				<el-table-column prop="DateTimeNow" label="考勤日期" :formatter="dateFormat">
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
				url: global.host + 'Personal/GetDutyListByEmpId',
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
							RecDutyList: ''
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
				console.log(vm.selectDate)
				if(vm.selectProject == '' || vm.selectDate == ''){
					this.$message({
						message: '请先选择日期和项目',
						type: 'warning'
					});
					return
				}
				var d = new Date(vm.selectDate)
				d = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
				vm.param.params.parameter.RecDutyDay = d

				vm.param.params.token = vm.user.token
				vm.param.params.pagesize = vm.currentSize
				vm.param.params.pageindex = vm.currentPage
				vm.param.params.parameter.ProjectId = vm.selectProject

				vm.loading = true
				vm.$http.get(vm.url,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return
						}
						vm.loading = false
						vm.recordData = response.body.data
						vm.dataTotal = response.body.total
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
		}
    }
</script>