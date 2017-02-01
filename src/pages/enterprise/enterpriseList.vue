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
.el-row{
	margin-bottom:20px;
	margin-left:0;
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
		<div class="breadcrumb">企业列表</div>

		<!--企业列表数据-->
		<template>
			<div class="el-row">
				<el-input class="el-col-2" v-model="param.params.parameter.Name" style="margin-left: 10px; margin-right: 10px;" placeholder="企业名称">
			</el-input>
			<el-select class="el-col-2" v-model="param.params.parameter.Type" placeholder="企业类型" style="margin-left: 10px; margin-right: 10px;">
				<el-option v-for="item in options" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-input class="el-col-2" v-model="param.params.parameter.Address" style="margin-left: 10px; margin-right: 10px;" placeholder="企业地址">
			</el-input>
			<el-button type="primary" @click="getEnterprise" style="float:right;">查询</el-button>
			</div>
<div class="toolbar">
	<el-button type="gray" size="small">新增</el-button>
	<el-button type="gray" size="small">编辑</el-button>
	<el-button type="gray" size="small">删除</el-button>
	<el-button type="gray" size="small">导出</el-button>
	<el-button type="gray" size="small">导出全部</el-button>
</div>
<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
<el-table-column prop="EntCode" label="组织代码">
</el-table-column>
<el-table-column prop="EntName" label="企业名称">
</el-table-column>
<el-table-column prop="EntType" label="企业类型">
</el-table-column>
<el-table-column prop="EntCorporation" label="法人">
</el-table-column>
<el-table-column prop="EntRegFinance" label="注册资金">
</el-table-column>
<el-table-column prop="EntRegAddress" label="企业地址">
</el-table-column>
<el-table-column prop="EmpName" label="联系人">
</el-table-column>
<el-table-column prop="Mobile" label="联系电话">
</el-table-column>
<el-table-column prop="EntRegTime" label="注册日期">
</el-table-column>
<el-table-column inline-template :context="_self" label="操作" inline-template width="100">
	<span @click="handleEdit(tableData,$index)">
		<el-button type="text" size="small" >查看</el-button>
	</span>
</el-table-column>
</el-table>

<!--分页-->
<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
<el-pagination :current-page=param.params.pageindex :page-sizes="[20, 40, 80, 100]" :page-size=param.params.pageindex layout="total, sizes, prev, pager, next, jumper"
	:total=param.params.pagecount style="float:right">
</el-pagination>
</el-col>

<el-dialog title="" v-model="updateenter" size="small">
	<el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
		<el-tab-pane label="企业信息">
			<el-form ref="form" :model="getupdateenter.parameter" label-width="120px">
				<div class="el-col-24">
					<el-form-item label="是否有父企业" class="el-col-12">
						<el-checkbox v-model="check" @change="checkstate">子企业</el-checkbox>
					</el-form-item>
					<el-form-item label="父企业名称" class="el-col-12" v-show="checked">
						<el-select v-model="getupdateenter.parameter.parent_id" placeholder="请选择">
							<el-option v-for="item in EnterpriseListByParentId" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item label="企业名称" class="el-col-12">
					<el-input v-model="getupdateenter.parameter.name"></el-input>
					<span class="help-block" v-show="btn&&!getupdateenter.parameter.name">企业名称不能为空</span>
				</el-form-item>
				<el-form-item label="组织代码" class="el-col-12">
					<el-input v-model="getupdateenter.parameter.code"></el-input>
					<span class="help-block" v-show="btn&&!getupdateenter.parameter.code">组织代码资金不能为空</span>
				</el-form-item>
				<el-form-item label="企业详细地址" class="el-col-12">
					<el-input v-model="getupdateenter.parameter.reg_addr"></el-input>
					<span class="help-block" v-show="btn&&!getupdateenter.parameter.reg_addr">企业详细地址不能为空</span>
				</el-form-item>
				<el-form-item label="企业类别" class="el-col-12">
					<el-select v-model="getupdateenter.parameter.func_type" placeholder="请选择">
						<el-option v-for="item in enterprisetype" :label="item.name" :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业性质" class="el-col-12">
					<el-select v-model="getupdateenter.parameter.nature" placeholder="请选择">
						<el-option v-for="item in enterprisenature" :label="item.name" :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="企业地址" class="el-col-24">
					<v-region 
					:province="getupdateenter.parameter.reg_province" 
					:city="getupdateenter.parameter.reg_city" 
					:area="getupdateenter.parameter.reg_area" 
					@emitRegionChange="regionChange"
					>
					</v-region>
				</el-form-item>
				<el-form-item label="企业注册资金" class="el-col-12">
					<el-input v-model="getupdateenter.parameter.reg_finance"></el-input>
				<span class="help-block" v-show="btn&&!getupdateenter.parameter.reg_finance">企业注册资金不能为空</span>
							</el-form-item>
							<el-form-item label="企业办公电话" class="el-col-12">
								<el-input v-model="getupdateenter.parameter.tel"></el-input>
							</el-form-item>
				<el-form-item label="企业传真" class="el-col-12">
								<el-input v-model="getupdateenter.parameter.fax"></el-input>
							</el-form-item>
							<el-form-item label="企业email" class="el-col-12">
								<el-input v-model="getupdateenter.parameter.email"></el-input>
							</el-form-item>
				<el-form-item label="企业网址" class="el-col-12">
								<el-input v-model="getupdateenter.parameter.website"></el-input>
							</el-form-item>
				<el-form-item label="备注" class="el-col-12">
								<el-input v-model="getupdateenter.parameter.website"></el-input>
							</el-form-item>
					
				</el-form>
				<div class="el-col-12">
					<button type="button" @click="updateentersubmit" class="el-button el-button--primary" style="margin-left:50px;"><span>修改</span></button>
				</div>
		</el-tab-pane>
		<el-tab-pane label="企业附件">
			<el-table :data="EnterpriseAttachList" highlight-current-row v-loading="listLoading" style="width: 100%;">
<el-table-column prop="type" label="附件类型">
</el-table-column>
<el-table-column prop="ent_name" label="名称">
</el-table-column>
<el-table-column prop="type" label="附件文件类型">
</el-table-column>
<el-table-column prop="url" label="附件url">
</el-table-column>
<el-table-column prop="uploadurl" label="上传人">
</el-table-column>
<el-table-column prop="uploadtime" label="上传时间">
</el-table-column>
</el-table>
</el-tab-pane>
<el-tab-pane label="企业资格证书">
	<el-button type="primary" style="float:right;">新增</el-button>
<el-table :data="EnterpriseCertList" highlight-current-row v-loading="listLoading" style="width: 100%;">
<el-table-column prop="no" label="证书编号">
</el-table-column>
<el-table-column prop="name" label="名称">
</el-table-column>
<el-table-column prop="level" label="资质等级">
</el-table-column>
<el-table-column prop="url" label="证书url">
</el-table-column>
<el-table-column prop="organdate" label="证书有效时间">
</el-table-column>
<el-table-column prop="enddate" label="证书失效时间">
</el-table-column>
<el-table-column inline-template :context="_self" label="操作">
	<span @click="EnterpriseCert($index)">
								<el-button type="text" size="small" >删除</el-button>
							</span>
</el-table-column>
<!--分页-->
<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
<el-pagination :current-page=param.params.pageindex :page-sizes="[20, 40, 80, 100]" :page-size=param.params.pageindex layout="total, sizes, prev, pager, next, jumper"
	:total=param.params.pagecount style="float:right">
</el-pagination>
</el-col>
</el-table>
</el-tab-pane>
<el-tab-pane label="企业人员信息">
	<el-button type="primary" style="float:right;" @click="addperson()">新增</el-button>
<el-table :data="EnterpriseUsrEmployeeList" highlight-current-row v-loading="listLoading" style="width: 100%;">
<el-table-column prop="EmpName" label="姓名">
</el-table-column>
<el-table-column prop="EntCode" label="身份证号码">
</el-table-column>
<el-table-column prop="Mobile" label="手机号码">
</el-table-column>
<el-table-column prop="EntRegAddress" label="联系地址">
</el-table-column>
<el-table-column prop="Position" label="职位">
</el-table-column>
<el-table-column inline-template :context="_self" label="操作">
	<span @click="DeleteEnterpriseUser($index)">
									<el-button type="text" size="small" >删除</el-button>
								</span>
</el-table-column>
<!--分页-->
<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
<el-pagination :current-page=param.params.pageindex :page-sizes="[20, 40, 80, 100]" :page-size=param.params.pageindex layout="total, sizes, prev, pager, next, jumper"
	:total=param.params.pagecount style="float:right">
</el-pagination>
</el-col>
</el-table>
</el-tab-pane>
<el-tab-pane label="参与的相关项目">
	<el-table :data="EnterpriseProjectList" highlight-current-row v-loading="listLoading" style="width: 100%;">
<el-table-column prop="prj_name" label="项目名称">
</el-table-column>
<el-table-column prop="prj_name" label="项目地址">
</el-table-column>
<el-table-column prop="prj_name" label="所属区域">
</el-table-column>
<el-table-column prop="prj_manager" label="项目经理">
</el-table-column>
<el-table-column prop="prj_start" label="创建日期">
</el-table-column>
<el-table-column inline-template :context="_self" label="操作">
	<span @click="handleEdit">
		<router-link slot="right" to="/">查看</router-link>
	</span>
</el-table-column>
<!--分页-->
<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
<el-pagination :current-page=param.params.pageindex :page-sizes="[20, 40, 80, 100]" :page-size=param.params.pageindex layout="total, sizes, prev, pager, next, jumper"
	:total=param.params.pagecount style="float:right">
</el-pagination>
</el-col>
</el-table>
</el-tab-pane>
</el-tabs>
</el-dialog>
</template>
</div>

</template>

<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function () {
			return {
				checked:false,
				updateenter: false,//更新企业信息
				item: {},
				url: global.host + 'Enterprise/GetEnterpriseListPage',//企业列表
				geturl: global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
				getEnterpriseUserurl: global.host + 'Enterprise/GetEnterpriseUserList',//根据id来获取人员信息
				getEnterprisetypeurl:global.host + "SysDict/Get",
        		getEnterpriseListByParentIdurl:global.host + "Enterprise/GetEnterpriseListByParentId",
				getupdateenterurl:global.host + "Enterprise/UpdateEnterprise",//修改企业信息
				options: [{
					value: 'G',
					label: 'gov'
				}, {
					value: 'C',
					label: 'company'
				}],
				tableData: [],//返回的企业列表信息
				Enterprise: [],//企业基本信息
				EnterpriseAttachList: [],//企业营业执照
				EnterpriseUsrEmployeeList: [],//企业人员信息表
				EnterpriseProjectList: [],//企业项目信息
				EnterpriseCertList: [],
				enterprisetype: [],//企业类别
				enterprisenature: [],//企业性质
				param: {
					params: {
						"token": "",
						"pagesize": 20,
						"pageindex": 1,
						"parameter": {
							"Name": "",
							"Type": "",
							"Address": "",
							"TimeStart": "",
							"TimeEnd": ""
						},
						"sortcloumn": "id",
						"sortdirection": ""
					}
				},
				getparams: {
					"token": "",
					"pagesize": "",
					"pageindex": "",
					"parameter": "524187665793025",//524187665793025写死
					"sortcloumn": "",
					"sortdirection": "",
					"IsAsc": 7
				},
				EnterpriseUser: {
					"token": "",
					parameter: {
						"EntId": ""
					},
					"pageindex": "1",
					"pagesize": "5"

				},
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				getupdateenter:{
					"token": "",
					"parameter": {
						"id": "",
						"parent_id": "",
						"code": "",
						"name": "",
						"shortname": "",
						"type": "",
						"func_type": "",
						"qualification": "",
						"nature": "",
						"reg_province": "",
						"reg_city": "",
						"reg_area": "",
						"reg_addr": "",
						"reg_finance": "",
						"tel": "",
						"addr": "",
						"fax": "",
						"email": "",
						"website": "",
						"status": "",
						"remarks": "",
						"cdate": "",
						"cuser": "",
						"mdate": "",
						"muser": ""
					}
				},
				value6: '',
				value7: ''
			}
		},
		created() {
			this.getToken();
			this.getEnterprise();

		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': ''
		},
		computed: mapState({ user: state => state.user }),
		methods: {
			getToken: function () {
				this.param.params.token = this.user.token;
				this.getparams.token = this.user.token;
				this.EnterpriseUser.token = this.user.token;
				this.getupdateenter.token=this.user.token;
				
			},
			getEnterprise: function () {//企业列表信息
				this.getEnterprisetype();
				this.getenterprisenature();
				this.getEnterpriseListByParentId();
				this.$http.get(this.url, this.param)
					.then((response) => {
						this.tableData = response.body.data;
						this.params.pageindex = response.body.pageindex;
						this.params.pagecount = response.body.pagecount;
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			updateentersubmit:function(){
				this.$http.post(this.getupdateenterurl, this.getupdateenter)
					.then((response) => {
						if(response.body.ret=="0"){
							alert("更新成功")
						}
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			checkstate(){
				this.checked=!this.checked;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			},
			handleEdit(obj,$index) {
				console.log(obj[$index].EntId)
				this.$router.replace({ path: '/enterprise-details/'+obj[$index].EntId })
				return;
				this.updateenter = true;
				this.getparams.parameter = this.tableData[$index].EntId;
				this.EnterpriseUser.EntId = this.tableData[$index].EntId;
				this.$http.get(this.geturl, { "params": this.getparams })
					.then((response) => {
						this.getupdateenter.parameter= response.body.data.Enterprise.EnterpriseBasicData;
						this.EnterpriseAttachList = response.body.data.EnterpriseAttachList;

						this.EnterpriseProjectList = response.body.data.EnterpriseProjectList;
						this.EnterpriseCertList = response.body.data.EnterpriseCertList;
						//this.tableData=response.body.data;
						//this.params.pageindex=response.body.pageindex;
						//this.params.pagecount=response.body.pagecount;
					})
					.catch(function (response) {
						console.log(response)
					})
				this.$http.get(this.getEnterpriseUserurl, { "params": this.EnterpriseUser })
					.then((response) => {
						this.EnterpriseUsrEmployeeList = response.body.data;//人员接口搬到外面去。
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			handleRemove(tab) {
				console.log(tab);
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			EnterpriseCert($index) {
				var parameter = this.EnterpriseCertList[$index].id;
				this.$http.post(global.host + 'Enterprise/DeleteEnterpriseCert', { "token": this.user.token, "parameter": parameter })
					.then((response) => {
						this.EnterpriseCertList.splice($index, 1);//删除当前行
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			DeleteEnterpriseUser($index) {
				var parameter = this.EnterpriseUsrEmployeeList[$index].Id;
				this.$http.post(global.host + 'Enterprise/DeleteEnterpriseUser', { "token": this.user.token, "parameter": parameter })
					.then((response) => {
						this.EnterpriseUsrEmployeeList.splice($index, 1);//删除当前行
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			addperson() {
				this.$router.replace({ path: '/enterprise-regperson' })
			},
			getEnterprisetype: function () {//企业类别
				this.$http.get(this.getEnterprisetypeurl, { "params": { "type": "enterprisetype" } })
					.then((response) => {
						this.enterprisetype = response.body;
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			getEnterpriseListByParentId: function () {//子企业用户

				this.$http.get(this.getEnterpriseListByParentIdurl, { "params": { "token": this.user.token, "parameter": "0" } })
					.then((response) => {
						this.EnterpriseListByParentId = response.body.data;
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			getenterprisenature: function () {
				this.$http.get(this.getEnterprisetypeurl, { "params": { "type": "enterprisenature" } })
					.then((response) => {
						this.enterprisenature = response.body;
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			regionChange: function(selectedObj){
				this.getupdateenter.parameter.reg_province = selectedObj.province
				this.getupdateenter.parameter.reg_city = selectedObj.city
				this.getupdateenter.parameter.reg_area = selectedObj.area
			}

		}
	}
</script>