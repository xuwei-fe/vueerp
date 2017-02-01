<style lang="less" scoped>
	.clearfix::before, 
	.clearfix::after {
	    content: "";
	    display: table;
	}
	.clearfix::after {
	    clear: both;
	}
    .page-container {
		margin-top: 60px;
	}
	.portlet-title {
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 30px;
		line-height: 30px;
		.left {
			float: left;
		}
		.right {
			float: right;
		}
		h3 {
			color: #333;
			font-size: 14px;
			font-weight: bold;
			margin: 0;
			float: left;
			margin-right: 30px;
		}
		.el-button {
			padding-top: 9px;
			vertical-align: top;
		}
	}
	.projectdetail{
		width:100%;
		font-size: 16px;
		li{
			margin:10px;
			width:400px;
			float:left;
		}
	}
	.zlmb{
		font-size: 16px;
	}
	.sbzl{
		font-size: 16px;
		margin-top:10px;
	}
</style>
<template>
	<div>
		<v-header></v-header>
		<div class="page-container">
			<div class="portlet-title clearfix">
				<div class="left">
					<h3>项目详情</h3>
					<router-link to='/project'>
						<el-button type="text" size="small">返回项目列表</el-button>
					</router-link>
				</div>
			</div>
			<v-projectnav></v-projectnav>
		</div>
		<el-dialog title="工程变更明细" size="tiny" v-model="glenterprise">
			<el-form :model="companytable" label-width="80px">
				<el-form-item label="操作人">
					<el-input v-model="companytable.muser"></el-input>
				</el-form-item>
				<el-form-item label="操作IP">
					<el-input v-model="companytable.ip"></el-input>
				</el-form-item>
				<el-form-item label="工程名称">
					<el-input v-model="companytable.prj_name"></el-input>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="companytable.title"></el-input>
				</el-form-item>
				<el-form-item label="变更之前的内容">
					<el-input type="textarea" v-model="companytable.oldvalue"></el-input>
				</el-form-item>
				<el-form-item label="变更之后的内容">
					<el-input type="textarea" v-model="companytable.newvalue"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import '../../css/base.css'
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				tableData:"",
				glenterprise:false,
				gluser:false,//管理用户弹框
                loading: false,
				error: null,
				projData:"",
				baseprojData:"",
				projUrl: global.host + 'ProjectHistory/GetList',//工程列表履历
				projlvliUrl: global.host + 'ProjectHistory/Get',//工程列表履历详细
				GetEnterpriseUserurl:global.host + "Enterprise/GetEnterpriseUserList",//企业人员
				GetEnterpriseUserurl:global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
				EnterpriseUser:"",//企业人员
				Enterprise:"",//企业信息数据
				projParam: {
					params: {
						token: '',
						pagesize:"20",
						pageindex:"1",
						parameter: {
							prj_id:"",
							MtimeStart:"",
							MtimeEnd:""
						}
					}
				},
				enterprisetypeurl:global.host + "SysDict/Get",
				entertab:"",
				companytable:"",//工程列表履历详细数据
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
            this.fetchData()
		},
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
		},
		methods: {
            fetchData: function(){
				var vm = this
				vm.error = vm.post = null
				vm.loading = true
				vm.projParam.params.parameter.prj_id = this.$route.params.id
				vm.projParam.params.token = vm.user.token
				vm.$http.get(vm.projUrl,vm.projParam)
					.then((response) => {
						if(response.body.data == null) return;
						vm.loading = false
						vm.projData = response.body.data;
					})
					.catch(function(response){
						vm.error = response.toString()
					})
			},
			getenterprisetype:function(){
				this.$http.get(this.enterprisetypeurl,{"params":{"type":"enterprisetype"}})
					.then((response) => {
						this.entertab=response.body;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			projectcompany(){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: this.projParam.params.parameter
					}
				})
			},
			handleView(index){
				var vm=this;
				vm.glenterprise=true;
				var id=vm.projData[index].id;
				var data={"params":{"token":this.user.token,"parameter":{"id":id}}}
				this.$http.get(this.projlvliUrl,data)
					.then((response) => {
						this.companytable=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})
			}
		}
	}
</script>

<style>

</style>
