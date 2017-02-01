<style scoped>

</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			项目一览表
		</div>

		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="param.params.parameter.iscomplete">
					    <el-option label="在建项目" value="N"></el-option>
      					<el-option label="已竣工项目" value="Y"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select clearable :loading="projTypeLoading" v-model="param.params.parameter.type" placeholder="项目类别">					    
						<el-option 
					    	v-for="item in projType" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="项目名称" v-model="param.params.parameter.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="建设单位" v-model="param.params.parameter.JsdwName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="施工单位" v-model="param.params.parameter.SgdwName"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getProject">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-row>

		<!-- 搜索结果 -->
		<template>
			<el-table :data="projectData" highlight-current-row>
				<el-table-column prop="name" label="项目名称">
				</el-table-column>
				<el-table-column prop="progress" label="项目进度">
				</el-table-column>
				<el-table-column prop="type" label="工程分类">
				</el-table-column>
				<el-table-column prop="SgdwName" label="施工单位">
				</el-table-column>
				<el-table-column prop="JsdwName" label="建设单位">
				</el-table-column>
				<el-table-column prop="region" label="所属区域">
				</el-table-column>
				<el-table-column prop="CreateDateStart" label="录入日期">
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
				projType: [],
				projTypeLoading: true,
				projTypeUrl: global.host + 'SysDict/Get',
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				projectData: [],
				url: global.host + 'Project/QueryPageProjects',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							iscomplete: 'N',
							name: '',
							progress: '',
							type: '',
							SgdwName: '',
							JsdwName: '',
							addr: '',
							CreateDateStart: '',
						}
					}
				}
		    }
    	},
		created() {
			this.getProjectType()
			this.getProject()
		},
		computed: mapState({ user: state => state.user }),
		methods: {
			getProjectType: function(){
				var vm = this
				this.$http.get(vm.projTypeUrl,{'params':{'type':'projecttype'}})
					.then((response) => {
						vm.projTypeLoading = false
						vm.projType = response.body
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProject: function(){
				var vm = this
				vm.param.params.token =  vm.user.token
				vm.param.params.pagesize = vm.currentSize
				vm.param.params.pageindex = vm.currentPage
				this.$http.get(vm.url,vm.param)
					.then((response) => {
						if(response.body.ret !== 0){
							alert(response.body.msg)
							return false
						}
						vm.dataTotal = response.body.total
						vm.projectData = response.body.data
						for(var i=0; i<vm.projectData.length; i++){
							vm.projectData[i].region = vm.projectData[i].province + ' ' + vm.projectData[i].city + ' ' + vm.projectData[i].area
						}
					})
					.catch(function(response) {
						console.log(response)
					})
			},
			handleSizeChange: function(val){
				this.currentSize = val
				this.getProject()
			},
			handleCurrentChange: function(val){
				this.currentPage = val
				this.getProject()
			},
		}
    }
</script>