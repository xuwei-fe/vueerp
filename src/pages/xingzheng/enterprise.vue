<style scoped>
.page-prod {
	position: absolute;
	left: 180px;
	right: 0;
	top: 0;
	bottom: 0;
	overflow-x: hidden;
}
.prod-sidebar {
	z-index: 102;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 180px;
	background-color: #eee;
	overflow-x: hidden;
	visibility: hidden;

  -webkit-transition: all;
       -o-transition: all;
          transition: all;
}
.prod-sidebar .prod-nav-title {
	color: #2b3643;
	font-size: 14px;
	font-weight: bold;
	height: 70px;
	line-height: 70px;
	padding: 0 25px;
	overflow: hidden;
	text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
}
.prod-main {
    position: absolute;
    right: 0;
    top: 0;
	bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.2s ease 0s;
    width: auto;
    padding: 15px;
}
.page-prod-mini .prod-sidebar {
	visibility: visible;
}
.page-prod-mini .prod-main {
	left: 180px;
}
.prod-sidebar-collapse {
	position: absolute;
	top: 50%;
	margin-top: -40px;
	
	z-index: 109;
	cursor: pointer;

	width: 16px;
    height: 80px;
    background: url(../../img/icon-spread.png) no-repeat center;
}
.page-prod-mini .prod-sidebar-collapse {
	left: 164px;
	background: url(../../img/icon-collapse.png) no-repeat center;
}
.prod-sidebar .el-menu {
	position: absolute;
	top: 70px;
	left: 0;
	bottom: 0;
	right: 0;
	overflow-y: auto;
	background-color: transparent;
}
.prod-sidebar .el-menu-item {
	height: 40px;
	line-height: 40px;
	padding: 0;
}
.prod-sidebar .el-menu-item a {
	display: block;
	color: #333;
	text-decoration: none;
}
.prod-sidebar .el-menu-item:hover {
	background-color: #e5e5e5;
}
.prod-sidebar .el-menu-item.is-active {
	background-color: #fff;
}
</style>
<template>
	<div>
		<!-- 导航条 -->
		<div class="breadcrumb">单位列表</div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="enterpriseparams.parameter.Name" placeholder="请输入企业名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="enterlist">查询</el-button>
			</el-form-item>
		</el-form>
		<el-button type="gray" size="small">新增</el-button>
		<el-button type="gray" size="small" @click="editcompanybut">编辑</el-button>
		<el-button type="gray" size="small" @click="delcompany">删除</el-button>
		<el-button type="gray" size="small">导出</el-button>
		<el-button type="gray" size="small">导出全部</el-button>
		<el-table
			:data="enterprisedata.data"
			@selection-change="handleSelectionChange"
			style="width: 100%">
			<el-table-column
				type="selection"
				width="55">
			</el-table-column>
			<el-table-column  inline-template 
				label="单位名称	"
				width="250">
				<a href="javascript:;" @click="Enterdialog($index,'Enterdialogopen')">{{enterprisedata.data[$index].EntName}}</a>
			</el-table-column>
			<el-table-column
				prop="EntCorporation"
				label="负责人"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="电话">
			</el-table-column>
			<el-table-column
				prop="name"
				label="备注"
				width="180">
			</el-table-column>
			<el-table-column
				prop="EntRegTime"
				label="添加日期">
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="enterprisedata.pageindex"
			:page-sizes="[20, 40, 80,100]"
			:page-size="enterpriseparams.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="enterprisedata.total">
			</el-pagination>
		</div>
		<el-dialog v-model="Enterdialogopen" size="small">
			<el-tabs v-model="activeName">
				<el-tab-pane label="单位信息" >
					<el-form label-width="120px">
						<el-form-item label="父级单位：">
							<span v-if="companydata.parent_id!=0">{{companydata.parent_id}}</span>
						</el-form-item>
						<el-form-item label="辖区：">
							<span>{{companydata.EnterpriseBasicData.reg_province}}{{companydata.EnterpriseBasicData.reg_city}}{{companydata.EnterpriseBasicData.reg_area}}</span>
						</el-form-item>
						<el-form-item label="地址">
							<span>{{companydata.EnterpriseBasicData.addr}}</span>
						</el-form-item>
						<el-form-item label="联系人：">
							<span>{{companydata.Contacts}}</span>
						</el-form-item>
						<el-form-item label="联系电话：">
							<span>{{companydata.ContactsMobile}}</span>
						</el-form-item>
						<el-form-item label="备注：">
							<span>{{companydata.EnterpriseBasicData.remarks}}</span>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="单位人员">
					<el-table
					:data="companyuser"
					style="width: 100%">
						<el-table-column
							prop="EmpName"
							label="姓名"
							width="180">
						</el-table-column>
						<el-table-column
							prop="Sex"
							label="性别"
							width="180">
						</el-table-column>
						<el-table-column
							prop="Mobile"
							label="电话">
						</el-table-column>
						<el-table-column
							prop="Province"
							label="辖区">
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
		<el-dialog title="提示" v-model="editdialogopen" size="tiny">
			<el-tabs>
				<el-tab-pane label="单位信息" >
					<el-form label-width="120px">
						<el-form-item label="父级单位：">
							<el-select v-model="companydata.parent_id" placeholder="请选择活动区域">
								<el-option label="区域一" value="shanghai"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="辖区：">
							<v-region
								:province="companydata.EnterpriseBasicData.reg_province" 
								:city="companydata.EnterpriseBasicData.reg_city" 
								:area="companydata.EnterpriseBasicData.reg_area" 
								@emitRegionChange="editRegionChange"
								>
							</v-region>
						</el-form-item>
						<el-form-item label="地址">
							<el-input v-model="companydata.EnterpriseBasicData.addr"></el-input>
						</el-form-item>
						<el-form-item label="联系人：">
							<el-input v-model="companydata.Contacts"></el-input>
						</el-form-item>
						<el-form-item label="联系电话：">
							<el-input v-model="companydata.ContactsMobile"></el-input>
						</el-form-item>
						<el-form-item label="备注：">
							<el-input v-model="companydata.EnterpriseBasicData.remarks"></el-input>
						</el-form-item>
						
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<div slot="footer" class="dialog-footer" style="text-align:left;padding-left:120px; margin-top: -30px;">
				<el-button type="primary" style="width:100px" @click="editcompany">保存</el-button>
				<el-button type="gray" style="width:100px" @click="editdialogopen = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
    export default {
    	data: function (){
		    return {
				editdialogopen:false,
				Enterdialogopen:false,
				enterpriselisturl:global.host+"Enterprise/GetEnterpriseListPage",//单位列表
				enterprisedata:[],//单位数据
				enterpriseparams:{	//单位参数
					"token": "",
					"pagesize": 20,
					"pageindex": 1,
					"parameter": {
						"Name": "",
						"Type": "G",
						"Address": "",
						"TimeStart": "",
						"TimeEnd": ""
					},
					"sortcloumn": "id",
					"sortdirection": ""
				},
				multipleSelection: [],
				UserById:global.host+"Enterprise/GetEnterprise",//企业ID获取单位信息
				userlist:global.host+"Enterprise/GetEnterpriseUserList",//企业ID获取人员详情
				Updateurl:global.host+"Enterprise/UpdateEnterprise",//修改企业信息
				delurl:global.host+"Enterprise/DeleteEnterpriseById",//删除企业信息
				companydata:{
					EnterpriseBasicData:""
				},
				companyuser:""

		    }
    	},
    	created() {
			this.enterlist()
    	},
    	watch: {
    		
    	},
		computed: mapState({ user: state => state.user }),
        methods: {
			enterlist(){
				this.enterpriseparams.token=this.user.token;
				this.$http.get(this.enterpriselisturl, {"params":this.enterpriseparams})
				.then((response) => {
					this.enterprisedata = response.body;
				})
				.catch(function (response) {
					console.log(response)
				})
			},
			editcompany(){
				this.$http.post(this.Updateurl, {"token":this.user.token,"parameter":this.multipleSelection[0].EntId})
				.then((response) => {
					//this.companydata = response.body.data.Enterprise;
				})
				.catch(function (response) {
					console.log(response)
				})
			},
			delcompany(){
				this.$http.post(this.delurl, {"token":this.user.token,"parameter":this.multipleSelection[0].EntId})
				.then((response) => {
					if(response.body.ret=="0"){
						alert("删除成功")
					}
					//this.companydata = response.body.data.Enterprise;
				})
				.catch(function (response) {
					console.log(response)
				})
			},
			handleSizeChange(val) {
				this.enterpriseparams.pagesize=val;
				this.enterlist()
			},
			handleCurrentChange(val) {
				this.enterpriseparams.pageindex=val;
				this.enterlist()
			},
			handleSelectionChange(val) {
				console.log(val)
				this.multipleSelection = val;
			},
			Enterdialog(index,dialog){
				this[dialog]=true;
				this.$http.get(this.UserById, {"params":{"token":this.user.token,"parameter":this.enterprisedata.data[index].EntId}})
				.then((response) => {
					this.companydata = response.body.data.Enterprise;
				})
				.catch(function (response) {
					console.log(response)
				})
				this.$http.get(this.userlist, {"params":{"token":this.user.token,"parameter":{"Position":"联系人","Type":"G","EntId":this.enterprisedata.data[index].EntId}}})
				.then((response) => {
					this.companyuser = response.body.data;
				})
				.catch(function (response) {
					console.log(response)
				})

			},
			addRegionChange: function(selectedObj){
				var vm = this
				vm.companydata.EnterpriseBasicData.province = selectedObj.province
				vm.companydata.EnterpriseBasicData.city = selectedObj.city
				vm.companydata.EnterpriseBasicData.area = selectedObj.area
				if(vm.companydata.EnterpriseBasicData.province != '' && vm.companydata.EnterpriseBasicData.city != '' && vm.companydata.EnterpriseBasicData.area != ''){
					vm.companydata.EnterpriseBasicData.region = vm.companydata.EnterpriseBasicData.province + vm.companydata.EnterpriseBasicData.city + vm.companydata.EnterpriseBasicData.area
				}else{
					vm.companydata.EnterpriseBasicData.region = ''
				}
			},
			editRegionChange: function(selectedObj){
				var vm = this
				vm.companydata.EnterpriseBasicData.province = selectedObj.province
				vm.companydata.EnterpriseBasicData.city = selectedObj.city
				vm.companydata.EnterpriseBasicData.area = selectedObj.area
				if(vm.companydata.EnterpriseBasicData.province != '' && vm.companydata.EnterpriseBasicData.city != '' && vm.companydata.EnterpriseBasicData.area != ''){
					vm.companydata.EnterpriseBasicData.region = vm.companydata.EnterpriseBasicData.province + vm.companydata.EnterpriseBasicData.city + vm.companydata.EnterpriseBasicData.area
				}else{
					vm.companydata.EnterpriseBasicData.region = ''
				}
			},
			editcompanybut(){
				if(this.multipleSelection.length!=1){
					alert("请选择一个单位名称");
					return;
				}
				this.Enterdialog(this.multipleSelection[0].EntId,'editdialogopen')
			}
			
        }
    }
</script>