<template>
	<el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
		<el-tab-pane label="企业信息">
			<el-form ref="form" :model="getupdateenter.parameter" label-width="120px">
                <el-form-item v-if="getupdateenter.parameter.parent_id" label="父企业名称" class="el-col-24">
                    <el-select v-model="getupdateenter.parameter.parent_id" placeholder="请选择">
                        <el-option v-for="item in EnterpriseListByParentId" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="企业名称" class="el-col-24">
					<el-input v-model="getupdateenter.parameter.name"></el-input>
				</el-form-item>
				<el-form-item label="组织代码" class=" el-col-24">
					<el-input v-model="getupdateenter.parameter.code"></el-input>
				</el-form-item>
                <el-form-item label="法人" class="el-col-24" prop="Corporation"  >
							<el-input v-model="getupdateenter.parameter.Corporation"></el-input>
						</el-form-item>
            <el-form-item label="法人身份证号码" class="el-col-24" prop="CorporationIdno"  >
							<el-input v-model="getupdateenter.parameter.CorporationIdno"></el-input>
						</el-form-item>
                <el-form-item label="所属辖区" class="el-col-24">
                    <v-region 
                    :province="getupdateenter.parameter.reg_province" 
                    :city="getupdateenter.parameter.reg_city" 
                    :area="getupdateenter.parameter.reg_area" 
                    @emitRegionChange="regionChange"
                    >
                    </v-region>
                </el-form-item>
				<el-form-item label="详细地址" class=" el-col-24">
					<el-input v-model="getupdateenter.parameter.reg_addr"></el-input>
				</el-form-item>
				<el-form-item label="类别" class=" el-col-24">
					<el-select v-model="getupdateenter.parameter.func_type" placeholder="请选择">
						<el-option v-for="item in enterprisetype" :label="item.name" :value="item.val">
						</el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="注册资金" class="el-col-12">
					<el-input v-model="getupdateenter.parameter.reg_finance"></el-input>
				</el-form-item>
                <el-form-item label="办公电话" class="el-col-12">
                    <el-input v-model="getupdateenter.parameter.tel"></el-input>
                </el-form-item>
				<el-form-item label="传真" class="el-col-12">
                    <el-input v-model="getupdateenter.parameter.fax"></el-input>
                </el-form-item>
                <el-form-item label="email" class="el-col-12">
                    <el-input v-model="getupdateenter.parameter.email"></el-input>
                </el-form-item>
				<el-form-item label="网址" class="el-col-12">
                    <el-input v-model="getupdateenter.parameter.website"></el-input>
                </el-form-item>
				<el-form-item label="备注" class="el-col-12">
                    <el-input v-model="getupdateenter.parameter.website"></el-input>
                </el-form-item>
				</el-form>
				<div class="el-col-12">
					<button type="button" @click="updateentersubmit" class="el-button el-button--primary" style="margin-left:50px;"><span>保存</span></button>
				</div>
		</el-tab-pane>
        <el-tab-pane label="企业联系人">
			<el-table
            :data="EnterpriseUsrEmployeeList"
            style="width: 100%">
                <el-table-column
                    prop="EmpName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Mobile"
                    label="证件类型"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Idcardno"
                    label="证件号码">
                </el-table-column>
                <el-table-column
                    prop="Mobile"
                    label="办公电话"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Mobile"
                    label="手机号码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Mobile"
                    label="电子邮箱">
                </el-table-column>
            </el-table>
		</el-tab-pane>
		
		<el-tab-pane label="企业资格证书">
			<el-form label-width="120px">
				<el-form-item label="证书分类：">
					<el-select placeholder="请选择证书分类" v-model="zstype">
						<el-option v-for="item in zs" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button type="gray" size="small" @click="addzs=true">新增</el-button>
			<el-table :data="EnterpriseCertList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column label="证书编号" prop="Cert.no">
			</el-table-column>
			<el-table-column prop="Status" label="证书状态">
			</el-table-column>
			<el-table-column prop="Cert.enddate" label="证书有效时间">
			</el-table-column>
			<el-table-column label="附件" inline-template>
				<a :href="EnterpriseCertList[$index].Cert.url">{{EnterpriseCertList[$index].Cert.url}}</a>
			</el-table-column>
			<el-table-column prop="Cert.remark" label="备注">
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
				<el-dialog title="新增企业证书" v-model="addzs" size="tiny">
					<el-form ref="form" :model="Enterprisezs" label-width="120px">
						<el-form-item label="资质证书类别">
							<el-select placeholder="请选择证书分类" v-model="Enterprisezs.parameter.type" class="el-col-24">
								<el-option v-for="item in zs" :label="item.name" :value="item.name"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="证书编号">
						<el-input v-model="Enterprisezs.parameter.no"></el-input>
						</el-form-item>
						<el-form-item label="证书有效日期">
							<el-date-picker  class="el-col-24"
								v-model="Enterprisezs.parameter.enddate"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="证书" class="el-col-24">
							<el-upload
								action="//Enterprise/UpEnterpriseCert"
								:on-success="handlezs"
								:default-file-list="fileList">
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
						<el-form-item label="证书备注" class="el-col-24">
						<el-input v-model="Enterprisezs.parameter.name"></el-input>
						</el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
						<el-button @click="addzs = false">取 消</el-button>
						<el-button type="primary" @click="personsubmit">保存</el-button>
					</span>
				</el-dialog>
		</el-tab-pane>
                <el-tab-pane label="企业附件">
				<el-button type="gray" size="small" @click="addattach">新增</el-button>
					<el-table :data="EnterpriseAttachList" highlight-current-row v-loading="listLoading" style="width: 100%;">
						<el-table-column label="名称" inline-template>
							<a :href="EnterpriseAttachList[$index].url">{{EnterpriseAttachList[$index].name}}</a>
						</el-table-column>
						<el-table-column prop="uploaduser" label="上传人">
						</el-table-column>
						<el-table-column prop="uploadtime" label="上传时间">
						</el-table-column>
						<el-table-column inline-template :context="_self" label="操作">
							<span @click="DeleteCert($index)">
								<el-button type="text" size="small" >删除</el-button>
							</span>
						</el-table-column>
					</el-table>
					<el-dialog title="新增附件" v-model="addfj" size="tiny">
						<el-form ref="form" :model="attparams" label-width="120px">
							<el-form-item label="附件类型">
								<el-select placeholder="请选择附件类型" v-model="attparams.parameter.type" class="el-col-24">
									<el-option v-for="item in addattachdata" :label="item.name" :value="item.val"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="上传附件" class="el-col-24">
								<el-upload
									:action="updateenterurl"
									:on-success="handlePreview"
									:default-file-list="fileList">
									<el-button size="small" type="primary">点击上传</el-button>
								</el-upload>
							</el-form-item>
						</el-form>
						<span slot="footer" class="dialog-footer">
							<el-button @click="addfj = false">取 消</el-button>
							<el-button type="primary" @click="addattrsubmit">保存</el-button>
						</span>
					</el-dialog>
                </el-tab-pane>
        </el-tabs>
</template>
<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
		data: function () {
			return {
				addfj:false,//附件弹框
				addzs:false,//证书弹窗
				updateenter: false,//更新企业信息
				item: {},
				zstype:"",//证书分类
				url: global.host + 'Enterprise/GetEnterpriseListPage',//企业列表
				geturl: global.host + 'Enterprise/GetEnterprise',//根据id来获取企业信息
				getEnterpriseUserurl: global.host + 'Enterprise/GetEnterpriseUserList',//根据id来获取人员信息
				getEnterprisetypeurl:global.host + "SysDict/Get",
        		getEnterpriseListByParentIdurl:global.host + "Enterprise/GetEnterpriseListByParentId",
				getupdateenterurl:global.host + "Enterprise/UpdateEnterprise",//修改企业信息
                GetDictsurl:global.host + "SysDict/Get",//查询数据字典
				SaveEnterpriseAttachurl:global.host + "Enterprise/SaveEnterpriseAttach",//保存新增附件
				options: [{
					value: 'G',
					label: 'gov'
				}, {
					value: 'C',
					label: 'company'
				}],
				tableData: [],//返回的企业列表信息
				Enterprise: [],//企业基本信息
				EnterpriseAttachList: [],//企业附件
				EnterpriseUsrEmployeeList: [],//企业人员信息表
				EnterpriseProjectList: [],//企业项目信息
				EnterpriseCertList: [],//证书分类数据
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
						"EntId": "",
                        "Postion":"联系人"
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
				value7: '',
                zs:"",
				addattachdata:"",
				projSelection:"",
				Enterprisezs:{//证书基本信息
					"token": "",
					"pagesize": 0,
					"pageindex":1,
					"parameter":{
						"id": "",
						"ent_id": "",
						"ent_name": "",
						"ent_code": "",
						"name": "",
						"no": "",
						"type": "",
						"level": "",
						"organdate": "",
						"enddate": "",
						"url": "",
						"remark": ""
					}
				},
				attparams:{ 
					"token": "",
					"parameter": {
						"id": "",
						"ent_id": "",
						"ent_name": "",
						"ent_code": "",
						"type": "",
						"name": "",
						"ext": "",
						"url": "",
						"uploadtime": "",
						"uploaduser": ""
					}
				},
				updateenterurl:global.host + "Sys/UploadStream",
				UpdateEnterpriseurl:global.host + "Enterprise/SaveEnterpriseCert"
			}
		},
		created() {
			this.getToken();
			this.getEnterprise();
            this.GetDicts();

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
                        this.handleEdit(this.$route.params.id)
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				console.log(`当前页: ${val}`);
			},
			handleEdit(entid) {
				this.updateenter = true;
				this.getparams.parameter = entid;
				this.EnterpriseUser.EntId = entid;
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
			EnterpriseCert($index) { //删除证书
				var parameter = this.EnterpriseCertList[$index].id;
				this.$http.post(global.host + 'Enterprise/DeleteEnterpriseCert', { "token": this.user.token, "parameter": parameter })
					.then((response) => {
						this.EnterpriseCertList.splice($index, 1);
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			DeleteCert($index) { //删除附件
				var parameter = this.EnterpriseAttachList[$index].id;
				this.$http.post(global.host + 'Enterprise/DeleteEnterpriseAttach', { "token": this.user.token, "parameter": parameter })
					.then((response) => {
						this.EnterpriseAttachList.splice($index, 1);
					})
					.catch(function (response) {
						console.log(response)
					})
			},
			DeleteEnterpriseUser($index) { //删除企业人员
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
            handleSelectionChange(val){
				this.projSelection=val;
				if(this.projSelection.length != 1) {
		    		alert("请选择一个项目")
		    		return false
		    	}
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
			},
            GetDicts: function () {
				this.$http.get(this.GetDictsurl, { "params": { "type": "enterprisecerttype" } })
					.then((response) => {
						this.zs=response.body;
					})
					.catch(function (response) {
						console.log(response)
					})
			},
            personsubmit(){
				this.Enterprisezs.token=this.user.token;
				var tmpdate=this.Enterprisezs.parameter.enddate;
				var y=tmpdate.getFullYear();
				var m=tmpdate.getMonth()+1
				var d=tmpdate.getDate()
				this.Enterprisezs.parameter.enddate=y+"-"+m+"-"+d;
				this.Enterprisezs.parameter.ent_name=this.EnterpriseCertList.ent_name
				this.Enterprisezs.parameter.ent_id=this.$route.params.id
				this.$http.post(this.UpdateEnterpriseurl,this.Enterprisezs)
					.then((response) => {
					if(response.body.ret==0){
						alert("保存成功");
						this.addzs=false;
						this.handleEdit(this.$route.params.id)
					}
					else{
						alert(response.body.msg)
					}
					})
					.catch(function(response) {
						console.log(response)
					})
			},
			addattach(){	//新增附件前跑附件类型
				this.addfj=true;
				this.$http.get(this.GetDictsurl,{ "params": { "type": "enterpriseattachtype" }})
					.then((response) => {
						this.addattachdata=response.body;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
			addattrsubmit(){
				this.attparams.token=this.user.token;
				this.attparams.parameter.code=this.getupdateenter.parameter.code;
				this.attparams.parameter.ent_id=this.getupdateenter.parameter.id;
				this.attparams.parameter.ent_name=this.getupdateenter.parameter.name;
				this.$http.post(this.SaveEnterpriseAttachurl,this.attparams)
				.then((response) => {
					if(response.body.ret==0){
						this.addfj=false;
						this.handleEdit(this.$route.params.id)
					}
					else{
						alert(response.body.msg)
					}
				})
				.catch(function(response) {
					console.log(response)
				})
			},
			handlePreview(response, file, fileList){
				var tmpname=file.name.split(".")
				this.attparams.parameter.name=tmpname[0];
				this.attparams.parameter.ext=tmpname[1];
				this.attparams.parameter.uploaduser=this.user.id;
				if(response.body.ret==0){
					this.addfj=false;
					this.attparams.parameter.url=response.body.data
				}
				else{
					alert(response.body.msg)
				}
			},
			handlezs(response, file, fileList){
				console.log(response)
				if(response.body.ret==0){
					
				}
				else{
					alert(response.body.msg)
				}
			}
		}
	}
</script>