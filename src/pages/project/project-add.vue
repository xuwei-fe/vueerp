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
		<div class="">

			<div class="creat-cnt">
				<template>
					<el-form :model="formProject" :rules="formProjectRules" ref="formProject" label-width="120px">
						<el-tabs type="card">
							<el-tab-pane label="工程信息" ref="tab1">
								<el-form-item label="工程名称" class="el-col-12" prop="name">
									<el-input v-model="formProject.name"></el-input>
								</el-form-item>
								<el-form-item label="建设地址" class="el-col-12" prop="addr">
									<el-input v-model="formProject.addr"></el-input>
								</el-form-item>
								<el-form-item label="工程类别" class="el-col-12" prop="type">
									<el-select v-model="formProject.type" placeholder="项目类别">
										<el-option 
											v-for="item in projType" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="工程用途" class="el-col-12" prop="purpose">
									<el-select v-model="formProject.purpose" placeholder="工程用途">
										<el-option 
											v-for="item in projPurpose" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="工程进度" class="el-col-12" prop="progress">
									<el-select v-model="formProject.progress" placeholder="工程进度">
										<el-option 
											v-for="item in projProgress" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="所属区域" class="el-col-12" prop="region">
									<v-region v-model="formProject.region"
									:province="formProject.province" 
									:city="formProject.city" 
									:area="formProject.area" 
									@emitRegionChange="regionChange"
									>
									</v-region>
								</el-form-item>
								<el-form-item label="施工许可证" class="el-col-12">
									<input type="file" class="file" @change="uploadImg">
								</el-form-item>
								<el-form-item label="证书编号" class="el-col-12" prop="sgno">
									<el-input v-model="formProject.sgno"></el-input>
								</el-form-item>
								<el-form-item label="监督注册号" class="el-col-12">
									<el-input v-model="formProject.sno"></el-input>
								</el-form-item>
								<el-form-item label="责任书编号" class="el-col-12">
									<el-input v-model="formProject.zno"></el-input>
								</el-form-item>
								<el-form-item label="建设规模" class="el-col-12">
									<el-input v-model="formProject.squre"></el-input>
								</el-form-item>
								<el-form-item label="合同价格" class="el-col-12">
									<el-input v-model="formProject.cost"></el-input>
								</el-form-item>
								<el-form-item label="总投资" class="el-col-12">
									<el-input v-model="formProject.invest"></el-input>
								</el-form-item>
								<el-form-item label="质量目标" class="el-col-12">
									<el-select v-model="formProject.zlmb" placeholder="质量目标">
										<el-option 
											v-for="item in projZlmb" 
											:label="item.name" 
											:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="开工日期" class="el-col-12">
									<el-date-picker v-model="formProject.startdate" type="date"  placeholder="选择日期" :picker-options="pickerOptions0">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="竣工日期" class="el-col-12">
									<el-date-picker v-model="formProject.cmpdate" type="date"  placeholder="选择日期" :picker-options="pickerOptions1">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="申报资料" class="el-col-24">
									<template>
										<el-checkbox-group v-model="formProject.sbzl" class="check-block">
											<el-checkbox 
											v-for="item in projSbzl"
											:label="item.name">
											</el-checkbox >
										</el-checkbox-group>
									</template>
								</el-form-item>
								<el-form-item class="el-col-24">
									<el-button type="primary" style="width: 120px"  @click="submitForm('formProject')">保存</el-button>
									<el-button type="" style="width: 120px"  @click="resetForm('formProject')">取消 </el-button>
								</el-form-item>
							</el-tab-pane>
						</el-tabs>
					</el-form>
				</template>
				
			</div>
		</div>
	</div>
</template>

<script>
	import global from '../../config/global'
	import { mapState } from 'vuex'
	export default {
  		data: function(){
			return {
				isDisabel: true,
				upcUrl: global.host + 'Sys/UploadString',
				projSysDictUrl: global.host + 'SysDict/Get',
				RegisterUrl: global.host + 'Project/addProject',//项目注册
				projType: [],
				projPurpose: [],
				projSbzl: [],
				projProgress: [],
				projZlmb: [],
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
					AttrachmentName: 'wrewr', //证书附件属性
					AttrachmentFileType: 'jpg', //证书附件属性
					AttrachmentPath: 'baouerwre'//证书附件属性
				},
				formProjectRules: {
					name: [
						{ required: true, message: '请输入项目名称', trigger: 'blur' }
					],
					addr: [
						{ required: true, message: '请输入建设地址', trigger: 'blur'}
					],
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
						{ required: true, message: '请输入项目用途', trigger: 'change'}
					],
					sgno: [
						{ required: true, message: '请输入证书编号', trigger: 'blur' }
					]
				},
				formProjectUrl: global.host + 'Project/addProject',//项目注册
				formProjectParam: {
					token: '',
					parameter: {}
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
				vm.formProject.province = selectedObj.province
				vm.formProject.city = selectedObj.city
				vm.formProject.area = selectedObj.area
				if(vm.formProject.province != '' && vm.formProject.city != '' && vm.formProject.area != ''){
					vm.formProject.region = vm.formProject.province + vm.formProject.city + vm.formProject.area
				}else{
					vm.formProject.region = ''
				}
			},
			goNextTab: function(){
				this.isDisabel = false;
				var vm = this
				vm.$http.post(vm.RegisterUrl,{"parameter":this.formProject})
					.then((response) => {
						console.log(response.body.data)
					})
					.catch(function(response){
						console.log(response)
					})
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
			}
		}
  }
</script>

<style>

</style>
