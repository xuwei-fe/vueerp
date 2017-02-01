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
        <el-button @click="uploadattachment">上传附件</el-button>
        <el-table
        :data="attachmentlistdata"
        style="width: 100%">
            <el-table-column
                prop="prj_name"
                label="文件名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="uploaduser"
                label="上传人"
                width="180">
            </el-table-column>
            <el-table-column
                prop="uploadtime"
                label="上传时间">
            </el-table-column>
        </el-table>
	</div>
</template>

<script>
	import '../../css/base.css'
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
                dialogVisible:false,
				gluser:false,//管理用户弹框
                loading: false,
				error: null,
				projUrl: global.host + 'Project/QueryProjectDetail',
				GetEnterpriseUserurl:global.host + "Enterprise/GetEnterpriseUserList",//企业人员
				GetEnterpriseUserurl:global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
                getattachmentlisturl:global.host + 'ProjectAttachment/QueryProjectAttachment',//根据id来获取附件信息
                attachmentlistdata:[],//附件列表数据
				EnterpriseUser:"",//企业人员
				Enterprise:"",//企业信息数据
				projParam: {
					params: {
						token: '',
						parameter: ""
					}
				},
				enterprisetypeurl:global.host + "SysDict/Get",
				entertab:"",
				companytable:"",
            }
		},
		computed: mapState({ user: state => state.user }),
		created() {
            this.attachmentlist();
		},
        watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': 'fetchData'
		},
		methods: {
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
            attachmentlist(){
                
                this.$http.get(this.getattachmentlisturl,{"params":{"token":this.user.token,"parameter":this.$route.params.id}})
					.then((response) => {
						this.attachmentlistdata=response.body.data;
					})
					.catch(function(response){
						this.error = response.toString()
					})
            },
            uploadattachment(){
                this.dialogVisible=true;
            },
            deleteProjectEnterprise(){
                this.dialogVisible=true;
            }
		}
	}
</script>

<style>

</style>
