<style lang="less" scoped>
	.clearfix::before, 
	.clearfix::after {
	    content: "";
	    display: table;
	}
	.clearfix::after {
	    clear: both;
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
	
	.creat-title {
		color: #999;
		background-color: #f9f9f9;
		text-align: center;
	}
	.creat-cnt > .el-tabs {
		width: 100%;
	}
	.check-block .el-checkbox {
		display: block;
		width: 100%;
		margin: 0;
	}
</style>
<template>
  <div>
          <v-wrapheader></v-wrapheader>
				<template >
				
					<el-steps :space="200" :active="active" finish-status="success" align-center="true" style="margin: 20px auto 0;width:500px">
						<el-step title="上传证书" icon='upload'></el-step>
						<el-step title="填写项目信息" icon='edit'></el-step>
						<el-step title="填写管理员信息" icon='share'></el-step>
					</el-steps>


						<el-tabs v-model="activeName">
							<el-tab-pane name='first' :disabled="tabsdisabled" style="padding-left: 300px;padding-right: 300px">


                	<el-form :model="formProject" :rules="formProjectRules" ref="formProject" label-width="120px">

                	<el-form-item label="上传证书" class="el-col-24">
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

								<el-form-item label="工程名称" class="el-col-24" prop="name">
									<el-input v-model="formProject.name"></el-input>
								</el-form-item>
								<el-form-item label="建设地址" class="el-col-24" prop="addr">
									<el-input v-model="formProject.addr"></el-input>
								</el-form-item>
                	<el-form-item label="证书编号" class="el-col-24" prop="sgno">
									<el-input v-model="formProject.sgno"></el-input>
								</el-form-item>
	              <el-form-item label="建设规模" class="el-col-24">
									<el-input v-model="formProject.squre"></el-input>
								</el-form-item>
								<el-form-item label="合同价格" class="el-col-24">
									<el-input v-model="formProject.cost"></el-input>
								</el-form-item>

								
								<el-form-item class="el-col-24">
									    <el-button type="primary" @click="firstNext('formProject')">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
								</el-form-item>
                	</el-form>

							</el-tab-pane>
							<el-tab-pane name='second' :disabled="tabsdisabled" style="padding-left: 300px;padding-right: 300px">
									<el-form :model="formProjectExt" :rules="formProjectRulesExt" ref="formProjectExt" label-width="120px">
										<el-form-item label="工程类别" class="el-col-24" prop="type">
									<el-select v-model="formProjectExt.type" placeholder="项目类别">
										<el-option 
											v-for="item in projType" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="工程用途" class="el-col-24" prop="purpose">
									<el-select v-model="formProjectExt.purpose" placeholder="工程用途">
										<el-option 
											v-for="item in projPurpose" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="工程进度" class="el-col-24" prop="progress">
									<el-select v-model="formProjectExt.progress" placeholder="工程进度">
										<el-option 
											v-for="item in projProgress" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属区域" class="el-col-24" prop="region">
									<v-region v-model="formProjectExt.region"
									:province="formProjectExt.province" 
									:city="formProjectExt.city" 
									:area="formProjectExt.area" 
									@emitRegionChange="regionChange"
									>
									</v-region>
								</el-form-item>
								<!--<el-form-item label="质量目标" class="el-col-24">
									<el-select v-model="formProjectExt.zlmb" placeholder="质量目标">
										<el-option 
											v-for="item in projZlmb" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="开工日期" class="el-col-24">
									<el-date-picker v-model="selectDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
									</el-date-picker>
								</el-form-item>-->
										<el-form-item class="el-col-24">
											<el-button type="primary" @click="secondLeft('formProjectManager')" icon="arrow-left">上一步</el-button>
									    <el-button type="primary" @click="secondNext('formProjectExt')">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
										</el-form-item>
											</el-form>
							</el-tab-pane>


              <el-tab-pane name='third' :disabled="tabsdisabled"  style="padding-left: 300px;padding-right: 300px">

								<el-form :model="formProjectManager" :rules="ManagerRule" ref="formProjectManager" label-width="120px">
                  	<el-form-item label="姓名" class="el-col-24" prop="ManagerName" required>
									<el-input v-model="formProjectManager.ManagerName"></el-input>
                  </el-form-item>
                    <el-form-item label="手机号" class="el-col-24" prop="ManagerPhone" required>
                    <el-input v-model="formProjectManager.ManagerPhone"></el-input>
                  </el-form-item>
                    <el-form-item label="身份证" class="el-col-24" prop="ManagerSFZ" required>
                    <el-input v-model="formProjectManager.ManagerSFZ"></el-input>
                  </el-form-item>
                    <!--<el-form-item label="性别" class="el-col-24" prop="ManagerSex">
                      <template>
                          <el-select v-model="formProjectManager.ManagerSex" placeholder="请选择">
                            <el-option
                              v-for="item in sexs"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </template>
                  </el-form-item>-->
                  </el-form-item>
                    <el-form-item label="岗位" class="el-col-24" prop="ManagerPosition" required>
                    <el-input v-model="formProjectManager.ManagerPosition"></el-input>
                  </el-form-item>
                  </el-form-item>
                    <el-form-item label="账号" class="el-col-24" prop="ManagerUserName" required>
                    <el-input v-model="formProjectManager.ManagerUserName"></el-input>
                  </el-form-item>
                   </el-form-item>
                    <el-form-item label="密码" class="el-col-24" prop="ManagerPasswork" required>
                    <el-input type="password" v-model="formProjectManager.ManagerPasswork"></el-input>
                  </el-form-item> 
                   </el-form-item>
                    <el-form-item label="重复密码" class="el-col-24" prop="ManagerPassworkValidate" required>
                    <el-input type="password" v-model="formProjectManager.ManagerPassworkValidate"></el-input>
                  </el-form-item>
                 	<el-form-item class="el-col-24">
									    <el-button type="primary" @click="thirdLeft('formProjectManager')" icon="arrow-left">上一步</el-button>
                      <el-button type="success" @click="Complete('formProjectManager')">完成注册</el-button>
								</el-form-item>
									</el-form>
	          </el-tab-pane>
						</el-tabs>
				

          
				</template>

  </div>
</template>

<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
  		data: function(){
			return {
				tabsdisabled:true,
				active:0,
				uploadPhoto:global.host+'Project/UpCertificate',
        activeName:'first',
				isDisabel: true,
				upcUrl: global.host + 'Sys/UploadString',
				projSysDictUrl: global.host + 'SysDict/Get',
				projType: [],
				projPurpose: [],
				projSbzl: [],
				projProgress: [],
				projZlmb: [],
				selectDate:'',
				formProject: {
					name: '',	//工程名称  必填
					addr: '',	//建设地址	必填
					purpose: '',	//用途	必填
					progress: '',	//项目进度	必填
					province: '',	//省	必填
					city: '',	//市	必填
					area: '',	//区	必填
					type: '',	//工程类型	必填
					sgno: '',	//证书编号  必填
					squre: '',	//建设规模
					cost: '',	//合同价格
					startdate: '',	//开工日期
					cmpdate: '',	//竣工日期
					remark: '',	//备注
					sno: '',	//监督注册号
					zno: '',	//责任书编号
					zlmb: '',	//质量目标
					invest: '',	//总投资
					sbzl: [],	//申报资料
					location: '',	//位置
					region: '',
					AttrachmentName: '证书', //证书附件属性
					AttrachmentFileType: '', //证书附件属性
					AttrachmentPath: '',//证书附件属性
          ManagerName:'',//请填写姓名
          ManagerPhone:'',//请填写手机号
          ManagerSFZ:'',//请填写身份证
          ManagerSex:'',//请选择性别
          ManagerPosition:'',//请填写岗位
          ManagerUserName:'',//请输入账号
          ManagerPasswork:'',//请输入密码
          ManagerPassworkValidate:''//请输入重复密码
				},
				formProjectExt: {
					purpose: '',	//用途	必填
					progress: '',	//项目进度	必填
					province: '',	//省	必填
					city: '',	//市	必填
					area: '',	//区	必填
					type: '',	//工程类型	必填
					zlmb: '',	//质量目标
					region: ''
				},
				formProjectManager: {
								ManagerName:'',//请填写姓名
								ManagerPhone:'',//请填写手机号
								ManagerSFZ:'',//请填写身份证
								ManagerSex:'',//请选择性别
								ManagerPosition:'',//请填写岗位
								ManagerUserName:'',//请输入账号
								ManagerPasswork:'',//请输入密码
								ManagerPassworkValidate:''//请输入重复密码
							},
        sexs:[{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        },],
				formProjectRules: {
					name: [
						{ required: true, message: '请填写项目名称', trigger: 'blur' }
					],
					addr: [
						{ required: true, message: '请填写建设地址', trigger: 'blur'}
					],
					sgno: [
						{ required: true, message: '请填写证书编号', trigger: 'blur' }
					]
				},
				formProjectRulesExt: {
					progress: [
						{ required: true, message: '请选择项目进度', trigger: 'change'}
					],
					type: [
						{ required: true, message: '请选择项目类型', trigger: 'change'}
					],
					region: [
						{ required: true, message: '请选择区域', trigger: 'change'}
					],
					purpose: [
						{ required: true, message: '请选择项目用途', trigger: 'change'}
					]
				}
				,
				ManagerRule:{
						ManagerName: [
						{ required: true, message: '请填写姓名', trigger: 'blur' }
					]
          ,
          	ManagerPhone: [
						{ required: true, message: '请填写手机号', trigger: 'blur' }
					]
          ,
          	ManagerSFZ: [
						{ required: true, message: '请填写身份证', trigger: 'blur' }
					]
           ,
          	ManagerSex: [
						{ required: true, message: '请选择性别', trigger: 'blur' }
					]
           ,
          	ManagerPosition: [
						{ required: true, message: '请填写岗位', trigger: 'blur' }
					]
           ,
          	ManagerUserName: [
						{ required: true, message: '请输入账号', trigger: 'blur' }
					]
           ,
          	ManagerPasswork: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
           ,
          	ManagerPassworkValidate: [
						{ required: true, message: '请输入重复密码', trigger: 'blur' }
					]

				},
				formProjectUrl: global.host + 'Project/RegisterProject',//项目注册
				formProjectParam: {
					token: '',
					parameter: {}
				},
        getAreaParam:{
          params:{
            parameter:{
              parentcode:'0'
            }
          }
        }
			}
		},
		computed: mapState({ user: state => state.user }),
		created() {
			this.getProjectType()	//获取项目类别数据
			this.getProjectPurpose()	//获取项目用途数据
			this.getProjectSbzl()	//获取项目申报资料数据
			this.getProjProgress()	//获取工程进度数据
			this.getProjZlmb()	//获取质量目标数据
		},
		methods: {
			getProjectType: function(){
				var vm = this
				vm.$http.get(vm.projSysDictUrl,{'params':{'type':'projecttype'}})
					.then((response) => {
						vm.projType = response.body
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjectPurpose: function(){
				var vm = this
				vm.$http.get(vm.projSysDictUrl,{'params':{'type':'proyt'}})
					.then((response) => {
						console.log(222)
						console.log(response.body)
						vm.projPurpose = response.body
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjectSbzl: function(){
				var vm = this
				vm.$http.get(vm.projSysDictUrl,{'params':{'type':'prosbzl'}})
					.then((response) => {
						vm.projSbzl = response.body
						console.log(vm.projSbzl)
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjProgress: function(){
				var vm = this
				vm.$http.get(vm.projSysDictUrl,{'params':{'type':'progress'}})
					.then((response) => {
						vm.projProgress = response.body
						console.log(vm.projProgress)
					})
					.catch(function(response){
						console.log(response)
					})
			},
			getProjZlmb: function(){
				var vm = this
				vm.$http.get(vm.projSysDictUrl,{'params':{'type':'projZlmb'}})
					.then((response) => {
						vm.projZlmb = response.body
						console.log(vm.projZlmb)
					})
					.catch(function(response){
						console.log(response)
					})
			},
			//上传图片设置key
			getTimeStamp: function () {
				var date = new Date();
				var timestamp = date.getTime();
				return timestamp;
			},
			uploadImg: function(e){
				var vm = this
				var img = e.target.files[0]
				if(!img){  
					return
				}  
				// 判断图片 
				if(!(img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))){  
					alert('图片只能是jpg,gif,png') 
					return
				}
				var reader = new FileReader()
       			reader.readAsBinaryString(img)
				reader.onload = function(e){ // reader onload start  
					//上传图片
					var _content = e.target.result
					var _token = vm.user.token
					var _key = vm.getTimeStamp
					vm.$http.post(global.host + 'Sys/UploadFile',{
						token: _token,
						parameter: {
							key: _key,
							content: _content
						}
					})
					.then((response) => {
						console.log(2222222)
						console.log(response)
					})
					.catch(function(response){
						console.log(response)
					}) 
				} // reader onload end  
			},
			regionChange: function(selectedObj){
				var vm = this
				vm.formProjectExt.province = selectedObj.province
				vm.formProjectExt.city = selectedObj.city
				vm.formProjectExt.area = selectedObj.area
				if(vm.formProjectExt.province != '' && vm.formProjectExt.city != '' && vm.formProjectExt.area != ''){
					vm.formProjectExt.region = vm.formProjectExt.province + vm.formProjectExt.city + vm.formProjectExt.area
				}else{
					vm.formProjectExt.region = ''
				}
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
      firstNext:function(rule){//下一步
        this.$refs[rule].validate((valid) => {
          if (valid) {
             this.activeName='second'
						 this.active++
          } else {
            return false;
          }
        });
         
      },
			secondNext:function(rule){//下一步
        this.$refs[rule].validate((valid) => {
          if (valid) {
             this.activeName='third'
						 this.active++
          } else {
            return false;
          }
        });
         
      },
      secondLeft:function(rule){
        this.activeName='first'
				this.active--
      },
			thirdLeft:function(rule){
        this.activeName='second'
				this.active--
      },
      Complete:function(rule)
      {
            this.$refs[rule].validate((valid) => {
            if (valid) {
							
              this.formProjectParam.token = this.user.token
							this.formProject.ManagerName=this.formProjectManager.ManagerName;
							this.formProject.ManagerPhone=this.formProjectManager.ManagerPhone;
							this.formProject.ManagerSFZ=this.formProjectManager.ManagerSFZ;
							//this.formProject.ManagerSex=this.formProjectManager.ManagerSex;
							
							this.formProject.progress=this.formProjectExt.progress;
							this.formProject.type=this.formProjectExt.type;
							this.formProject.province=this.formProjectExt.province;
							this.formProject.city=this.formProjectExt.city;
							this.formProject.area=this.formProjectExt.area;
							this.formProject.purpose=this.formProjectExt.purpose;

							this.formProject.ManagerPosition=this.formProjectManager.ManagerPosition;
							this.formProject.ManagerUserName=this.formProjectManager.ManagerUserName;
							this.formProject.ManagerPasswork=this.formProjectManager.ManagerPasswork;
							this.formProject.ManagerPassworkValidate=this.formProjectManager.ManagerPassworkValidate;
							// var d = new Date(this.selectDate)
							// d = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
							//this.formProject.startdate=global.formatDate(this.selectDate,false)
              this.formProjectParam.parameter = this.formProject
              this.$http.post(this.formProjectUrl,this.formProjectParam)
                .then((response) => {
                      if(response.body.ret==0)
											{
												this.active++
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
                .catch(function(response){
                })
            } else {
              return false
            }
          });

      },
			handleError:function(err, response, file)
			{
				console.log(err)
			},
			handlePreview:function(file){
					console.log(file)
			},
			handleRemove:function(file, fileList){
				console.log(file)
			},
			handleSuccess:function(response, file, fileList)
			{
				console.log(response)
					if(response.ret==0)
					{
							this.formProject.name=response.data.project.name//工程名称
							this.formProject.addr=response.data.project.address//建设地址
							this.formProject.sgno=response.data.project.code//证书编号
							this.formProject.squre=response.data.project.scale//建设规模
							this.formProject.cost=response.data.project.contractprice//合同价格
							this.formProject.AttrachmentFileType=response.data.Url.split('.')[1]//后缀名
							this.formProject.AttrachmentPath=response.data.Url//工程附件
					}
			}
		}
  }
</script>