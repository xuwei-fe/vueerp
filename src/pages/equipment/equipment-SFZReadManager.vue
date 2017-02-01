<style scoped>
	.clearfix::before, 
	.clearfix::after {
	    content: "";
	    display: table;
	}
	.clearfix::after {
	    clear: both;
	}
	.breadcrumb {
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		margin-bottom: 10px;
	}
	.breadcrumb .left {
		float: left;
	}
	.breadcrumb .right {
		float: right;
	}
	.breadcrumb .title {
		color: #333;
		font-size: 14px;
		font-weight: bold;
		margin: 0;
		line-height: 30px;
	}
	.search-box .el-row {
		padding: 15px 0;
	}
	.search-box .el-form-item {
		margin-bottom: 8px;
	}
	.search-box .search-more {
		background-color: #e9e9e9;
		padding: 15px 15px 7px;
		margin-bottom: 25px;
	}
	.toolbar .el-button {
		margin-left: 0;
		margin-bottom: 10px;
	}
	.el-button--gray {
	    color: #333;
	    background-color: #f5f5f5;
	    border-color: #ddd;
	}
	.el-button--gray:hover {
		background-color: #fff;
	}
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb clearfix">
			<div class="left">
				<h3 class="title">身份证读卡器管理</h3>
			</div>
		</div>
		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="品牌" v-model="param.params.parameter.brand"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  icon="search" @click="getDeviceData">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		
		<div class="toolbar">
			<el-button type='gray' size='small' @click='handleAddProj()'>添加设备</el-button>
			<el-button type='gray' size='small' @click="handleEditProj()">编辑设备</el-button>
			<el-button type='gray' size='small' @click="handleDeleteProjShow()">删除所选</el-button>
		</div>
			
		<!-- 搜索结果 -->
		<template>
			<el-table :data="DeviceData" highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="selection">
    			</el-table-column>
				<el-table-column prop="brand" label="品牌">
				</el-table-column>
				<el-table-column prop="sn" label="序列号">
				</el-table-column>
				<el-table-column prop="prj_name" label="所属项目">
				</el-table-column>
				<el-table-column prop="ent_name" label="所属公司">
				</el-table-column>
				<el-table-column prop="islock" label="是否锁定" align="center">
				</el-table-column>
				<el-table-column  prop="isverify" label="是否通过SN校验">
				</el-table-column>
				<el-table-column prop="lastconnect" label="最后使用的时间" :formatter="formatDate">
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
		      	:total="DeviceDataTotal">
		    </el-pagination>
		</template>

		<el-dialog title="添加省份读卡器设备信息" v-model='AddDeviceShow' size='small'>
			<el-tabs type="border-card">
				<el-tab-pane label="省份读卡器设备信息">
					<el-form ref="AddDevice" :model="AddDevice" :rules="formProjectRules" >
						<el-form-item label='品牌' :label-width='progressLabelWidth' prop="brand">
							<el-input v-model='AddDevice.brand'></el-input>
						</el-form-item>
						<el-form-item label='序列号' :label-width='progressLabelWidth' prop="sn">
							<el-input v-model='AddDevice.sn'></el-input>
						</el-form-item>
						<el-form-item label='选择项目' :label-width='progressLabelWidth' prop="prj_id">
							  <el-select v-model="AddDevice.prj_id"  placeholder="请选择">
									<el-option
									v-for="item in ProjectData"
									:label="item.name"
									:value="item.id">
									</el-option>
							 </el-select>
						</el-form-item>
						<el-form-item label='选择企业' :label-width='progressLabelWidth' prop='ent_id'>
							  <el-select v-model="AddDevice.ent_id"  placeholder="请选择">
									<el-option
									v-for="item in EnterpriseData"
									:label="item.name"
									:value="item.id">
									</el-option>
							 	</el-select>
						</el-form-item>
						<el-form-item label='是否锁定' :label-width='progressLabelWidth' >
							<el-switch on-text="锁定" off-text="不锁定" v-model="islock"></el-switch>
						</el-form-item>
						<el-form-item label='是否通过校验' :label-width='progressLabelWidth'>
							<el-switch on-text="通过" off-text="不通过" v-model="isverify"></el-switch>
						</el-form-item>
						<el-form-item :label-width='progressLabelWidth'>
							<el-button type='primary' @click="handleAddDevice('AddDevice')">保存</el-button>
							<el-button type='warning' @click="cancelAddDevice('AddDevice')">重置</el-button>
						</el-form-item>
					</el-form>		
				</el-tab-pane>
			</el-tabs>
		</el-dialog>


	<el-dialog title="编辑省份读卡器设备信息" v-model='EditDeviceShow' size='small'>
			<el-tabs type="border-card">
				<el-tab-pane label="省份读卡器设备信息">
					<el-form ref="EditDevice" :model="EditDevice" :rules="formProjectRules" >
						<el-form-item label='品牌' :label-width='progressLabelWidth' prop="brand">
							<el-input v-model='EditDevice.brand'></el-input>
						</el-form-item>
						<el-form-item label='序列号' :label-width='progressLabelWidth' prop="sn">
							<el-input v-model='EditDevice.sn'></el-input>
						</el-form-item>
						<el-form-item label='选择项目' :label-width='progressLabelWidth' prop="prj_id">
							  <el-select v-model="EditDevice.prj_id"  placeholder="请选择">
									<el-option
									v-for="item in ProjectData"
									:label="item.name"
									:value="item.id">
									</el-option>
							 </el-select>
						</el-form-item>
						<el-form-item label='选择企业' :label-width='progressLabelWidth' prop='ent_id'>
							  <el-select v-model="EditDevice.ent_id"  placeholder="请选择">
									<el-option
									v-for="item in EnterpriseData"
									:label="item.name"
									:value="item.id">
									</el-option>
							 	</el-select>
						</el-form-item>
						<el-form-item label='是否锁定' :label-width='progressLabelWidth' >
							<el-switch on-text="锁定" off-text="不锁定" v-model="islock"></el-switch>
						</el-form-item>
						<el-form-item label='是否通过校验' :label-width='progressLabelWidth'>
							<el-switch on-text="通过" off-text="不通过" v-model="isverify"></el-switch>
						</el-form-item>
						<el-form-item :label-width='progressLabelWidth'>
							<el-button type='primary' @click="handleEditDevice('EditDevice')">保存</el-button>
						</el-form-item>
					</el-form>		
				</el-tab-pane>
			</el-tabs>
		</el-dialog>


		<el-dialog title="提示" v-model="dialogVisible" size="tiny">
		<span>是否删除？</span>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleDeleteProj()">确 定</el-button>
		</span>
		</el-dialog>

	</div>
</template>

<script>	
	import global from '../../config/global'
	import { mapState } from 'vuex'

	export default{
		data: function(){
			return{
				dialogVisible:false,
				DeviceUrl:global.host+'Device/GetReaderList',
				DeviceData:[],
				DeviceDataTotal:0,
				param:{
					params:{
						token:'',
						pageindex:1,
						pagesize:10,
						sortcloumn:'cdate',
						sortdirection:'desc',
						parameter:{
							brand:''
						}
					}
				},
				currentDevice:{
					id:'',
					brand:'',
					sn:'',
					islock:'',
					lastconnect:'',
					isverify:''
				},
				//添加设备信息
				AddDeviceShow:false,
				progressLabelWidth:'120px',
				AddDeviceUrl:global.host+'Device/SaveReader',
				AddDeviceParams:{
					token:'',
					parameter:{}
				},
				AddDevice:{
						brand:'',
						sn:'',
						islock:'',
						prj_id:'',
						prj_name:'',
						ent_id:'',
						ent_name:'',
						isverify:''
				},
				EditDevice:{
						brand:'',
						sn:'',
						islock:'',
						prj_id:'',
						prj_name:'',
						ent_id:'',
						ent_name:'',
						isverify:''
				},
				isverify:false,
				islock:false,
				//查询项目信息
				ProjectUrl:global.host+'Project/GetProject',
				ProjectData:[],
				ProjectParams:{
					params:{
					token:''
					}
				},
				ProjectId:'',
				//查询企业信息
				EnterpriseUrl:global.host+'Enterprise/GetEnterpriseByToken',
				EnterpriseData:[],
				EnterpriseId:'',
				EnterpriseParame:{
					params:{
						token:''
					}
				},
				formProjectRules:{
					brand:[
						{required: true, message: '请输入品牌', trigger: 'blur' }
					],
					sn:[
						{required: true, message: '请输入序列号', trigger: 'blur' }
					],
					prj_id:[
						{type:'number',required: true, message: '请选择项目', trigger: 'change' }
					],
					ent_id:[
						{type:'number',required: true, message: '请选择企业', trigger: 'change' }
					]
				},
				multipleSelection:[],
				GetDeviceUrl:global.host+'Device/GetReaderModel',
				GetDeviceData:[],
				GetDeviceParam:{
					params:{
						token:'',
						parameter:''
					}
				},
				EditDeviceShow:false,
				DelteDeviceUrl:global.host+'Device/DeleteReader',
				DelteDeviceParam:{
						token:'',
						parameter:[]
				}
			}
		},
		computed:mapState({user:state=>state.user}),
		created(){
			this.getDeviceData()
		},
		methods:{
			getDeviceData:function(){
				var vm=this
				vm.param.params.token=vm.user.token
				//vm.param.params.parameter.brand=
				this.$http.get(vm.DeviceUrl,vm.param)
				.then((response)=>{
					vm.DeviceData=response.body.data
					vm.DeviceDataTotal=response.body.total
				})
				.catch(function(response){
					this.$message.error(response.body.msg);
				})
			},
			handleSelectionChange:function(val){
				this.multipleSelection=val
			},
			handleSizeChange:function(val){
				this.param.params.pagesize=val
				this.getDeviceData()
			},
			handleCurrentChange:function(val){
				this.param.params.pageindex=val
				this.getDeviceData()
			},
			handleAddProj:function()
			{
				this.AddDeviceShow=true
				this.getProjects()
				this.getenterprise()
			},
			handleEditProj:function(obj)
			{
				if(this.multipleSelection==null||this.multipleSelection.length!=1)
				{
					this.$message({
						showClose: true,
						message: '请选择一条数据',
						type: 'warning'
						})

						return false
				}
				this.GetDeviceParam.params.token=this.user.token
				this.GetDeviceParam.params.parameter=this.multipleSelection[0].id
				this.$http.get(this.GetDeviceUrl,this.GetDeviceParam)
				.then((response)=>{
					if(response.body.ret==0)
					{
						this.EditDeviceShow=true
						this.getProjects()
						this.getenterprise()
						this.EditDevice=response.body.data
						this.isverify=response.body.data.isverify=='Y'
						this.islock=response.body.data.islock=='Y'
					}
					else{
						this.$message.error(response.body.msg);
					}
					
				})
				.catch((response)=>{

				})
				
			},
			getProjects:function(){
				this.ProjectParams.params.token=this.user.token
				this.$http.get(this.ProjectUrl,this.ProjectParams)
				.then((response)=>{
					 this.ProjectData=response.body.data
				})
				.catch((response)=>{
					
				})
			},
			getenterprise:function(){//查询企业信息
				this.EnterpriseParame.params.token=this.user.token
				this.$http.get(this.EnterpriseUrl,this.EnterpriseParame)
				.then((response)=>{
					 this.EnterpriseData=response.body.data
				})
				.catch((response)=>{
					
				})
			},
			handleAddDevice:function(rule){//添加设备
					this.$refs[rule].validate((valid) => {
						if (valid) {
							this.AddDeviceParams.token=this.user.token
							this.AddDevice.islock=this.islock?'Y':'N'
							this.AddDevice.isverify=this.isverify?'Y':'N'
							this.AddDeviceParams.parameter=this.AddDevice;
							this.$http.post(this.AddDeviceUrl,this.AddDeviceParams)
							.then((response)=>{
									if(response.body.ret==0)
									{
										this.$refs[rule].resetFields();	
										this.$message({
										message: response.body.msg,
										type: 'success'
										});
										this.AddDeviceShow=false
										this.getDeviceData()
									}
									else
									{
										this.$message.error(response.body.msg);
									}
							})
							.catch((response)=>{

							})
							
						} else {
							return false;
						}
					});
			},
			cancelAddDevice:function(rule)
			{
				this.$refs[rule].resetFields();		
			},
			handleEditDevice:function(rule)//编辑设备
					{
						this.$refs[rule].validate((valid) => {
								if (valid) {
									this.AddDeviceParams.token=this.user.token
									this.EditDevice.islock=this.islock?'Y':'N'
									this.EditDevice.isverify=this.isverify?'Y':'N'
									this.AddDeviceParams.parameter=this.EditDevice;
									this.$http.post(this.AddDeviceUrl,this.AddDeviceParams)
									.then((response)=>{
											if(response.body.ret==0)
											{
												this.$refs[rule].resetFields();	
												this.$message({
												message: response.body.msg,
												type: 'success'
												});
												this.EditDeviceShow=false
												this.getDeviceData()
											}
											else
											{
												this.$message.error(response.body.msg);
											}
									})
									.catch((response)=>{

									})
									
								} else {
									return false;
								}
							});
					},
					handleDeleteProjShow:function(){
						if(this.multipleSelection==null||this.multipleSelection.length<=0)
						{
							this.$message({
								showClose: true,
								message: '请选择一条数据或多条数据',
								type: 'warning'
								})

								return false
						}
						this.dialogVisible = true
					},
					handleDeleteProj:function(){//删除
								this.dialogVisible = false
								this.DelteDeviceParam.token=this.user.token
								var list=[]
								for(var i=0;i<this.multipleSelection.length;i++)
								{
									list.push(this.multipleSelection[i].id)
								}
								this.DelteDeviceParam.parameter=list

								this.$http.post(this.DelteDeviceUrl,this.DelteDeviceParam)
								.then((response)=>{
									if(response.body.ret==0)
									{
										 this.$message({
												showClose: true,
												message: '已删除'+list.length+'条数据'
												});
										this.getDeviceData()
										
									}
									else{
										this.$message.error(response.body.msg);
									}
									
								})
								.catch((response)=>{

								})
					}
			

		}
	}


</script>