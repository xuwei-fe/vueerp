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
				<h3 class="title">在建项目</h3>
			</div>
		</div>
		<!-- 搜索条件 -->
		<el-row class="search-box">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-select v-model="param.params.parameter.type" placeholder="项目类别">
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
					<el-input placeholder="项目地点" v-model="param.params.parameter.addr"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="建设单位" v-model="param.params.parameter.JsdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="监理单位" v-model="param.params.parameter.LjdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="施工单位" v-model="param.params.parameter.SgdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="勘察单位" v-model="param.params.parameter.KcdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="设计单位" v-model="param.params.parameter.SjdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="检测单位" v-model="param.params.parameter.JcdwName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="注册监督号" v-model="param.params.parameter.sno"></el-input>
				</el-form-item>

				<el-form-item>
					<el-select v-model="param.params.parameter.jglb" placeholder="监管类别">
					    <el-option 
					    	v-for="item in projJglb" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="录入时间（开始）" v-model="param.params.parameter.CreateDateStart"></el-input>
				</el-form-item>

				<el-form-item>
					<el-input placeholder="录入时间（结束）" v-model="param.params.parameter.CreateDateEnd"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="getProjectData">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-row>

		<!-- toolbar -->
		<div class="toolbar">
			<router-link to='/project-add'>
				<el-button type="gray" size="small">新建项目</el-button>
			</router-link>
			<el-button type="gray" size="small">导出全部</el-button>
			<el-button type="gray" size="small">导出选中</el-button>
			<el-button type="gray" size="small" @click="handleEditProj('complete')">竣工</el-button>
			<el-button type="gray" size="small" @click="handleEditProj('name')">修改项目名称</el-button>
			<el-button type="gray" size="small" @click="handleEditProj('basic')">修改项目基本资料</el-button>
			<el-button type="gray" size="small" @click="handleEditProj('progress')">工程项目进度变更</el-button>
		</div>
			
		<!-- 搜索结果 -->
		<template>
			<el-table :data="projData" highlight-current-row @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
    			</el-table-column>
				<el-table-column prop="name" label="工程名称" width="260">
				</el-table-column>
				<el-table-column prop="sno" label="监督注册号" width="170">
				</el-table-column>
				<el-table-column prop="cost" label="工程造价（万）" align="center"  width="160">
				</el-table-column>
				<el-table-column prop="CreateDateStart" label="录入日期" :formatter="formatDate" width="120">
				</el-table-column>
				<el-table-column prop="progress" label="工程进度">
				</el-table-column>
				<el-table-column prop="jglb" label="监管级别" align="center">
				</el-table-column>
				<el-table-column prop="type" label="工程种类">
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="160" align="center">
					<span>
						<el-button type="text" size="small" @click="handleView(row)">查看</el-button>
						<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
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
		      	:total="projDataTotal">
		    </el-pagination>
		</template>

		<el-dialog title="修改项目名称" v-model="dialogFormProjnameVisible" size="tiny">
			<el-form :model="formProjname">
				<el-form-item label="原名称：" :label-width="nameLabelWidth">
					<span>{{ currentProj.name }}</span>
				</el-form-item>
				<el-form-item label="新名称：" :label-width="nameLabelWidth">
					<el-input v-model="formProjname.parameter.name" auo-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:80px; margin-top: -30px;">
				<el-button type="primary" @click="formProjnameSave">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="修改项目基本资料" v-model="dialogFormProjbasicVisible">
			<el-form :model="formProjbasic">
				<el-form-item label="注册监督号" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.sno"></el-input>
				</el-form-item>
				<el-form-item label="项目类别" :label-width="basicLabelWidth">
					<el-select v-model="formProjbasic.parameter.type">
						<el-option 
					    	v-for="item in projType" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="临时工程" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.istemp"></el-input>
				</el-form-item>
				<el-form-item label="工程造价（万元）" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.cost"></el-input>
				</el-form-item>
				<el-form-item label="责任书编号" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.zno"></el-input>
				</el-form-item>
				<el-form-item label="总投资" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.invest"></el-input>
				</el-form-item>
				<el-form-item label="总面积" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.squre"></el-input>
				</el-form-item>
				<el-form-item label="监管类别" :label-width="basicLabelWidth">
					<el-select v-model="formProjbasic.parameter.jglb">
						<el-option 
					    	v-for="item in projJglb" 
					    	:label="item.name" 
					    	:value="item.name">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用途" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.purpose"></el-input>
				</el-form-item>
				<el-form-item label="项目进度" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.progress"></el-input>
				</el-form-item>
				<el-form-item label="建设工程规划许可证" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.sgno"></el-input>
				</el-form-item>
				<el-form-item label="道路面积" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.djmj"></el-input>
				</el-form-item>
				<el-form-item label="桥梁面积" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.qlmj"></el-input>
				</el-form-item>
				<el-form-item label="轨道长度" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.gdcd"></el-input>
				</el-form-item>
				<el-form-item label="省" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.province"></el-input>
				</el-form-item>
				<el-form-item label="市" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.city"></el-input>
				</el-form-item>
				<el-form-item label="区" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.area"></el-input>
				</el-form-item>
				<el-form-item label="项目地址" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.addr"></el-input>
				</el-form-item>
				<el-form-item label="开工日期" :label-width="basicLabelWidth">
					<el-date-picker v-model="formProjbasic.parameter.startdate" type="date"  placeholder="选择日期" :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="竣工日期" :label-width="basicLabelWidth">
					<el-date-picker v-model="formProjbasic.parameter.cmpdate" type="date"  placeholder="选择日期" :picker-options="pickerOptions1">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="竣工备案号" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.jgno"></el-input>
				</el-form-item>
				<el-form-item label="主体阶段" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.ztjd"></el-input>
				</el-form-item>
				<el-form-item label="当前阶段" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.dqjd"></el-input>
				</el-form-item>
				<el-form-item label="中标工程名" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.zbgcm"></el-input>
				</el-form-item>
				<el-form-item label="别名" :label-width="basicLabelWidth">
					<el-input v-model="formProjbasic.parameter.bname"></el-input>
				</el-form-item>
				<el-form-item label="质量目标" :label-width="basicLabelWidth">
					<el-radio-group v-model="formProjbasic.parameter.zlmb">
						<el-radio label="合格">合格</el-radio>
						<el-radio label="瓯江杯">瓯江杯</el-radio>
						<el-radio label="钱江杯">钱江杯</el-radio>
						<el-radio label="鲁班奖">鲁班奖</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:150px; margin-top: -30px;">
				<el-button type="primary" style="width:160px" @click="formProjbasicSave">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="项目进度变更" v-model="dialogFormProjprogressVisible">
			<el-form :model="formProjprogress">
				<el-form-item label="工程名称" :label-width="progressLabelWidth">
					<span>{{ currentProj.name }}</span>
				</el-form-item>
				<el-form-item label="当前工程进度" :label-width="progressLabelWidth">
					<span>{{ currentProj.progress }}</span>
				</el-form-item>
				<el-form-item label="新的工程进度" :label-width="progressLabelWidth">
					<el-input v-model="formProjprogress.parameter.progress"></el-input>
				</el-form-item>
				<el-form-item label="更改进度原因" :label-width="progressLabelWidth">
					<el-input type="textarea" v-model="formProjprogress.parameter.remark"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:150px; margin-top: -30px;">
				<el-button type="primary" style="width:160px" @click="formProjprogressSave">保存</el-button>
			</div>
		</el-dialog>

		<el-dialog title="提示" v-model="dialogFormProjcompleteVisible">
			<span>是否对 {{ currentProj.name }} 项目确认竣工？</span>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:150px; margin-top: -30px;">
				<el-button type="primary" style="width:160px" @click="formProjcompleteSave">保存</el-button>
				<el-button type="" style="width:160px" @click="dialogFormProjcompleteVisible = false">取消</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function(){
			return {
				projTypeUrl: global.host + 'SysDict/Get',
				projType: [],
				projJglbUrl: global.host + 'SysDict/Get',
				projJglb: [],
				projUrl: global.host + 'Project/QueryPageProjects',
				projData: [],
				projDataTotal: 0,
				projSelection: [],
				param: {
					params: {
						token: '',
						pagesize: 10,
						pageindex: 1,
						parameter: {
							Iscomplete: 'Y',
							sno: '',
							name: '',
							addr: '',
							jglb: '',
							type: '',
							JsdwName: '',
							LjdwName: '',
							SgdwName: '',
							KcdwName: '',
							SjdwName: '',
							JcdwName: '',
							CreateDateStart: '',
							CreateDateEnd: ''
						}
					}
				},
				currentProj: {
					id: '',
					progress: '',
					name: '',
					bname: '',
					sno: '',
					type: '',
					istemp: '',
					cost: '',
					zno: '',
					invest: '',
					squre: '',
					jglb: '',
					purpose: '',
					sgno: '',
					dlmj: '',
					qlmj: '',
					gdcd: '',
					province: '',
					city: '',
					area: '',
					addr: '',
					cmpdate: '',
					jgno: '',
					startdate: '',
					ztjd: '',
					dqjd: '',
					zbgcm: '',
					zlmb: '',
					sbzl: '',
					sgno: ''
				},
				//项目名称编辑
				dialogFormProjnameVisible: false,
				nameLabelWidth: '80px',
				editProjnameUrl: global.host + 'Project/UpdateProjectName',
				formProjname: {
					token: '',
					parameter: {
						name: '',
						id: ''
					}
				},
				//项目基本资料编辑
				dialogFormProjbasicVisible: false,
				basicLabelWidth: '160px',
				editProjbasicUrl: global.host + 'Project/UpdateProject',
				formProjbasic: {
					token: '',
					parameter: {
						id: '',
						progress: '',
						name: '',
						bname: '',
						sno: '',
						type: '',
						istemp: '',
						cost: '',
						zno: '',
						invest: '',
						squre: '',
						jglb: '',
						purpose: '',
						sgno: '',
						dlmj: '',
						qlmj: '',
						gdcd: '',
						province: '',
						city: '',
						area: '',
						addr: '',
						cmpdate: '',
						jgno: '',
						startdate: '',
						ztjd: '',
						dqjd: '',
						zbgcm: '',
						zlmb: '',
						sbzl: '',
						sgno: ''
					}
				},
				//项目进度编辑
				dialogFormProjprogressVisible: false,
				progressLabelWidth: '120px',
				editProjprogressUrl: global.host + 'Project/UpdateProjectJD',
				formProjprogress: {
					token: '',
					parameter: {
						id: '',
						progress: '',
						remark: ''
					}
				},
				//项目竣工确认
				dialogFormProjcompleteVisible: false,
				editProjcompleteUrl: global.host + 'Project/ProjectComplete',
				formProjcomplete: {
					token: '',
					parameter: {
						id: ''
					}
				}
			}
		},
		computed: mapState({ user: state => state.user }),
		created() {
			this.getProjectData(),
			this.getProjectJglb(),	//获取监管类别数据
			this.getProjectType()	//获取项目类别数据
		},
		methods: {
			getProjectJglb: function(){
				var vm = this
				this.$http.get(vm.projJglbUrl,{'params':{'type':'projectjglb'}})
					.then((response) => {
						vm.projJglb = response.body
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjectType: function(){
				var vm = this
				this.$http.get(vm.projTypeUrl,{'params':{'type':'projecttype'}})
					.then((response) => {
						vm.projType = response.body
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjectData: function(){
				var vm = this
				 vm.param.params.token =  vm.user.token
				this.$http.get(vm.projUrl,vm.param)
					.then((response) => {
						vm.projDataTotal = response.body.total
						vm.projData = response.body.data
					})
					.catch(function(response) {
						console.log(response)
					})
			},
			handleSelectionChange: function(val) {
		    	this.projSelection = val
		    },
		    formatDate: function(row,column){
		    	var _date = row.cdate.replace(/T/,' ')
		    	return _date
		    },
		    handleSizeChange: function(val){
		    	this.param.params.pagesize = val
		    	this.getProjectData()
		    },
		    handleCurrentChange: function(val){
		    	this.param.params.pageindex = val
		    	this.getProjectData()
		    },
		    //显示修改项目dialog
			handleEditProj: function(obj){
				if(this.projSelection.length != 1) {
		    		alert("请选择一个项目")
		    		return false
		    	}
				
				this.currentProj = this.projSelection[0]

				if(obj === 'name'){
					this.dialogFormProjnameVisible = true
				}
				if(obj === 'basic'){
					this.formProjbasic.parameter = this.currentProj
					this.dialogFormProjbasicVisible = true
				}
				if(obj === 'progress'){
					this.dialogFormProjprogressVisible = true
				}
				if(obj === 'complete'){
					this.dialogFormProjcompleteVisible = true
				}
				
			},
			//保存新的项目名称
			formProjnameSave: function(){
				var vm = this
				vm.formProjname.token = vm.user.token
				vm.formProjname.parameter.id = vm.currentProj.id
				vm.$http.post(vm.editProjnameUrl,vm.formProjname)
					.then((response) => {
						vm.dialogFormProjnameVisible = false
						//刷新列表页
						vm.getProjectData()
					})
					.catch(function(response){
						console.log(response)
					})
			},
			//保存项目基本资料
			formProjbasicSave: function(){
				var vm = this
				vm.formProjbasic.token = vm.user.token
				console.log(vm.formProjbasic.parameter)
				vm.$http.post(vm.editProjbasicUrl,vm.formProjbasic)
					.then((response) => {
						vm.dialogFormProjbasicVisible = false
						vm.getProjectData()
					})
					.catch(function(response){
						console.log(response)
					})
			},
			//保存项目进度更改
			formProjprogressSave: function(){
				var vm = this
				vm.formProjprogress.token = vm.user.token
				vm.formProjprogress.parameter.id = vm.currentProj.id
				vm.$http.post(vm.editProjprogressUrl,vm.formProjprogress)
					.then((response) => {
						vm.dialogFormProjprogressVisible = false
						vm.getProjectData()
					})
					.catch(function(response){
						console.log(response)
					})
			},
			//保存竣工更改
			formProjcompleteSave: function(){
				var vm = this
				vm.formProjcomplete.token = vm.user.token
				vm.formProjcomplete.parameter.id = vm.currentProj.id
				vm.$http.post(vm.editProjcompleteUrl,vm.formProjcomplete)
					.then((response) => {
						vm.dialogFormProjcompleteVisible = false
						vm.getProjectData()
					})
					.catch(function(response){
						console.log(response)
					})
				
			},
			//查看项目详情页
			handleView: function(val){
				this.$router.push({ 
					name: 'project-companydetail', 
					params: {
						id: val.id
					}
				})
			}
		}
	}
</script>
