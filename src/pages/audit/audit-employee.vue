<style scoped>

</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			人员一览表
		</div>

		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select :loading="projDataLoading" v-model="param.params.parameter.ProjectId" placeholder="所属项目">
					    <el-option 
					    	v-for="item in projData" 
					    	:label="item.name" 
					    	:value="item.id">
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
		</el-row>

		<!-- 搜索结果 -->
		<template>
			<el-table :data="employeeData" highlight-current-row>
				<el-table-column prop="EmployeeName" label="姓名">
				</el-table-column>
				<el-table-column prop="Sex" label="性别">
				</el-table-column>
				<el-table-column prop="Idcardno" label="身份证号">
				</el-table-column>
				<!--<el-table-column prop="" label="所属劳务公司">
				</el-table-column>-->
				<el-table-column prop="PrjName" label="所属项目">
				</el-table-column>
				<el-table-column prop="Worktype" label="工种">
				</el-table-column>
				<el-table-column prop="Usergroup" label="班组">
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
				employeeData: [],
				projData: [],
				projDataLoading: true,
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				url: global.host + 'Personal/GetPersonalModel',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							EmployeeName: '',
							Sex: '',
							Idcardno: '',
							PrjName: '',
							Worktype: '',
							Usergroup: '',
							ProjectId: ''
						},
						sortcloumn: ''
					}
				}
		    }
    	},
		created() {
			this.getProjData()
			this.getEmployee()
		},
		computed: mapState({ user: state => state.user }),
		methods: {
			getProjData: function(){
				console.log('token ' + this.user.token)
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
				})
			},
			getEmployee: function(){
				var vm = this
				vm.param.params.token = vm.user.token
				vm.param.params.pagesize = vm.currentSize
				vm.param.params.pageindex = vm.currentPage
				vm.$http.get(vm.url,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.dataTotal = response.body.total
						vm.employeeData = response.body.data
					})
					.catch(function(response){
						console.log(response)
					})
			},
			handleSizeChange: function(val){
				this.currentSize = val
				this.getEmployee()
			},
			handleCurrentChange: function(val){
				this.currentPage = val
				this.getEmployee()
			},
		}
    }
</script>