<style scoped>
.breadcrumb {
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
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb">实名认证一览表</div>
		
		<!-- 搜索条件 -->
		<div class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="param.params.parameter.PrjName" placeholder="所属项目">
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
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				projDataLoading: true,
				projData: [],
				employeeData: [],
				employeeUrl: global.host + 'Personal/GetPersonalModel',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							PrjName: '',
							Usergroup: '',
							EmployeeName: '',
							Idcardno: '',
							Worktype: ''
						}
					}
				}
			}
		},
		created() {
			this.getEmployee(),
			this.getProjData()
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': ''
		},
		computed: mapState({ user: state => state.user }),
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
			getEmployee: function(){
				var vm = this
				vm.param.params.token = vm.user.token
				vm.$http.get(vm.employeeUrl,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.employeeData = response.body.data
					})
					.catch(function(response){
						console.log(response)	
					})
			},
			handleSizeChange: function(val){
		    	this.param.params.pagesize = val
		    	this.getProjectData()
		    },
		    handleCurrentChange: function(val){
		    	this.param.params.pageindex = val
		    	this.getProjectData()
		    },
			viewUserDetail: function(val)	{
				this.$router.push({ 
					name: 'employee-detail',
					params: {
						id: val.EmployeeId
					}
					
				})
			}
		}
	}
</script>