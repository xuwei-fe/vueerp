<style lang="less" scoped>
  .frombox{
    .el-form-item__content{
      margin-left:140px;
    }
  }
</style>
<template>
  <div>
          <v-wrapheader></v-wrapheader>
					
					<div style="width:700px;margin:0 auto;">
						<el-steps :active="active"  align-center="true" style="margin: 20px auto 20px;width:500px">
							<el-step title="上传营业执照" description=""></el-step>
							<el-step title="填写企业基本信息" description=""></el-step>
							<el-step title="企业联系人信息" description=""></el-step>
						</el-steps>
						<el-form v-if="regenterprise" ref="Enterprise.parameter" :rules="formProjectRules" :model="Enterprise.parameter" label-width="140px">
							<el-form-item label="上传营业执照" class="el-col-24">
                  <el-upload
										:thumbnail-mode="true"
                    :action="uploadPhoto"
                    type="drag"
										:show-upload-list="false"
                    :multiple="false"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif/jpeg/bmp文件，且不超过3mb</div>
                  </el-upload>
              </el-form-item>
							<el-form-item label="统一信用代码" class="el-col-24" prop="code"  >
								<el-input v-model="Enterprise.parameter.code"></el-input>
							</el-form-item>
							<el-form-item label="名称" class="el-col-24"  prop="name"  >
								<el-input v-model="Enterprise.parameter.name"></el-input>
							</el-form-item>
							<el-form-item label="详细地址" class="el-col-24" prop="reg_addr"  >
								<el-input v-model="Enterprise.parameter.reg_addr"></el-input>
							</el-form-item>
							<el-form-item label="注册资金" class="el-col-24" prop="reg_finance"  >
								<el-input v-model="Enterprise.parameter.reg_finance"></el-input>
							</el-form-item>
							<el-form-item label="法人" class="el-col-24" prop="Corporation"  >
								<el-input v-model="Enterprise.parameter.Corporation"></el-input>
							</el-form-item>
							<button style="margin-left:100px;" type="button" @click="checkstate('Enterprise.parameter')" class="el-button el-button--primary"><span>下一步</span></button>
						</el-form>
						<el-form v-else-if="regenterprise2" ref="Enterprise2.parameter" :model="Enterprise2.parameter" label-width="120px" :rules="formProjectRules2">
							<el-form-item label="类别" class="el-col-24" prop="func_type"  >
								<el-select v-model="Enterprise2.parameter.func_type" placeholder="请选择">
									<el-option
										v-for="item in enterprisetype"
										:label="item.name"
										:value="item.val">
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="地址" class="el-col-24" prop="region"  >
									<v-region v-model="Enterprise2.parameter.region"
										:province="Enterprise2.parameter.province" 
										:city="Enterprise2.parameter.city" 
										:area="Enterprise2.parameter.area" 
										@emitRegionChange="regionChange"
										>
										</v-region>
							</el-form-item>
							<el-form-item label="法人身份证号码" class="el-col-24" prop="CorporationIdno"  >
								<el-input v-model="Enterprise2.parameter.CorporationIdno"></el-input>
							</el-form-item>
							<el-form-item label="性质" class="el-col-24" prop="nature"  >
								<el-select v-model="Enterprise2.parameter.nature" placeholder="请选择">
									<el-option
										v-for="item in enterprisenature"
										:label="item.name"
										:value="item.val">
									</el-option>
								</el-select>
							</el-form-item><el-form-item label="办公电话" class="el-col-24">
								<el-input v-model="Enterprise2.parameter.tel"></el-input>
							</el-form-item>
							<el-form-item label="传真" class="el-col-24">
								<el-input v-model="Enterprise2.parameter.fax"></el-input>
							</el-form-item>
							<el-form-item label="email" class="el-col-24">
								<el-input v-model="Enterprise2.parameter.email"></el-input>
							</el-form-item>
							<el-form-item label="网址" class="el-col-24">
								<el-input v-model="Enterprise2.parameter.website"></el-input>
							</el-form-item>
							<button  style="margin-left:120px;" type="button" @click="regenterprise=true;regenterprise2=false;regenterprise3=false;if (active-- <0) this.active = 0;" class="el-button el-button--primary"><span>上一步</span></button>
							<button style="margin-left:100px;" type="button" @click="checkstate2('Enterprise2.parameter')" class="el-button el-button--primary"><span>下一步</span></button>
						</el-form>
						<el-form  v-else-if="regenterprise3" ref="Enterprise3.parameter" :model="Enterprise3.parameter" label-width="120px" :rules="formProjectRules3">
								<el-form-item label="登陆账号" class="el-col-24"  prop="LoginUserName">
									<el-input v-model="Enterprise3.parameter.LoginUserName"></el-input>
								</el-form-item>
								<el-form-item label="登陆密码" class="el-col-24" prop="Password">
									<el-input v-model="Enterprise3.parameter.Password"></el-input>
								</el-form-item>
								<el-form-item label="姓名" class="el-col-24" prop="Contacts">
									<el-input v-model="Enterprise3.parameter.Contacts"></el-input>
								</el-form-item>
								<el-form-item label="电话" class="el-col-24" prop="ContactsMobile">
									<el-input v-model="Enterprise3.parameter.ContactsMobile"></el-input>
								</el-form-item>
								<el-form-item label="身份证号" class="el-col-24" prop="ContactsIdno">
									<el-input v-model="Enterprise3.parameter.ContactsIdno"></el-input>
								</el-form-item>
								<div class="el-col-24" style="padding-left:120px;">
										<button type="button" @click="regenterprise=false;regenterprise2=true;regenterprise3=false;if (active-- <0) this.active = 0;" class="el-button el-button--primary"><span>上一步</span></button>
										<button type="button" @click="personsubmit('Enterprise3.parameter')" class="el-button el-button--primary"><span>保存</span></button>
								</div>
						</el-form>
					</div>
        </div>
</template>
<script>
// 引入全局变量
	import global from '../../config/global';
  import { mapState } from 'vuex';
	export default {
		data: function(){
			return {
				active:0,
        tokenstr:{"token":""},
				uploadPhoto:global.host+'Enterprise/UpEnterpriseBusinessLicense',
        url:global.host + "SysArea/GetList?parameter.parentcode=",
        updateimg:global.host + "Sys/UploadFile",
        province:[],
        city: [],
        area:[],
        default:0,
        checkprovince:"",
        checkcity:"",
        checkarea:"",
        regenterprise:true,//默认企业注册
				regenterprise2:false,
				regenterprise3:false,
        btn:false,//默认不显示
        checked: false,
				Enterprise:{
          "token": "",
          "pagesize": 2,
          "pageindex": 3,
          "parameter": {
            "Corporation": "",
            "CorporationIdno": "",
            "ImageUrl": "",
            "CertImageUrl": "",
            "LoginUserName": "",
            "Password": "",
            "Contacts": "",
            "ContactsMobile": "",
            "ContactsIdno": "",
            "ContactsAddress": "",
            "empid": "",
            "id": "",
            "parent_id":"",
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
            "muser": "",
            region: ''
          },
          "sortcloumn": "",
          "sortdirection": ""
        },//企业基本信息
				Enterprise2:{
					"parameter": {
            "Corporation": "",
            "CorporationIdno": "",
            "ImageUrl": "",
            "CertImageUrl": "",
            "LoginUserName": "",
            "Password": "",
            "Contacts": "",
            "ContactsMobile": "",
            "ContactsIdno": "",
            "ContactsAddress": "",
            "empid":"",
            "id":"",
            "parent_id":"",
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
            "muser": "",
            region: ''
          }
				},
				Enterprise3:{
					"parameter": {
            "Corporation": "",
            "CorporationIdno": "",
            "ImageUrl": "",
            "CertImageUrl": "",
            "LoginUserName": "",
            "Password": "",
            "Contacts": "",
            "ContactsMobile": "",
            "ContactsIdno": "",
            "ContactsAddress": "",
            "empid": 11,
            "id": 12,
            "parent_id": 1,
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
            "muser": "",
            region: ''
          }
				},
        enterprisetype:[],//企业类别
        enterprisenature:[],//企业性质
        EnterpriseListByParentId:[],//子企业用户
        ByParentId:"",//选中子企业用户
				EnterpriseUsrEmployeeList:[],//企业人员信息表
        UpdateEnterpriseurl:global.host + "Enterprise/RegisterEnterprise",
        getEnterprisetypeurl:global.host + "SysDict/Get",
        getEnterpriseListByParentIdurl:global.host + "Enterprise/GetEnterpriseListByParentId",
        formProjectRules: {
					code: [
						{ required: true, message: '请输入统一信用代码', trigger: 'blur'}
					],
					name: [
						{ required: true, message: '请输入项目名称', trigger: 'blur' }
					],
					reg_addr: [
						{ required: true, message: '企业详细地址', trigger: 'blur'}
					],
					reg_finance: [
						{ required: true, message: '请输入注册资金', trigger: 'blur' }
					],
					Corporation: [
						{ required: true, message: '请输入企业法人', trigger: 'blur'}
					]
				},
				formProjectRules2:{
					func_type: [
						{ required: true, message: '请输入企业类别', trigger: 'change'}
					],
					region: [
						{ required: true, message: '请选择所属区域', trigger: 'change' }
					],
					CorporationIdno: [
						{ required: true, message: '请输入企业法人身份证号', trigger: 'blur'}
					],
					nature: [
						{ required: true, message: '请输入企业性质', trigger: 'blur' }
					]
				},
				formProjectRules3:{
					LoginUserName: [
						{ required: true, message: '请输入用户名', trigger: 'blur'}
					],
					Password: [
						{ required: true, message: '请输入密码', trigger: 'blur'}
					],
					Contacts: [
						{ required: true, message: '请输入姓名', trigger: 'blur'}
					],
					ContactsMobile: [
						{ required: true, message: '请输入电话', trigger: 'blur' }
					],
          ContactsIdno: [
						{ required: true, message: '请输入身份证号', trigger: 'blur' }
					]
				}
      }
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
    		'$route': '',
		},
    created() {
			this.getEnterprisetype();
      this.getenterprisenature();
      //this.getEnterpriseListByParentId();  子企业用户
		},
    computed: mapState({ user: state => state.user }),
		methods: {
      regionChange: function(selectedObj){
				var vm = this
				vm.Enterprise2.parameter.province = selectedObj.province
				vm.Enterprise2.parameter.city = selectedObj.city
				vm.Enterprise2.parameter.area = selectedObj.area
				if(vm.Enterprise2.parameter.province != '' && vm.Enterprise2.parameter.city != '' && vm.Enterprise2.parameter.area != ''){
					vm.Enterprise2.parameter.region = vm.Enterprise2.parameter.province + vm.Enterprise2.parameter.city + vm.Enterprise2.parameter.area
				}else{
					vm.Enterprise2.parameter.region = ''
				}
			},
			getEnterprisetype: function() {//企业类别
				this.$http.get(this.getEnterprisetypeurl,{"params":{"type":"enterprisetype"}})
					.then((response) => {
              this.enterprisetype=response.body;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
      getEnterpriseListByParentId: function() {//子企业用户
        
        this.$http.get(this.getEnterpriseListByParentIdurl,{"params":{"token":this.user.token,"parameter":"0"}})
					.then((response) => {
              this.EnterpriseListByParentId=response.body.data;
					})
					.catch(function(response) {
						console.log(response)
					})
			},
      getenterprisenature:function(){//企业性质
        this.$http.get(this.getEnterprisetypeurl,{"params":{"type":"enterprisenature"}})
					.then((response) => {
              this.enterprisenature=response.body;
					})
					.catch(function(response) {
						console.log(response)
					})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      checkstate(formName){
        var vm = this
				vm.$refs[formName].validate((valid) => {
					if(valid){
						if (vm.active++ > 2) this.active = 0;
					  vm.regenterprise=false;
						vm.regenterprise2=true;
					}else{
						console.log('error submit');
						return false;
					}
				})
      },
			checkstate2(formName){
        var vm = this
				vm.$refs[formName].validate((valid) => {
					if(valid){
						if (vm.active++ > 2) this.active = 0;
					  vm.regenterprise2=false;
						vm.regenterprise3=true;
					}else{
						console.log('error submit');
						return false;
					}
				})
      },
      submit(formName){
        var vm = this
				vm.$refs[formName].validate((valid) => {
					if(valid){
						vm.formProjectParam.parameter = vm.formProject
						vm.$http.post(vm.formProjectUrl,vm.formProjectParam)
							.then((response) => {
								console.log(response)
							})
							.catch(function(response){
								console.log(response)
							})
					}else{
						console.log('error submit');
						return false;
					}
				})
      },
      personsubmit(formName){
        var vm=this;
				this.Enterprise.parameter.province=this.Enterprise2.parameter.province
				this.Enterprise.parameter.city=this.Enterprise2.parameter.city
				this.Enterprise.parameter.area=this.Enterprise2.parameter.area
				this.Enterprise.parameter.CorporationIdno=this.Enterprise2.parameter.CorporationIdno
				this.Enterprise.parameter.nature=this.Enterprise2.parameter.nature
				this.Enterprise.parameter.tel=this.Enterprise2.parameter.tel
				this.Enterprise.parameter.fax=this.Enterprise2.parameter.fax
				this.Enterprise.parameter.email=this.Enterprise2.parameter.email
				this.Enterprise.parameter.website=this.Enterprise2.parameter.website
				this.Enterprise.parameter.LoginUserName=this.Enterprise3.parameter.LoginUserName
				this.Enterprise.parameter.Password=this.Enterprise3.parameter.Password
				this.Enterprise.parameter.Contacts=this.Enterprise3.parameter.Contacts
				this.Enterprise.parameter.ContactsMobile=this.Enterprise3.parameter.ContactsMobile
				this.Enterprise.parameter.ContactsIdno=this.Enterprise3.parameter.ContactsIdno
				vm.$refs[formName].validate((valid) => {
					if(valid){
						vm.$http.post(vm.UpdateEnterpriseurl,vm.Enterprise)
							.then((response) => {
							
								if(response.body.ret=="0"){
									this.$router.replace({ path: '/home' })
								}
								else{
										alert(response.body.msg)
								}
								
							})
							.catch(function(response){
								console.log(response)
							})
					}else{
						console.log('error submit');
						return false;
					}
				})
          
      },
      prevsubmit(){
        this.regenterprise=true;
      },
      submitForm(formName) {
				var vm = this
				console.log(222)
				vm.$refs[formName].validate((valid) => {
					if(valid){
						vm.formProjectParam.token = vm.user.token
						vm.formProjectParam.parameter = vm.formProject
						vm.$http.post(vm.formProjectUrl,vm.formProjectParam)
							.then((response) => {
								console.log(response)
								//vm.$router.back()
							})
							.catch(function(response){
								console.log(response)
							})
					}else{
						console.log('error submit');
						return false;
					}
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleSuccess:function(response, file, fileList)
			{
				
					if(response.ret==0)
					{
							this.Enterprise.parameter.ImageUrl=response.data.Url//统一信用代码
							this.Enterprise.parameter.code=response.data.reg_num//统一信用代码
							this.Enterprise.parameter.name=response.data.name//公司名字
							this.Enterprise.parameter.Corporation=response.data.person//法人
							this.Enterprise.parameter.reg_addr=response.data.address//地址
							this.Enterprise.parameter.reg_finance=response.data.capital//注册资金
					}
			}
		}
	}
</script>

<style>

</style>
