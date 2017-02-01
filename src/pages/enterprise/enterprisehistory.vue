<template>
	<div>
		<v-header></v-header>
		<div class="el-row" style="margin-bottom:10px;">
			<el-input class="el-col-4" v-model="historyparam.parameter.EntCode" style="margin-right: 10px;" placeholder="组织机构代码">
			</el-input>
			<el-input class="el-col-4" v-model="historyparam.parameter.EntName" style="margin-left: 10px; margin-right: 10px;" placeholder="企业名称">
			</el-input>
			<el-button type="primary" @click="gethistorylist" style="float:right;">查询</el-button>
		</div>
		<el-table
			:data="tableData.data"
			style="width: 100%">
			<el-table-column
				prop="ent_code"
				label="组织机构代码"
				width="180">
			</el-table-column>
			<el-table-column
				prop="ent_name"
				label="企业名称"
				width="300">
			</el-table-column>
			<el-table-column
				prop="details"
				label="内容">
			</el-table-column>
			<el-table-column
				prop="mtime"
				label="日期">
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="tableData.pageindex"
			:page-sizes="[20, 40, 80,100]"
			:page-size="tableData.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="tableData.total">
			</el-pagination>
		</div>
</template>

<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){ 
			return {
				tableData:[],
				GetEnterpriseHistoryListurl:global.host +"Enterprise/GetEnterpriseHistoryList",//变更历史列表
                historyparam:{
                    token:"",
					parameter:{
						EntCode:"",
						EntName:""
					},
					pagesize:"20",
					pageindex:"1"
                }
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
			this.gethistorylist()
		},
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
		},
		methods: {
           gethistorylist(){
			   this.historyparam.token=this.user.token;
			   this.$http.get(this.GetEnterpriseHistoryListurl,{params:this.historyparam})
                .then((response) => {
					
                    this.tableData = response.body;
                })
                .catch(function (response) {
                    console.log(response)
                })
           },
		   handleSizeChange(val) {
				this.historyparam.pagesize=val;
				this.gethistorylist()
			},
			handleCurrentChange(val) {
				this.historyparam.pageindex=val;
				this.gethistorylist()
			}
		}
	}
</script>
