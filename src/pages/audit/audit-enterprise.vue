<style scoped>

</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			<div class="left">
				<h3 class="title">企业一览表</h3>
			</div>
		</div>

		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="企业名称" v-model="param.params.parameter.Name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select :loading="typeLoading" v-model="param.params.parameter.Type" placeholder="企业类型">
					    <el-option 
					    	v-for="item in types" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input placeholder="企业负责人" v-model="param.params.parameter.name"></el-input>
				</el-form-item>
			</el-form>
		</el-row>

		<!-- 搜索结果 -->
		<template>
			<el-table :data="enterpriseData" highlight-current-row>
				<el-table-column prop="" label="组织代码">
				</el-table-column>
				<el-table-column prop="Name" label="企业名称">
				</el-table-column>
				<el-table-column prop="Type" label="企业类型">
				</el-table-column>
				<el-table-column prop="" label="法人">
				</el-table-column>
				<el-table-column prop="" label="联系人">
				</el-table-column>
				<el-table-column prop="" label="联系电话">
				</el-table-column>
				<el-table-column prop="" label="注册日期">
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
				enterpriseData: [],
				dataTotal: 0,
				currentPage: 1,
				currentSize: 10,
				types: [],
				typeLoading: false,
				url: global.host + 'Enterprise/GetListPageAll',
				param: {
					params: {
						token: '',
						pagesize: '',
						pageindex: '',
						parameter: {
							Name: '',
							Type: '',
							Address: '',
							TimeStart: '',
							TimeEnd: ''
						},
						sortcloumn: ''
					}
				},
				created() {
					this.fetchData()
				},
				computed: mapState({ user: state => state.user }),
				methods: {
					handleSizeChange: function(val){
						this.currentSize = val
						this.fetchData()
					},
					handleCurrentChange: function(val){
						this.currentPage = val
						this.fetchData()
					},
				}
		    }
    	}
    }
</script>